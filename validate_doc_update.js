function(newDoc, oldDoc, userCtx) {
  if (userCtx.roles.indexOf('rw') !== -1 
	|| userCtx.roles.indexOf('admin') !==-1
	|| userCtx.roles.indexOf('_admin') !==-1	// wegen cloudant
	) {
    return;
  } else {
    throw({forbidden: 'Only users in rw group may edit the database'});
  }
}

