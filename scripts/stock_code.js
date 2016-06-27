function stock_is_code(code){
	return $.isNumeric(code[0]) && $.isNumeric(code[1]) && $.isNumeric(code[2]) && $.isNumeric(code[3]);
}

function stock_to_code(code){
	var base_str = parseInt(code).toString();
	while(base_str.length < 4)
		base_str = '0' + base_str;
	return base_str;
}

function stock_from_code(code){
	return parseInt(code.substr(0, 4));
}
