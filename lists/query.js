
//http://127.0.0.1:5984/physik/_design/01/_view/s?startkey=[%22br%22,0]&endkey=[%22br%22,{}]&reduce=true&group=true


function(head, req) {
  var ddoc = this;
  var Mustache = require("vendor/couchapp/lib/mustache");
 


	var db_name_str = req.path[0];
	var design_name_str= req.path[2];

	provides("html", function() {


		var articles_arr = [];
		while(row = getRow()) {
	    	var docid = row.key[1];
        	var a = {
				link_name: docid,
				link:"/"+db_name_str+"/_design/"+design_name_str+"/_show/a/"+docid,
//				short: doc.text.replace(/<.*?>/g,'').substr(0,200)
				"short": row.value
			}

	    	articles_arr.push(a);
		}

		var view = {
		  scripts : {
				db_name: db_name_str, 
				doc_name: design_name_str
			},
		  link_to_new_article: "/"+db_name_str+"/_design/"+design_name_str+"/_show/edit/",
	
		  title: "search",
		  articles: articles_arr
		//  articles: ["hey","ho"]

		}

		return Mustache.to_html(ddoc.templates.l,view,ddoc.templates);
	});



}
