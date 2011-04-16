
function(head, req) {
  var ddoc = this;
  var Mustache = require("vendor/couchapp/lib/mustache");
  //var List = require("vendor/couchapp/lib/list");
  var path = require("vendor/couchapp/lib/path").init(req);

  var searchkey = "die";

  var query1 = path.view('search',{descending:true, startkey:[searchkey,0], endkey:[searchkey,{}], reduce:true, group:true});


	var db_name_str = req.path[0];
	var design_name_str= req.path[2];

	provides("html", function() {

		//var obj = {key1: 1, key2:"sonne", key3:[0,1,2]};
		return Object.toJSON(query1);
		//return Object.toJSON(obj);
		//return JSON.stringify(obj);
		//return "<h1>hallo</h1>";
		//return Mustache.to_html(ddoc.templates.l,view,ddoc.templates);
	});
}

//http://127.0.0.1:5984/physik/_design/01/_view/s?startkey=[%22br%22,0]&endkey=[%22br%22,{}]&reduce=true&group=true
