"use strict";

$(document).ready(
	()=>{
		$("#open_id").click(
			()=>{
				fetch(make_query_url('/api/money_account',{'user_id': $("#user_id").val()}),{
					method: 'GET',
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
					},
				}).then((response)=>{
					return response.json();
				}).then((response)=>{
					if(response.status != "ok"){
						alert("无法链接服务器");
					}else{
						let data = response.data;
						$("#stock_account_id").val(data.stock_account_id);
						$("#password").val('');
						$("#money").val(data.money);
						$("#money_change").val('0.0');
					}
				});
			}
		);

		$("#submit").click(
			()=>{
				let money = parseFloat($("#money").val());
				let money_change = parseFloat($("#money_change").val());
				let money_result = money;
				if(!isNaN(money_change)){
					money_result = money + money_change;
				}
				fetch('/api/money_account',{
					method: 'POST',
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'user_id': $("#user_id").val(),
						'stock_account_id': $("#stock_account_id").val(),
						'password': $("#password").val(),
						'money': money_result
					})
				}).then(
					(response)=>{
						return response.json();
					}
				).then(
					(response)=>{
						if(response.status == "ok")
							alert("已完成");
						else
							alert("修改失败");
					}
				);
			}
		);

		$("#delete").click(
			()=>{
				fetch('/api/money_account',{
					method: 'DELETE',
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'user_id': $("#user_id").val(),
					})
				}).then(
					(response)=>{
						return response.json();
					}
				).then(
					(response)=>{
						if(response.status == "ok")
							alert("已完成");
						else
							alert("删除失败");
					}
				);
			}
		);
	}
);
