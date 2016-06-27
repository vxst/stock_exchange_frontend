"use strict";

$(document).ready(
	()=>{
		let clear_fields = ()=>{
			$("#username").val("");
			$("#name").val("");
			$("#password").val("");
			$("#sex").val("");
			$("#national_id").val("");
			$("#address").val("");
			$("#education").val("");
			$("#work").val("");
			$("#work_place").val("");
			$("#phone").val("");
			$("#verified").prop('checked', false);
		}
		$("#open_id").click(
			()=>{
				fetch(make_query_url('/api/stock_account',{'user_id': $("#user_id").val()}),{
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
						if(data === undefined){
							clear_fields();
						}else{
							$("#username").val(data.username);
							$("#name").val(data.name);
							$("#password").val('');
							$("#sex").val(data.sex);
							$("#national_id").val(data.national_id);
							$("#address").val(data.address);
							$("#education").val(data.education);
							$("#work").val(data.work);
							$("#work_place").val(data.work_place);
							$("#phone").val(data.phone);
							$("#verified").prop('checked', false);
						}
					}
				});
			}
		);

		$("#submit").click(
			()=>{
				if(!$("#verified").prop('checked')){
					alert("请先验证用户身份");
					return;
				}
				fetch('/api/stock_account',{
					method: 'POST',
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'user_id': $("#user_id").val(),
						'username': $("#username").val(),
						'name': $("#name").val(),
						'password': $("#password").val(),
						'sex': $("#sex").val(),
						'national_id': $("#national_id").val(),
						'address': $("#address").val(),
						'education': $("#education").val(),
						'work': $("#work").val(),
						'work_place': $("#work_place").val(),
						'phone': $("#phone").val()
					})
				}).then(
					(response)=>{
						return response.json();
					}
				).then(
					(response)=>{
						if(response.status == "ok"){
							alert("已完成");
							clear_fields();
						}else
							alert("修改失败");
					}
				);
			}
		);

		$("#delete").click(
			()=>{
				if(!$("#verified").prop('checked')){
					alert("请先验证用户身份");
					return;
				}
				fetch('/api/stock_account',{
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
						if(response.status == "ok"){
							alert("已完成");
							clear_fields();
						}else
							alert("删除失败");
					}
				);
			}
		);
	}
);
