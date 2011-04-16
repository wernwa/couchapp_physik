
function get_GET_params() {
   var GET = new Array();
   if(location.search.length > 0) {
      var get_param_str = location.search.substring(1, location.search.length);
      var get_params = get_param_str.split("&");
      for(i = 0; i < get_params.length; i++) {
         var key_value = get_params[i].split("=");
         if(key_value.length == 2) {
            var key = key_value[0];
            var value = key_value[1];
            GET[key] = value;
         }
      }
   }
   return(GET);
}

var GET = get_GET_params();
