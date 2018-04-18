<?php
 
	// Importing DBConfig.php file.
	include 'connect.php';
	 
	 // Getting the received JSON into $json variable.
	 $json = file_get_contents('php://input');
	 
	 // decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);
	$KodeProduk = $obj['KodeProduk'];
	$NamaProduk= $obj['NamaProduk'];
	$StatusProduk = $obj['StatusProduk'];

	 
	 // Creating SQL query and insert the record into MySQL database table.
	$Sql_Query = "INSERT INTO oriflame (KodeProduk,NamaProduk,StatusProduk) values ('$KodeProduk','$NamaProduk','$StatusProduk')";
	 
	 if(mysqli_query($conn,$Sql_Query)){
			$MSG = 'Oriflame berhasil diinput!' ;
			$json = json_encode($MSG);

			 echo $json ;
	 }
	 else{
			$MSG = 'Input gagal!' ;
			$json = json_encode($MSG);

			 echo $json ;
			
	 
	 }
	mysqli_close($con);
	
?>