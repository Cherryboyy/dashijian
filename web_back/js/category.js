var urll = 'http://localhost:8000/';

var category = {
    //获取分类
    get: function (callback) {
        $.ajax({
            type: 'get',
            url: urll + 'admin/category_search',
            success: function (res) {
                // console.log(res);
                callback(res)
            }
        })
    },
//新增分类
    add:function(name,slug,callback) {
        $.post(
            urll+'admin/category_add',
            {
                name,slug
            },
            function (res) {
                // console.log(res)
                callback(res)
            }
        )
    },
//删除分类
    delete:function(zz,callback) {

        $.post(
            urll+'admin/category_delete',
            {
                id: zz
            },
            function (res) {
                callback(res)
            })
    },
//编辑分类
    edit: function(id,name,slug,callback) {
        $.post(urll+'admin/category_edit',
            {
                id,
                name,
                slug
            },
            function (res) {
            callback(res)
            }
            )
    }
};
