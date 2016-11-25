images:所有图片
pages:所有页面
templates:所有模板文件
util:所有公共js文件

使用方法：
1.引用插件
var R_htmlToWxml = require('../../util/htmlToWxml.js');//引入公共方法
2.将html内容转成json数据
R_htmlToWxml.html2json("html内容");
转换后的json格式类型大概如下：

3.吐到页面中显示
<block wx:for="{{content}}"  wx:for-index="idy"  wx:for-item="cellData">
        <block  wx:if="{{cellData.type == 'view'}}">
            <view class="p">
                <block  wx:for="{{cellData.child}}" wx:key="text">
                    <block  wx:if="{{item.type == 'a'}}">
                        <text class="a" data-seccode="{{item.attr['data-seccode']}}" data-secname="{{item.attr['data-secname']}}" bindtap="stockClick">{{item.text}}</text>
                    </block>
                    <block  wx:else>
                        <text>{{item.text}}</text>
                    </block>
                </block>
            </view>
        </block>
        <block wx:if="{{cellData.type == 'img'}}">
            <image class="img" data-index="{{idy}}" style="height: {{cellData.attr.height?cellData.attr.height:0}}px"  mode="aspectFit" src="{{cellData.attr.src}}" bindload="imageLoad"></image>
        </block>
    </block>
通过判断不同节点类型，显示不同的小程序结构

由于小程序图片的高度没法自适应，需要给图片设置高度，所以需要在图片加载完以后，获取图片高度，等比算出显示图片高度，赋值给对应图片

通常我们抓取的内容是html页面，特别是像资讯这一类的，如果在小程序里面显示文章内容，此插件提供了一种解决方案，希望对大家有用。

在客户端中用native显示html页面体验上面没有native的好，htmlToWxml插件给客户端中用native的方式显示html内容提供了一种解决方案




