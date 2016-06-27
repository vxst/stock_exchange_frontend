$("#user_login_btn").click(()=>{
	fetch('/api/user/login',{
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'username': $("#username").val(),
			'password': $("#password").val()
		})
	}).then((response)=>{
		return response.json();
	}).then((result)=>{
		console.log(result);
		if(result['status'] == 'ok'){
			$(location).attr('href', '/user/index.html');
		}else{
			alert("登录失败");
		}
	});
});
$("#admin_login_btn").click(()=>{
	fetch('/api/user/login',{
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'username': $("#username").val(),
			'password': $("#password").val()
		})
	}).then((response)=>{
		return response.json();
	}).then((result)=>{
		if(result['status'] == 'ok'){
			$(location).attr('href', '/admin/index.html');
		}else{
			alert("登录失败");
		}
	});
});
