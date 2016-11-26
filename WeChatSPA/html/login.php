<?php 
	if($_GET){
		$username = $_GET['username'];
		$password = $_GET['password'];

		$pdo = new PDO('mysql:host=localhost;dbname=wechat', 'root', 'password'); 
		$sql = "SELECT * FROM user WHERE username='{$username}' AND password='{$password}'";
		$stmt = $pdo->query($sql);
		$res = $stmt->fetch(PDO::FETCH_ASSOC);

		if(!$res){
			echo json_encode(['errcode'=>2,'errmsg'=>'用户名或密码错误！']);
			return;
		}

		$sql = "SELECT * FROM userInfo WHERE uid={$res['id']}";
		$stmt = $pdo->query($sql);
		$res = $stmt->fetch(PDO::FETCH_ASSOC);
		
		if($res){
			$res['errcode'] = 0;
			echo json_encode($res);
		}else{
			echo json_encode(['errcode'=>2,'errmsg'=>'用户名或密码错误！']);
		}
	}else{
		echo json_encode(['errcode'=>1,'errmsg'=>'登陆失败！']);
	}