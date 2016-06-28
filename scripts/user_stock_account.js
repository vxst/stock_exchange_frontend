"use strict";

$(document).ready(
	()=>{
		function init(){
			fetch('/api/stock_account',{
				method: 'GET',
				credentials: 'same-origin',
				headers: {
					'Accept': 'application/json',
				},
			}).then((response)=>{
				return response.json();
			}).then((response)=>{
				if(response.status != "ok"){
					alert("请先登录");
				}else{
					let data = response.data;
					$("#sex").val(data.sex);
					$("#national_id").val(data.national_id);
					$("#address").val(data.address);
					$("#education").val(data.education);
					$("#work").val(data.work);
					$("#work_place").val(data.work_place);
					$("#phone").val(data.phone);
				}
			});
		}

		$("#submit").click(
				()=>{
					fetch('/api/stock_account_user',{
						method: 'POST',
						credentials: 'same-origin',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							'sex': $("#sex").val(),
							'national_id': $("#national_id").val(),
							'address': $("#address").val(),
							'education': $("#education").val(),
							'work': $("#work").val(),
							'work_place': $("#work_place").val(),
							'phone': $("#phone").val()
						})
					}).then((response)=>{
						return response.json();
					}).then(
						(response)=>{
							if(response.status == "ok")
								alert("已完成");
							else
								alert("升级失败");
						}
					);

					if($("#old_password").val() != "" && $("#new_password").val() != ""){
						fetch("/api/user/password_change",{
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
						}).then((response)=>{
							return response.json();
						}).then(
							(response)=>{
								if(response.status == "ok")
									alert("已修改密码");
								else
									alert("修改密码失败");
							}
						);
					}
				}
		);

		init();
	}
);
