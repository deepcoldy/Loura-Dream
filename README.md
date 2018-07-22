# huana

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