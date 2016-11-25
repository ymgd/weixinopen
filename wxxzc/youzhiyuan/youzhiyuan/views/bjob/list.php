<!--列表-->
<script src="http://localhost/sixgroup/web/Jquery/jquery.js"></script>
<link href="Admin/css/bootstrap.css">
<link href="Admin/css/common.css" rel="stylesheet" type="text/css" />
<script src="Admin/js/upd.js"></script>
<script type="text/javascript">
    var upd="__URL__/updCate/";
    var show="__URL__/show/";
    var update="__URL__/update/";
    $(function(){
        $("tr[fid!=0]").hide();
        $(".unfold").click(function(){
            var fu=$(this).html()
            if(fu=='+'){
                $(this).html("-")
                var pid=$(this).parents("tr").attr("pid");
                $("tr[fid="+pid+"]").show();
            }else{
                $(this).html("+");
                var pid=$(this).parents("tr").attr("pid");
                $("tr[fid="+pid+"]").hide();
            }

        })
        /* $(".unfold").toggle(slow,function(){
         $(this).html("-");
         var pid=$(this).parents("tr").attr("pid");
         $("tr[fid="+pid+"]").show();

         },function(){
         $(this).html("+");
         var pid=$(this).parents("tr").attr("pid");
         $("tr[fid="+pid+"]").hide();
         });*/
        $(".delAffirm").click(function(){
            if(window.confirm("你确定要删除该分类吗？")){
                var pid = $(this).parents("tr").attr("pid");
                var obj=$(this);
                obj.parents("tr").remove();
            }
        });
        $(".delAffirm").click(function(){
            $.ajax({
                type:'post',
                url:"__URL__/deleteCate/",
                data:{
                    id:$(this).parents('tr').attr('pid')
                },
                success:function(data){
                    if(data==1){
                        location.href="__URL__/show/";
                    }else{
                        alert('删除失败');
                    }
                }
            });
        });
    });
</script>
<!--列表-->
<!--列表-->
<div id="map">
    <span class='title'>职位分类列表</span>
</div>
<div id="content">
    <table id="table" class='table table-striped table-bordered'>
        <thead>
        <tr>
            <th width="5%"></th>
            <th width="15%">职位名称</th>
            <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <?php foreach($arr as $key=>$val){?>
            <tr fid="<?php echo $val['fid']?>" pid="<?php echo $val['pid']?>">
                <td><a class='btn btn-mini btn-info unfold' style="font-size:16px;" href="javascript:void(0)">+</a></td>
                <td>|--<?php echo $val['html'].$val['fname'].$val['fid'] ?></td>

                <td>
                    <a class='btn btn-small' href="?r=bjob/addson&pid=<?php echo $val['pid']?>">添加子类</a>
                    <a class='btn btn-small' href="{:U('Category/updateCate',array('id'=>$vo['pid']))}">编辑</a>
                    <a class='btn btn-small delAffirm' href="javascript:void(0)" >删除</a>
                </td>
            </tr>
        <?php }?>
        </tbody>
    </table>
</div>
<!--列表-->
<script src="http://localhost/sixgroup/web/assets/js/jquery-2.0.3.min.js"></script>

<!-- <![endif]-->

<!--[if IE]>
<script src="http://localhost/sixgroup/web/assets/js/jquery-1.10.2.min.js"></script>
<![endif]-->

<!--[if !IE]> -->

<script type="text/javascript">
    window.jQuery || document.write("<script src='http://localhost/sixgroup/web/assets/js/jquery-2.0.3.min.js'>"+"<"+"script>");
</script>

<!-- <![endif]-->

<!--[if IE]>
<script type="text/javascript">
    window.jQuery || document.write("<script src='http://localhost/sixgroup/web/assets/js/jquery-1.10.2.min.js'>"+"<"+"script>");
</script>
<![endif]-->

<script type="text/javascript">
    if("ontouchend" in document) document.write("<script src='http://localhost/sixgroup/web/assets/js/jquery.mobile.custom.min.js'>"+"<"+"script>");
</script>
<script src="http://localhost/sixgroup/web/assets/js/bootstrap.min.js"></script>
<script src="http://localhost/sixgroup/web/assets/js/typeahead-bs2.min.js"></script>

<!-- page specific plugin scripts -->

<!--[if lte IE 8]>
<script src="http://localhost/sixgroup/web/assets/js/excanvas.min.js"></script>
<![endif]-->

<script src="http://localhost/sixgroup/web/assets/js/jquery-ui-1.10.3.custom.min.js"></script>
<script src="http://localhost/sixgroup/web/assets/js/jquery.ui.touch-punch.min.js"></script>
<script src="http://localhost/sixgroup/web/assets/js/jquery.slimscroll.min.js"></script>
<script src="http://localhost/sixgroup/web/assets/js/jquery.easy-pie-chart.min.js"></script>
<script src="http://localhost/sixgroup/web/assets/js/jquery.sparkline.min.js"></script>
<script src="http://localhost/sixgroup/web/assets/js/flot/jquery.flot.min.js"></script>
<script src="http://localhost/sixgroup/web/assets/js/flot/jquery.flot.pie.min.js"></script>
<script src="http://localhost/sixgroup/web/assets/js/flot/jquery.flot.resize.min.js"></script>

<!-- ace scripts -->

<script src="http://localhost/sixgroup/web/assets/js/ace-elements.min.js"></script>
<script src="http://localhost/sixgroup/web/assets/js/ace.min.js"></script>

<!-- inline scripts related to this page -->

