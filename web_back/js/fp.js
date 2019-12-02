var urll = 'http://localhost:8000/'
var user ={
    //登录方法
    login: function (username, pasword,callback) {
        $.post(
            urll +'admin/login',
            {
                user_name: username,
                password: pasword,
                // password: pasword
            },
            function (res) {
                console.log(res)
                callback(res)
                // alert(res.msg);
            }
        )
    },
    //退出方法
    logout: function (callback) {
        $.post(
            urll +'admin/logout',
            function (res) {
            callback(res)
            }
        )
    },
    //获取用户信息
    getInfo: function (callback) {
        $.get(
            urll +'admin/getuser',
            function (res) {
                callback(res)
            }
        )
    },


}
