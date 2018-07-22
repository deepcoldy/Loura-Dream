# huana


## 线上地址

后端模板页面：http://115.28.91.65:3100

纯静态页面：http://115.28.91.65:3100/html

接口： http://115.28.91.65:3100/api/comment?page=1&limit=4

## 开发

1. 安装依赖

    ```bash
    yarn
    ```
或者
    ```bash
    npm i
    ```

2. 启动
安装 `supervisor` 或者 `pm2`

```bash
pm2 start app.js --name huana
```
或者
```bash
supervisor app.js
```

静态文件可以都放在 `/public` 目录。


## 留言 API

1. 添加留言

    ```js
    $.ajax({
        url: 'http://127.0.0.1:3100/api/comment',
        type: 'post',
        data: {
            'user_name': 'hanjiyun4',
            'content': '3大大撒多！',
            'phone': '18418744732'
        },
        success: (resp) => {
            console.log(resp)
        }
    })
    ```


2. 获取留言

    ```js
    $.ajax({
        url: 'http://127.0.0.1:3100/api/comment',
        type: 'get',
        data: {'limit': 2, 'page': 1},
        success: (resp) => {
            console.log(resp)
        }
    })
    ```

    或者直接请求

    http://127.0.0.1:3100/api/comment?page=1&limit=4



