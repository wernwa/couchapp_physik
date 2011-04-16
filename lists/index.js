function(head, req) {
  var ddoc = this;
  var Mustache = require("vendor/couchapp/lib/mustache");
 // var List = require("vendor/couchapp/lib/list");
 // var path = require("vendor/couchapp/lib/path").init(req);
 // var Atom = require("vendor/couchapp/lib/atom");

 // var indexPath = path.list('index','recent-posts',{descending:true, limit:10});
 // var feedPath = path.list('index','recent-posts',{descending:true, limit:10, format:"atom"});
 // var commentsFeed = path.list('comments','comments',{descending:true, limit:10, format:"atom"});
 // var allPath = path.list('index','all',{descending:true});

 // var path_parts = req.path;
  // The provides function serves the format the client requests.
  // The first matching format is sent, so reordering functions changes 
  // thier priority. In this case HTML is the preferred format, so it comes first.
  provides("html", function() {

	var db_name_str = req.path[0];
	var doc_name_str = req.path[2];

	var row;
	var articles_arr = [];
	while(row = getRow()) {
	    var doc = row.value;
            var a = {
		link_name: doc._id,
		link:"/"+db_name_str+"/_design/"+doc_name_str+"/_show/a/"+doc._id,
		short: doc.text.replace(/\\[\w]+\{(\w+)\}/g,'$1').substr(0,200)
	    }

	    articles_arr.push(a);
	}

	var view = {
	  scripts : {
			db_name: db_name_str, 
			doc_name: doc_name_str
		},
	  link_to_new_article: "/"+db_name_str+"/_design/"+doc_name_str+"/_show/edit0/",

	  title: "index",
	  articles: articles_arr
	//  articles: ["hey","ho"]

	}

	return Mustache.to_html(ddoc.templates.index,view,ddoc.templates);


  });

}
