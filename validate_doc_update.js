function(newDoc, oldDoc, userCtx) {
  if (userCtx.roles.indexOf('rw') !== -1) {
    return;
  } else {
    throw({forbidden: 'Only users in rw group may edit the database'});
  }
}

