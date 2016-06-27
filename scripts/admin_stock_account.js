"use strict";

$(document).ready(
	()=>{
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
						$("#username").val(data.username);
						$("#name").val(data.name);
						$("#password").val('');
						$("#sex").val(data.sex);
						$("#national_id").val(data.national_id);
						$("#address").val(data.address);
						$("#education").val(data.education);
						$("#work").val(data.work);
						$("#phone").val(data.phone);
						$(".checkbox").val([]);
					}
				});
			}
		);

		$("#submit").click(
			()=>{
				if($(".checkbox").val() != ["verified"]){
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
						'phone': $("#phone").val()
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
				if($(".checkbox").val() != ["verified"]){
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
