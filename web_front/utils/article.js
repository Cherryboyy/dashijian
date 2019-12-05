var article ={
    hotpic : function(callback) {
        $.get(apis.article_hotpic,function(res) {
            callback(res)
        })
    },
    latest :function(callback) {
        $.get(apis.article_latest,function(res) {
            callback(res)
        })
    },
    article :function (id,callback) {
        $.get(apis.article_article,{id},function(res) {
            callback(res)
        })
    }
}
