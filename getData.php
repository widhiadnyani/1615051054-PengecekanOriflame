<?php
	include_once "connect.php";
	
	$sql = "SELECT * FROM oriflame";
	$query = mysqli_query($conn, $sql);

	$arrayoriflame  = array();
	while ($row = mysqli_fetch_array($query)){
		$arrayoriflame[] = $row; 
	}
	echo json_encode($arrayoriflame);
	mysqli_close($conn);
?>