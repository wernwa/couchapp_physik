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



	// simpler cache mechanismus nur für einen browser
	//if (doc.text_mathjax_cache != undefined) doctext = doc.text_mathjax_cache;

		// Latex to html Ersetzung
	var latex2html = function (text){

		// lösche die Metha information
		text = text.replace(/[\s\S]*\\begin\{document\}([\s\S]*?)\\end{document}/,"$1");
		text = text.replace(/\%.*/g,"");
		
		// section
		text = text.replace(/\\section\{(.*?)\}/g,"<h1>$1</h1>");
		text = text.replace(/\\subsection\{(.*?)\}/g,"<h2>$1</h2>");
		text = text.replace(/\\subsubsection\{(.*?)\}/g,"<h3>$1</h3>");
		text = text.replace(/\\subsubsubsection\{(.*?)\}/g,"<h4>$1</h4>");

		// boxed
		//text = text.replace(/\\boxed{(.*?)\}/g,"<span style='border-width:1px;  border-style:solid;  border-color:blue;  padding:5px;  text-align:justify;'>$1</span>");

		text = text.replace(/\$\$\\boxed\{([\s\S]*?)\}\$\$/g,"\\boxed{\$\$ $1 \$\$}");
		text = text.replace(/\$\\boxed\{([\s\S]*?)\}\$/g,"\\boxed{\$ $1 \$}");
		var boxed_index = 0;
		boxed_index = text.indexOf("\\boxed{");

		while (boxed_index != -1){
			
			var pos = boxed_index + 7; // positioniere dich auf das Ende von boxed{
			var leftbrace = 0;
			var rightbrace = 0;
			while(true){
				pos++;
				if (text[pos] == '{') leftbrace++;
				if (text[pos] == '}'){
					if (leftbrace != rightbrace){ rightbrace ++; continue; }
					str1 = text.substr(0,boxed_index);
					str2 = text.substr(boxed_index+7,pos-(boxed_index+7));
					str3 = text.substr(pos+1,text.length-1);
					text = str1+"<span style='border-width:1px;  border-style:solid;  border-color:blue;  padding:5px;  text-align:justify;'>"+str2+"</span>"+str3;
					break;
				}
			}
			boxed_index+=7;
			boxed_index = text.indexOf("\\boxed{",boxed_index);
		}

		// underline
		text = text.replace(/\\underline\{(.*?)\}/g,"<u>$1</u>");

		// include graphics
		text = text.replace(/\\includegraphics\[.*?\]\{(.*?)\}/g,"<img width='80%' src='/"+db_name_str+"/"+doc._id+"/$1'>$1</u>");

		// Aufzählungen
		text = text.replace(/\\item(.*?)\n/g,"<li>$1</li>");
		text = text.replace(/\\begin\{itemize\}/g,"<ul>");
		text = text.replace(/\\end\{itemize\}/g,"</ul>");
		text = text.replace(/\\begin\{enumerate\}/g,"<ol>");
		text = text.replace(/\\end\{enumerate\}/g,"</ol>");

		// Tabelle
		text = text.replace(/\\begin\{tabular\}[\s\S]*?\\end{tabular}/g,
			function(table){
				var content = table.replace(/\\begin\{tabular\}\{\S+\}([\s\S]*?)\\end{tabular}/,'$1');
				var table_rows = content.split('\\\\');
				var html_content='';
				for each(row in table_rows){
					
					html_content = html_content+ '<tr><td>'+row.replace(/&/g,'</td><td>')+"</td></tr>";
				}
				return '<table border="0" style="margin:40px; border-spacing:15px;">'+html_content+'</table>'
			});		

		// Paragraph
		//text = text.replace(/\n(.*?)\n\n/g,"<p>$1</p>");
		
		// Mathjax Anpassung
		text = text.replace(/\\begin\{align\}/g,"\$\$\\begin{align}");
		text = text.replace(/\\end\{align\}/g,"\\end{align}\$\$");

		// Paragraph
		text = text.replace(/\n\n([\s\S]*?)\n\n/g,"<P> $1 </P>");

		return text;
	}


	var doctext = 'empty';
	if (doc && doc.text) doctext = latex2html(doc.latex);
/*
	var view = {
	  scripts : {
			db_name: db_name_str, 
			doc_name: doc_name_str
		},
	  docid: (doc && doc._id) || null,
	  docrev: (doc && doc._rev) || 'norev',
	  'doctext' : doctext,
          db_name: db_name_str,
          doc_name: doc_name_str,
	  title: title_str,
	  edit_link0: "/"+db_name_str+"/_design/"+doc_name_str+"/_show/edit0/"+doc._id,
	  edit_link: "/"+db_name_str+"/_design/"+doc_name_str+"/_show/edit/"+doc._id,
	  edit_link2: "/"+db_name_str+"/_design/"+doc_name_str+"/_show/edit2/"+doc._id
	}

  return Mustache.to_html(this.templates.a,view,this.templates);
*/
  return doctext;

}


