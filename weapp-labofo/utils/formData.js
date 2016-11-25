// 参考 https://github.com/form-data/form-data/blob/master/lib/form_data.js
var util = require('./util.js');

function FormData() {
    if( !( this instanceof FormData ) ) {
        return new FormData();
    }

    this._overheadLength = 0;
    this._valueLength = 0;
    this._valuesToMeasure = [];
    this._streams = [];
    
    // init 
    this._init();
}

FormData.prototype._init = function() {
    this.append('source', '2');
    this.append('source-model', 'GT-I9505');
    this.append('source-system', '4.4.2');
    this.append('source-version', '7210');
}

FormData.LINE_BREAK = '\r\n';
FormData.DEFAULT_CONTENT_TYPE = 'multipart/form-data';


FormData.prototype.append = function( field, value, options ) {
    options = options || {};

    // allow filename as single option
    if( typeof options == 'string' ) {
        options = { filename: options };
    }
    //var append = CombinedStream.prototype.append.bind(this);

    // all that streamy business can't handle numbers
    if( typeof value == 'number' ) {
        value = '' + value;
    }

    // https://github.com/felixge/node-form-data/issues/38
    if( Array.isArray( value ) ) {
        // Please convert your array into string
        // the way web server expects it
        this._error( new Error( 'Arrays are not supported.' ) );
        return;
    }

    var header = this._multiPartHeader( field, value, options );
    this._streams.push( header );

    this._streams.push( value );

    var footer = this._multiPartFooter();
    this._streams.push( footer );


    // pass along options.knownLength
    this._trackLength( header, value, options );
};

FormData.prototype._trackLength = function( header, value, options ) {
    var valueLength = this._getContentLength( value, options );

    this._valueLength += valueLength;

    if( typeof header === 'string' ) {
        // @check why add CRLF? does this account for custom/multiple CRLFs?
        this._overheadLength +=
            header.length +
            FormData.LINE_BREAK.length;
    } else {
        this._overheadLength +=
            JSON.stringify( header ).length +
            FormData.LINE_BREAK.length;
    }

    // empty or either doesn't have path or not an http response
    if( !value || ( !value.path && !( value.readable && value.hasOwnProperty( 'httpVersion' ) ) ) ) {
        return;
    }

    // no need to bother with the length
    if( !options.knownLength ) {
        this._valuesToMeasure.push( value );
    }
};
FormData.prototype.getContentType = function() {
    return FormData.DEFAULT_CONTENT_TYPE + '; boundary=' + this.getBoundary() +';';
};

FormData.prototype.getLength = function() {
    var knownLength = this._overheadLength + this._valueLength;

    if( this._streams.length ) {
        knownLength += this._lastBoundary().length;
    }
    return knownLength;
}

FormData.prototype.getContentData = function() {
    var contents = '';
    for( var idx in this._streams ) {
        var stream = this._streams[ idx ];

        // skip nullish streams.
        if( stream == null ) {
            continue;
        }

        if( ! typeof stream === 'string' ) {
            continue;
        }

        // add non-empty streams.
        if( stream.length ) {
            contents += stream;
        }
    }

    if( this._streams.length ) {
        contents += this._lastBoundary();
    }
    return contents;
}

FormData.prototype._multiPartHeader = function( field, value, options ) {
    // custom header specified (as string)?
    // it becomes responsible for boundary
    // (e.g. to handle extra CRLFs on .NET servers)
    if( typeof options.header == 'string' ) {
        return options.header;
    }

    //var contentDisposition = this._getContentDisposition( value, options );
    //var contentType = this._getContentType( value, options );
    var contentLength = this._getContentLength( value, options );

    var contents = '';
    var headers = {
        // add custom disposition as third element or keep it two elements if not
        //'Content-Disposition': [ 'form-data', 'name="' + field + '"' ].concat( contentDisposition || [] ),
        'Content-Disposition': [ 'form-data', 'name="' + field + '"' ],
        // if no content type. allow it to be empty array
        // 'Content-Type': [].concat( contentType || [] )
        'Content-Length': contentLength
    };

    // allow custom headers.
    if( typeof options.header == 'object' ) {
        this._populate( headers, options.header );
    }

    var header;
    for( var prop in headers ) {
        header = headers[ prop ];

        // skip nullish headers.
        if( header == null ) {
            continue;
        }

        // convert all headers to arrays.
        if( !Array.isArray( header ) ) {
            header = [ header ];
        }

        // add non-empty headers.
        if( header.length ) {
            contents += prop + ': ' + header.join( '; ' ) + FormData.LINE_BREAK;
        }
    }

    return '--' + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;
};


