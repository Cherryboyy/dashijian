var urll = 'http://localhost:8000/';
var article ={
    //查询
    get :function(data,callback) {
        $.get(urll +"admin/search",data,function(res) {
            callback(res);
        })
    },

    //发布文章
    add: function (fd,callback) {
        $.ajax({
            type:'post',
            url:urll+'admin/article_publish',
            data: fd,
            success:function(res) {
                callback(res)
            },
            processData:false,
            contentType:false
        })
    }
}
