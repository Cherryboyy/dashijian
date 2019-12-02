var urll = 'http://localhost:8000/'
var user ={
    //登录方法
    login: function (username, pasword) {
        $.post(
            urll +'admin/login',
            {
                user_name: username,
                password: pasword,
                // password: pasword
            },
            function (res) {
                console.log(res)
                // alert(res.msg);
                if (res.code === 200) {
                    location.href = 'index.html'
                }
            }
        )
    },
    //退出方法
    logout: function () {
        $.post(
            urll +'admin/logout',
            function (res) {
                if (res.code == 200) {
                    location.href = 'login.html'
                }
            }
        )
    },
    //获取用户信息
    getInfo: function () {
        $.get(
            urll +'admin/getuser',
            function (res) {
                if (res.code === 200) {
                    //更改头像
                    $('.toux').prop('src', res.data.user_pic);//prop修改元素的故有属性
                    //更改管理员名字
                    $('#nme').text(res.data.nickname).css('font-style', 'normal')
                }
            }
        )
    },


}
