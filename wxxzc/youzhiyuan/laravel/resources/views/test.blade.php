<!DOCTYPE html>
<html>
    <head>
        <title>my_welcome</title>

        

        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 96px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="title">
                    <h1>列表展示</h1>
                    <table>
                        <th>ID</th>
                        <th>名字</th>
                        <th>密码</th>
                        <th>操作</th>

                        @foreach($res as $v)
                            <tr>
                                <td>{{$v['id']}}</td>
                                <td>{{$v['username']}}</td>
                                <td>{{$v['password']}}</td>
                                <td><a href="./testdel?id={{$v['id']}}">删除</a></td>
                            </tr>
                        @endforeach


                    </table>

                </div>
            </div>
        </div>
    </body>
</html>
