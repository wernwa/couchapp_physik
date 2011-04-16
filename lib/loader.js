
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
  "/relax/_design/relax/vendor/couchapp/jquery.couch.app.js",
  "/relax/_design/relax/vendor/couchapp/jquery.couch.app.util.js",
  "/relax/_design/relax/vendor/couchapp/jquery.mustache.js",
  "/relax/_design/relax/vendor/couchapp/jquery.evently.js"
]);
