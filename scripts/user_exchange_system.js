"use strict";

$(document).ready(
		()=>{
			let user_id = "";
			let username = "";
			let money = "";
			let name = "";
			let active_orders = [];
			let hold_stocks = [];
			let old_keyword = "";
			let res_json = (response)=>{
				return response.json();
			}
			let update_search=()=>{
				let keyword = $("#searchbox").val();
				console.log("Changed to "+ keyword);
				if(stock_is_code(keyword)){
					$("#searchbox").autocomplete({
						'source': []
					});
					fetch(make_query_url("/api/stock_info", {
						'stock_id':stock_from_code(keyword)
					}),{
						method: 'GET',
						credentials: 'same-origin',
						headers: {
							'Accept': 'application/json'
						}
					}).then(res_json).then(
						(response)=>{
							$("#stock_info").html(
								"股票代码："+stock_to_code(response.data.id)+"<br>"+
								"股票名称："+response.data.name+"<br>"+
								"最高买价："+(response.data.base_price * (response.data.max_change + 1.0))+"<br>"+
								"最低卖价："+(response.data.base_price * (-response.data.max_change + 1.0))
							);
							sessionStorage.setItem("stock_id", response.data.id);
							sessionStorage.setItem("base_price", response.data.base_price);
							sessionStorage.setItem("max_change", response.data.max_change);
						}
					);
				}else{
					$("#stock_info").html(
						"请选择需要操作的股票"
					);
					if(old_keyword != keyword){
						old_keyword = keyword;
						fetch(make_query_url("/api/stock_search", {'keyword':keyword}),{
							method: 'GET',
							credentials: 'same-origin',
							headers: {
								'Accept': 'application/json'
							}
						}).then(res_json).then(
							(response)=>{
								if(response.status == 'ok'){
									let searchlist = [];
									response.data.forEach(
										(listitem)=>{
											searchlist.append(
												stock_to_code(listitem.id)+
												' '+
												listitem.name
											);
										}
									);
									$("#searchbox").autocomplete({
										'source': searchlist
									});
								}
							}
						);
					}
				}
			}
			let init = ()=>{
				let get_param = {
					method: 'GET',
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json'
					}
				};

				let compose_li_item_active_order = (item_value)=>{
					let string = '<li class="list-group-item">';
					string = string + item_value.stock_name + ' ';
					string = string + '数量：' + item_value.amount + ' ';
					string = string + '价格：' + item_value.price  + ' ';
					if(item_value.direction)
						string = string + '类型：'
							+ '<span class="buy_in_style">买入</span>';
					else
						string = string + '类型：'
							+ '<span class="sell_out_style">卖出</span>';
					string = string +
						'<a type="button" class="btn btn-danger pull-right slim cancelbtn" '
						+'data-id="'+item_value.id+'">'
						+"取消"
						+'</a>';
					string = string + '</li>';
					return string;
				}

				async.parallel([
						(callback)=>{
							fetch('/api/stock_account', get_param).then(res_json).then(
									(response)=>{
										let data = response.data;
										username = data.username;
										user_id = data.id;
										name = data.name;
										callback(null);
									}
								);
						},
						(callback)=>{
							fetch('/api/money_account', get_param).then(res_json).then(
									(response)=>{
										console.log(response);
										let data = response.data;
										money = data.money;
										callback(null);
									}
								);
						},
						(callback)=>{
							fetch('/api/orders', get_param).then(res_json).then(
									(response)=>{
										active_orders = response.data;
										callback(null);
									}
								);
						},
						(callback)=>{
							fetch('/api/stock', get_param).then(res_json).then(
									(response)=>{
										hold_stocks = response.data;
										callback(null);
									}
								);
						}
				],
				(error, results)=>{
					console.log("Load finished");
					$("#user_info").html(
						"用户ID："+user_id+"<br>"+
						"用户名："+username+"<br>"+
						"姓名："+name+"<br>"+
						"资金数量："+money);
					$("#stock_holding").html("");
					hold_stocks.forEach(
						(element, index, array)=>{
							$("#stock_holding").append(
								'<li class="list-group-item">'+
								element.stock_name + ' 数量:'+element.amount+
								'</li>');
						}
					);
					$("#active_orders").html("");
					active_orders.forEach(
						(element, index, array)=>{
							$("#active_orders").append($(compose_li_item_active_order(element)));
						}
					);
					$(".cancelbtn").click(
						(event)=>{
							let order_id = $(event.target).data("id");
							fetch('/api/order',{
								method: 'DELETE',
								credentials: 'same-origin',
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									'order_id': order_id
								})
							}).then(res_json).then(
								(response)=>{
									if(response.status == 'ok'){
										alert("取消完成");
										init();
									}else{
										alert("取消失败");
										init();
									}
								}
							);
						}
					);
					update_search();
				});
				$("#searchbox").on('input',update_search);
				$(".submit_order").click(
					(event)=>{
						let order_type = $(event.target).data("type") == 'buy';
						let price = parseFloat($("#price").val());
						let amount = parseInt($("#amount").val());
						let stock_id = parseInt(sessionStorage.getItem("stock_id"));
						let base_price = parseFloat(sessionStorage.getItem("base_price"));
						let max_change = parseFloat(sessionStorage.getItem("max_change"));
						let max_price  = base_price * (1.0+max_change);
						let min_price  = base_price * (1.0-max_change);
						let password   = $("#password").val();

						if(!(price <= max_price && price >= min_price)){
							alert("价格超过允许范围");
							return;
						}

						async.waterfall([
						(callback)=>{
							fetch('/api/money_account_password_check',{
								method: 'POST',
								credentials: 'same-origin',
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									'password': password
								})
							}).then(res_json).then(
								(response)=>{
									if(response.status != 'ok'){
										callback("密码错误");
									}else{
										callback(null);
									}
								}
							);
						},
						(callback)=>{
							fetch('/api/order_new', {
								method: 'POST',
								credentials: 'same-origin',
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									'stock_id': stock_id,
									'direction': order_type,
									'price': price,
									'amount': amount
								})
							}).then(res_json).then(
								(response)=>{
									if(response.status == 'ok'){
										alert("添加成功");
									}else{
										alert("添加失败");
									}
								}
							);
						}
						],
						(error)=>{
							if(error)
								alert(error);
						});
					}
				);
			}

			init();
//			setInterval(init, 500);
		}
);
