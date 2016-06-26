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
		var result = response.json();
		if(result['status'] == 'ok'){
			$(location).attr('href', '/trade/index.html');
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
		var result = response.json();
		if(result['status'] == 'ok'){
			$(location).attr('href', '/admin/index.html');
		}else{
			alert("登录失败");
		}
	});
});
