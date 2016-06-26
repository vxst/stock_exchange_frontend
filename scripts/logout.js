$("#logout").click(()=>{
	fetch('/api/user/logout',{
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
		})
	}).then((response)=>{
		var result = response.json();
		if(result['status'] == 'ok'){
			$(location).attr('href', '../index.html');
		}else{
			alert("登出失败");
		}
	});
});
