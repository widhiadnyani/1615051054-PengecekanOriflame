<?php
$servername = "localhost"; 
$username = "id5295107_oriflame";
$password = "oriflame24"; 
$dbname = "id5295107_oriflame";
 
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname); 
// Check connection
if (!$conn) { 
    die("Connection failed: " . mysqli_connect_error());
}else{
	//echo "Koneksi berhasil";
} 
?> 