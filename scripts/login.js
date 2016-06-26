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
	})
})
