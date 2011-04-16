function(doc) {

  if (doc.type===undefined || doc.type != "post") return;

  emit([doc.parent, doc.creation],1);


}
