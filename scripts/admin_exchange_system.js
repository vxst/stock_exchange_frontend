"use strict";

$(document).ready(
	()=>{
		$("#submit_password_change").click(
			()=>{
				fetch('/api/user/password_change',{
					method: 'POST',
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'old_password': $("#old_password").val(),
						'new_password': $("#new_password").val()
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

		$("#stock_information").click(
			()=>{
				localStorage.setItem('stock_id', $("#stock_id").val());
				localStorage.setItem('show_storage_id', true);
				$(location).attr('href', '../user/stock_info.html');
			}
		);

		$("#submit_stock_edit").click(
			()=>{
				fetch('/api/edit_stock',{
					method: 'POST',
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'name': $("#stock_name").val(),
						'stock_id': $("#stock_id").val(),
						'max_change': $("#max_change").val()
					})
				}).then(
					(response)=>{
						return response.json();
					}
				).then(
					(response)=>{
						if(response.status != 'ok'){
							alert("设置涨跌停失败");
						}else{
							fetch('/api/turn_stock',{
								method: 'POST',
								credentials: 'same-origin',
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									'stock_id': $("#stock_id").val(),
									'active': (!$("#pause_exchange").prop("checked"))
								})
							}).then(
								(response)=>{
									return response.json();
								}
							).then(
								(response)=>{
									if(response.status != 'ok'){
										alert("设置交易活跃状态失败");
									}else{
										alert("设置成功");
									}
								}
							);
						}
					}
				);
			}
		);

		$("#stock_fetch").click(
			()=>{
				fetch(make_query_url('/api/stock_info',{'stock_id': $("#stock_id").val()}),{
					method: 'GET',
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
					},
				}).then((response)=>{
					return response.json();
				}).then((response)=>{
					let stock_name = response.data.name;
					let max_change = response.data.max_change;
					let active  = response.data.active;
					$("#stock_name").val(stock_name);
					$("#max_change").val(max_change);
					$("#pause_exchange").prop('checked', !active);
				});
			}
		);
	}
);
