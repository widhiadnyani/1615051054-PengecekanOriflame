<?
 include_once "koneksi.php";
 $nim=$_POST['nim'];
 $nama=$_POST['nama'];
 $jurusan=$data['jurusan'];
 $sql = "insert into re_mhs(nim, nama, jurusan) values('$nim','$nama','$jurusan')";

 if (mysql_query($koneksi, $sql)) {
  echo "New record createc successfully";
 } else {
  echo "Error :" . $sql . "<br>" . mysql_error($koneksi);
 }
 mysql_close($koneksi);
?>