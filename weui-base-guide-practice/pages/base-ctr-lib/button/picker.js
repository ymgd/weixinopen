

function findRow( table, kind ) {
    var rows = table.body.rows
    return rows.find( function( row ) {
        return row.name === kind
    })
}

function getChangeF( kind ) {
    if( kind === 'size' ) {
        return changeSize
    } else if( kind === 'type' ) {
        return changeType
    } else if (kind === 'plain') {
        return changePlain
    } else if (kind === 'disabled'){
        return changeDisabled
    } else if (kind === 'loading'){
        return changeLoading
    } else if (kind === 'hover-class'){
        return changeHoverClass
    }
}

function changeSize( table, value ) {
    var row = findRow( table, 'size' )
    row.picker.index = value
    return {
        btnSize: row.picker.array[ value ],
        table: table
    }
}

function changeType( table, value ) {
    var row = findRow( table, 'type' )
    row.picker.index = value

    return {
        btnType: row.picker.array[ value ],
        table: table
    }
}

function changePlain(table, value){
    var row = findRow( table, 'plain' )
    row.picker.index = value

    return {
        btnPlain: row.picker.array[value],
        table: table
    }
}

function changeDisabled(table, value){
    var row = findRow( table, 'disabled' )
    row.picker.index = value

    return {
        btnDisabled: row.picker.array[value],
        table: table
    }
}

function changeLoading(table, value){
    var row = findRow( table, 'loading' )
    row.picker.index = value

    return {
        btnLoading: row.picker.array[value],
        table: table
    }
}

function changeHoverClass(table, value){
    var row = findRow( table, 'hover-class' )
    row.picker.index = value

    return {
        btnHoverClass: row.picker.array[value],
        table: table
    }
}

function setup( page, kind ) {

    var table = page.data.table

    return {

        change: function( value ) {
            var data = getChangeF(kind)(table, value)
            return data
        }
    }
}

module.exports = {
  setup: setup
}