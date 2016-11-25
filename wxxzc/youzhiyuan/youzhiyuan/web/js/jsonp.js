
function bb(url)
{


    $.ajax({
        url : url+'?callback=abc',
        type : 'get',
        async: false,//使用同步的方式,true为异步方式

        success : function abc(data){
            return data.code
//code here...
        }

    });

}