<script type="text/javascript">
    jQuery(function($) {
        $('.easy-pie-chart.percentage').each(function(){
            var $box = $(this).closest('.infobox');
            var barColor = $(this).data('color') || (!$box.hasClass('infobox-dark') ? $box.css('color') : 'rgba(255,255,255,0.95)');
            var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
            var size = parseInt($(this).data('size')) || 50;
            $(this).easyPieChart({
                barColor: barColor,
                trackColor: trackColor,
                scaleColor: false,
                lineCap: 'butt',
                lineWidth: parseInt(size/10),
                animate: /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase()) ? false : 1000,
                size: size
            });
        })

        $('.sparkline').each(function(){
            var $box = $(this).closest('.infobox');
            var barColor = !$box.hasClass('infobox-dark') ? $box.css('color') : '#FFF';
            $(this).sparkline('html', {tagValuesAttribute:'data-values', type: 'bar', barColor: barColor , chartRangeMin:$(this).data('min') || 0} );
        });




        var placeholder = $('#piechart-placeholder').css({'width':'90%' , 'min-height':'150px'});
        var data = [
            { label: "social networks",  data: 38.7, color: "#68BC31"},
            { label: "search engines",  data: 24.5, color: "#2091CF"},
            { label: "ad campaigns",  data: 8.2, color: "#AF4E96"},
            { label: "direct traffic",  data: 18.6, color: "#DA5430"},
            { label: "other",  data: 10, color: "#FEE074"}
        ]
        function drawPieChart(placeholder, data, position) {
            $.plot(placeholder, data, {
                series: {
                    pie: {
                        show: true,
                        tilt:0.8,
                        highlight: {
                            opacity: 0.25
                        },
                        stroke: {
                            color: '#fff',
                            width: 2
                        },
                        startAngle: 2
                    }
                },
                legend: {
                    show: true,
                    position: position || "ne",
                    labelBoxBorderColor: null,
                    margin:[-30,15]
                }
                ,
                grid: {
                    hoverable: true,
                    clickable: true
                }
            })
        }
        drawPieChart(placeholder, data);

        /**
         we saved the drawing function and the data to redraw with different position later when switching to RTL mode dynamically
         so that's not needed actually.
         */
        placeholder.data('chart', data);
        placeholder.data('draw', drawPieChart);



        var $tooltip = $("<div class='tooltip top in'><div class='tooltip-inner'></div></div>").hide().appendTo('body');
        var previousPoint = null;

        placeholder.on('plothover', function (event, pos, item) {
            if(item) {
                if (previousPoint != item.seriesIndex) {
                    previousPoint = item.seriesIndex;
                    var tip = item.series['label'] + " : " + item.series['percent']+'%';
                    $tooltip.show().children(0).text(tip);
                }
                $tooltip.css({top:pos.pageY + 10, left:pos.pageX + 10});
            } else {
                $tooltip.hide();
                previousPoint = null;
            }

        });






        var d1 = [];
        for (var i = 0; i < Math.PI * 2; i += 0.5) {
            d1.push([i, Math.sin(i)]);
        }

        var d2 = [];
        for (var i = 0; i < Math.PI * 2; i += 0.5) {
            d2.push([i, Math.cos(i)]);
        }

        var d3 = [];
        for (var i = 0; i < Math.PI * 2; i += 0.2) {
            d3.push([i, Math.tan(i)]);
        }


        var sales_charts = $('#sales-charts').css({'width':'100%' , 'height':'220px'});
        $.plot("#sales-charts", [
            { label: "Domains", data: d1 },
            { label: "Hosting", data: d2 },
            { label: "Services", data: d3 }
        ], {
            hoverable: true,
            shadowSize: 0,
            series: {
                lines: { show: true },
                points: { show: true }
            },
            xaxis: {
                tickLength: 0
            },
            yaxis: {
                ticks: 10,
                min: -2,
                max: 2,
                tickDecimals: 3
            },
            grid: {
                backgroundColor: { colors: [ "#fff", "#fff" ] },
                borderWidth: 1,
                borderColor:'#555'
            }
        });


        $('#recent-box [data-rel="tooltip"]').tooltip({placement: tooltip_placement});
        function tooltip_placement(context, source) {
            var $source = $(source);
            var $parent = $source.closest('.tab-content')
            var off1 = $parent.offset();
            var w1 = $parent.width();

            var off2 = $source.offset();
            var w2 = $source.width();

            if( parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2) ) return 'right';
            return 'left';
        }


        $('.dialogs,.comments').slimScroll({
            height: '300px'
        });


        //Android's default browser somehow is confused when tapping on label which will lead to dragging the task
        //so disable dragging when clicking on label
        var agent = navigator.userAgent.toLowerCase();
        if("ontouchstart" in document && /applewebkit/.test(agent) && /android/.test(agent))
            $('#tasks').on('touchstart', function(e){
                var li = $(e.target).closest('#tasks li');
                if(li.length == 0)return;
                var label = li.find('label.inline').get(0);
                if(label == e.target || $.contains(label, e.target)) e.stopImmediatePropagation() ;
            });

        $('#tasks').sortable({
                opacity:0.8,
                revert:true,
                forceHelperSize:true,
                placeholder: 'draggable-placeholder',
                forcePlaceholderSize:true,
                tolerance:'pointer',
                stop: function( event, ui ) {//just for Chrome!!!! so that dropdowns on items don't appear below other items after being moved
                    $(ui.item).css('z-index', 'auto');
                }
            }
        );
        $('#tasks').disableSelection();
        $('#tasks input:checkbox').removeAttr('checked').on('click', function(){
            if(this.checked) $(this).closest('li').addClass('selected');
            else $(this).closest('li').removeClass('selected');
        });


    })
</script>

</body>
</html>

