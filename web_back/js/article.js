var urll = 'http://localhost:8000/';
var article ={
    get :function(data,callback) {
        $.get(urll +"admin/search",data,function(res) {
            callback(res);
        })
    }
}
