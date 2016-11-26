<?php 
	$db = new PDO('mysql:host=localhost;dbname=wechat','root','password');

	$sql = "SELECT COUNT(*) AS count FROM good";
	$stmt = $db->query($sql);
	$res['count'] = $stmt->fetch(PDO::FETCH_ASSOC);

	$sql = "SELECT * FROM good LIMIT {$_GET['n']},{$_GET['m']}";
	$stmt = $db->query($sql);
	$res['goods'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($res);