"use strict";

$(document).ready(
		()=>{
			let user_id = "";
			let username = "";
			let money = "";
			let name = "";
			let active_orders = [];
			let hold_stocks = [];
			let res_json = (response)=>{
				return response.json();
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
					if(item_value.direction)
						string = string + '类型：'
							+ '<span class="buy_in_style">买入</span>';
					else
						string = string + '类型：'
							+ '<span class="sell_out_style">卖出</span>';
					string = string +
						'<button type="button" class="btn btn-danger pull-right slim cancelbtn" '
						+'data-id="'+item_value.id+'">'+
						+'取消'+
						+'</button>';
					string = string + '</li>';
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
					$("#user_info").val(
						"用户ID："+user_id+"<br>"+
						"用户名："+username+"<br>"+
						"姓名："+name+"<br>"+
						"资金数量："+money);
					$("#stock_info").val(
						"请选择需要操作的股票"
					);
					$("#stock_holding").val("");
					hold_stocks.forEach(
						(element, index, array)=>{
							$("#stock_holding").append(
								'<li class="list-group-item">'+
								element.stock_name + ' 数量:'+element.amount+
								'</li>');
						}
					);
					$("#active_orders").val("");
					active_orders.forEach(
						(element, index, array)=>{
							$("#stock_holding").append(compose_li_item_active_order(element));
						}
					);
					$(".cancelbtn").click(
						()=>{
							let order_id = $(this).data("id");
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
					)
				});
			}

			init();
			setInterval(init, 3000);
		}
);
