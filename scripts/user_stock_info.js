let compose_li_for_depth(object){
	let string = '<li class="list-group-item">';
	let direction = "";
	if(object.direction){
		direction = "买入委托";
	}else{
		direction = "卖出委托";
	}
	string = string + direction + " " +
		"价格:"+ object.price + " " +
		"数量:"+ object.amount + " ";
	string = string + "</li>";
	return string;
}
let get_param = {
	method: 'GET',
	credentials: 'same-origin',
	headers: {
		'Accept': 'application/json'
	}
};
let res_json = (response)=>{
	return response.json();
}
$("#search").click(()=>{
	let keyword = $("#searchbox").val();
	let stock = null;
	async.waterfall([(callback)=>{
		fetch(make_query_url("/api/stock_search",{
			'keyword': keyword
		}), get_param).then(res_json).then((response)=>{
			let data = response.data;
			let stock_obj = data[0];
			stock = stock_to_code(stock_obj.id) + " " + stock_obj.name;
			$("#searchbox").val(stock);
			callback(null);
		});
	},
	(callback)=>{
		fetch(make_query_url("/api/stock_info", {
			'stock_id':stock_from_code(stock)
		}), get_param).then(res_json).then((response)=>{
			let data = response.data;
			let depth = data.depth;
			depth.forEach((item)=>{
				$("#depth_list").append(compose_li_for_depth(item));
			});
			callback(null);
		});
	},
	(callback)=>{
		fetch(make_query_url("/api/stock_history", {
			'stock_id': stock_from_code(stock)
		}), get_param).then(res_json).then((response)=>{
			let data = response.data;
			let graph_data = transfer_data(data);
			let figure = PlotlyFinance.createCandlestick(graph_data);
			Plotly.newPlot('klinegraph', figure.data, figure.layout);
			callback(null);
		});
	}]);
});
