"use strict";

function to_query_string(object){
	let strings = [];
	for(let single_item in object)
		if (object.hasOwnProperty(single_item)) {
			strings.push(encodeURIComponent(single_item) + "=" + encodeURIComponent(object[single_item]));
		}
	return strings.join("&");
}

function make_query_url(base_url, query_object){
	return base_url + "?" + to_query_string(query_object);
}
