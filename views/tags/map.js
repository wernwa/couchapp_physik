function(doc) {

  if (doc.tags===undefined) return;

  for each (tag in doc.tags){
    emit(tag,doc._id);
  }


}
