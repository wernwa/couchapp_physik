function(doc, req) {

	// require mustache
  var Mustache = require("vendor/couchapp/lib/mustache");

/*	var param_str='';
	if (req){
		for(key in req) param_str += key + ': '+req[key]+ '<br>';
	}*/
	var db_name_str = req.path[0];
	var doc_name_str = req.path[2];
	var title_str = 'new';
	if (doc && doc._id!=null){



		var m = doc._id.match(/[a-zA-Z][a-zA-Z0-9_]+$/);
		if (m!=null)  title_str = m[0];
		else title_str = doc._id;
	}

	var b_new_document = false;
	if (doc && doc._id) b_new_document = false
	else b_new_document = true;

	var view = {
	  scripts : {
			db_name: db_name_str, 
			doc_name: doc_name_str
		},
	  b_new_doc: b_new_document,
	  docid: (doc && doc._id) || null,
	  docrev: (doc && doc._rev) || 'norev',
	  doctext : (doc && doc.text) || "<h1>topic TODO</h1><p>text TODO</p>\n",
          db_name: db_name_str,
          doc_name: doc_name_str,
	  title: title_str 
	}

	

  return Mustache.to_html(this.templates.edit2,view,this.templates);

}


