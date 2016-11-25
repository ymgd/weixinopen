
$(function(){
    $(".display").click(function(){
        var content=$(this).html().trim();
        var obj=$(this)
        if(content=='显示'){
            var display=0
        }else{
            var display=1
        }
        $.ajax({
            type:"post",
            url:upd,
            data:{
                id:$(this).parents('tr').attr('cid'),
                display:display
            },
            success:function(data){
                if(data==1){
                    if(content=='显示'){
                        obj.html('隐藏')
                    }else{
                       obj.html('显示')
                    }
                }
            }
        })
    });
    //即点即改
    $(document).on('click','.sort',function() {
        var content = $(this).html();

        $(this).parent().html("<input name='sort' type='text' value='" + content + "' style='width:60px;'>");
    });
        $(document).on('blur',"input[name='sort']",function(){
            var obj = $(this).parent();
           var sort=$(this).val();
            var reg=/^\d{0,}$/;
            if(!reg.test(sort)){
                alert('必须输入数字');
                return false;
            }
            var id=$(this).parents('tr').attr('cid');
            $.ajax({
                type:'post',
                url:update,
                data:{
                    sort:sort,
                    id:id
                },
                success:function(data){
                    if(data==1){
                       obj.html("<span style='cursor: pointer' class='sort'>"+sort+"</span>");
                    }
                }
            });
        });
});