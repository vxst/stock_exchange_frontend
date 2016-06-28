function to_data_single(date){
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function time_to_date(time_object){
	let date = new Date(time_object);
	return date;
}
function time_in_date(time_object, date){
	let other_date = new Date(time_object);
	return other_date.getDay() == date.getDay() && other_date.getMonth() == date.getMonth() && other_date.getYear() == date.getYear();
}
function date_increase(current_date){
	let time = current_date.getTime() + 24 * 60 * 60 * 1000;
	let result = new Date();
	result.setTime(time);
	return result;
}
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
				result.dates.push(to_data_single(current_date));
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
	result.dates.push(to_data_single(current_date));
	result.open.push(current_open);
	result.close.push(current_close);
	result.high.push(current_high);
	result.low.push(current_low);

	return result;
}