FormData.prototype._getContentLength = function( value, options ) {
    var valueLength = 0;

    // used w/ getLengthSync(), when length is known.
    // e.g. for streaming directly from a remote server,
    // w/ a known file a size, and not wanting to wait for
    // incoming file to finish to get its size.
    if( options.knownLength != null ) {
        valueLength += +options.knownLength;
    } else if( typeof value === 'string' ) {
        valueLength = value.length;
    } else if( value ) {
        valueLength = JSON.stringify( value ).length
    }
    return valueLength;
}
// FormData.prototype._getContentDisposition = function(value, options) {

//   var contentDisposition;

//   // custom filename takes precedence
//   // fs- and request- streams have path property
//   // formidable and the browser add a name property.
//   var filename = options.filename || value.name || value.path;

//   // or try http response
//   if (!filename && value.readable && value.hasOwnProperty('httpVersion')) {
//     filename = value.client._httpMessage.path;
//   }

//   if (filename) {
//     contentDisposition = 'filename="' + path.basename(filename) + '"';
//   }

//   return contentDisposition;
// };

FormData.prototype._getContentType = function( value, options ) {

    //   // use custom content-type above all
    //   var contentType = options.contentType;

    //   // or try `name` from formidable, browser
    //   if (!contentType && value.name) {
    //     contentType = mime.lookup(value.name);
    //   }

    //   // or try `path` from fs-, request- streams
    //   if (!contentType && value.path) {
    //     contentType = mime.lookup(value.path);
    //   }

    //   // or if it's http-reponse
    //   if (!contentType && value.readable && value.hasOwnProperty('httpVersion')) {
    //     contentType = value.headers['content-type'];
    //   }

    //   // or guess it from the filename
    //   if (!contentType && options.filename) {
    //     contentType = mime.lookup(options.filename);
    //   }

    //   // fallback to the default content type if `value` is not simple value
    //   if (!contentType && typeof value == 'object') {
    //     contentType = FormData.DEFAULT_CONTENT_TYPE;
    //   }
    var contentType = FormData.DEFAULT_CONTENT_TYPE;

    return contentType;
};

FormData.prototype._multiPartFooter = function() {
    var footer = FormData.LINE_BREAK;;
    var lastPart = ( this._streams.length === 0 );
    if( lastPart ) {
        footer += this._lastBoundary();
    }
    return footer;
};

FormData.prototype._lastBoundary = function() {
    return '--' + this.getBoundary() + '--' + FormData.LINE_BREAK;
};

FormData.prototype.getHeaders = function( userHeaders ) {
    var header;
    var formHeaders = {
        'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
    };

    for( header in userHeaders ) {
        if( userHeaders.hasOwnProperty( header ) ) {
            formHeaders[ header.toLowerCase() ] = userHeaders[ header ];
        }
    }

    return formHeaders;
};

FormData.prototype.getBoundary = function() {
    if( !this._boundary ) {
        this._generateBoundary();
    }

    return this._boundary;
};

FormData.prototype._generateBoundary = function() {
    var boundary = util.guid();
    this._boundary = boundary;
};

FormData.prototype._error = function( err ) {
    if( !this.error ) {
        this.error = err;
    }
};

// https://github.com/dannyvankooten/populate.js/blob/master/populate.js
FormData.prototype._populate = function( form, data, basename ) {

    for( var key in data ) {

        if( !data.hasOwnProperty( key ) ) {
            continue;
        }

        var name = key;
        var value = data[ key ];

        // handle array name attributes
        if( typeof ( basename ) !== "undefined" ) {
            name = basename + "[" + key + "]";
        }

        if( value.constructor === Array ) {
            name += '[]';
        } else if( typeof value == "object" ) {
            populate( form, value, name );
            continue;
        }

        // only proceed if element is set
        var element = form.elements.namedItem( name );
        if( !element ) {
            continue;
        }

        var type = element.type || element[ 0 ].type;

        switch( type ) {
            default:
                element.value = value;
                break;

            case 'radio':
            case 'checkbox':
                for( var j = 0;j < element.length;j++ ) {
                    element[ j ].checked = ( value.indexOf( element[ j ].value ) > -1 );
                }
                break;

            case 'select-multiple':
                var values = value.constructor == Array ? value : [ value ];

                for( var k = 0;k < element.options.length;k++ ) {
                    element.options[ k ].selected |= ( values.indexOf( element.options[ k ].value ) > -1 );
                }
                break;

            case 'select':
            case 'select-one':
                element.value = value.toString() || value;
                break;

        }

    }

};

module.exports = FormData