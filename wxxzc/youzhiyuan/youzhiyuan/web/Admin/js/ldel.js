/**
 * Created by Administrator on 2016/5/20.
 */
$(function(){
    $(".delAffirm").click(function(){
        var id=$(this).parents('tr').attr('cid')
        $.ajax({
            type:'post',
            url:deleteCate,
            data:{
                  id:id
            },
            success:function(data){
                if(data==1){
                    location.href=show
                }
            }
        })
    })

})