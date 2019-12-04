<?php 

 $json = isset( $_POST['data'] )
 $data = json_decode($json)
 echo $data->filename; 
echo "\n"; 
  
echo $data->content; 

?>
