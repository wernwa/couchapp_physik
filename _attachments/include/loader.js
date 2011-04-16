
function couchapp_load(scripts) {
  for (var i=0; i < scripts.length; i++) {
    document.write('<script src="'+scripts[i]+'"><\/script>')
  };
};

couchapp_load([
  "/_utils/script/sha1.js",
  "/_utils/script/json2.js",
  "/_utils/script/jquery.js",
  "/_utils/script/jquery.couch.js",
  "/physik04/_design/04/vendor/couchapp/jquery.couch.app.js",
  "/physik04/_design/04/vendor/couchapp/jquery.couch.app.util.js",
  "/physik04/_design/04/vendor/couchapp/jquery.mustache.js",
  "/physik04/_design/04/vendor/couchapp/jquery.evently.js",
  "/physik04/_design/04/vendor/couchapp/jquery.pathbinder.js"

]);
