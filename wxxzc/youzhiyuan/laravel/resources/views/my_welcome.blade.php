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
                    <h1>欢迎</h1>
                    <h3>欢迎{{ $name or '无名' }}莅临指导</h3>
                </div>
            </div>
        </div>
    </body>
</html>
