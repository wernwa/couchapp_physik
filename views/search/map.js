function(doc) {

	// statistik objekt enthält key,<count> des Textes
  var stat = {};

  // addiere tags zu der Suche hinzu (Die wertung ist 100xfach
  if (doc.tags!==undefined){
 	for each (tag in doc.tags){
		tag = tag.toLowerCase();
		if (stat[tag] === undefined) stat[tag] = 100;
		else stat[tag] = stat[tag]+100;
	}
    
  }

  var arr = new Array();
  if (doc.latex!==undefined){

	  var text = doc.latex.replace(/ \\item/,'')
					.replace(/ \\begin\{.*?\}/,'')
					.replace(/ \\end\{.*?\}/,'')
					.toLowerCase();
	  var arr1 = text.split(/[\W\s]+/);
  		arr = arr.concat(arr1);
  }

  if (doc.posthtml!==undefined){

	  var text = doc.posthtml.replace (/<.*?>/,'')
					.toLowerCase();
	  var arr2 = text.split(/[\W\s]+/);
  		arr = arr.concat(arr2);
  }

	  // addiere einzelne Wörter zu der Suche
	  for each (key in arr){
	    if (key.length<2) continue;
		if (stat[key] === undefined) stat[key] = 1;
		else stat[key] = stat[key]+1;
	  }


	  // addiere nächste Nachbarn
	  arr = text.match(/\w[\w]+ \w[\w]+/g);

	  for each (key in arr){
	    if (key.length<2) continue;
		if (stat[key] === undefined) stat[key] = 1;
		else stat[key] = stat[key]+1;
	  }


	  // emitiere alle statistik Einträge
  	   for (var key in stat){
   		 emit([key, stat[key], doc.creation],doc._id);
  		}
	
	// speichere auch die doc_id	
	emit([doc._id, 1000, doc.creation],doc._id);


}
