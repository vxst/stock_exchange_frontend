/*function time_to_date(time_object){
}
function time_in_date(time_object, date){
}
function date_increase(current_date){
}*/
function transfer_data(raw_array){
	let result = {open:[], high:[], low:[], close:[], dates:[]};
	let current_date = time_to_date(raw_array[0].time);
	let current_open = raw_array[0].price;
	let current_close = raw_array[0].price;
	let current_high = raw_array[0].price;
	let current_low = raw_array[0].price;
	for(let i = 0; i < raw_array.length; i++){
		if(time_in_date(raw_array[i].time, current_date)){
			if(raw_array[i].price > current_high)
				current_high = raw_array[i].price;
			if(raw_array[i].price < current_low)
				current_low = raw_array[i].price;
			current_close = raw_array[i].price;
		}else{
			while(!time_in_date(raw_array[i].time, current_date)){
				result.dates.push(current_date.to_date());
				result.open.push(current_open);
				result.close.push(current_close);
				result.high.push(current_high);
				result.low.push(current_low);

				current_date = date_increase(current_date);
				current_open = raw_array[i].price;
				current_close = raw_array[i].price;
				current_high = raw_array[i].price;
				current_low = raw_array[i].price;
			}
		}
	}

	return result;
}
