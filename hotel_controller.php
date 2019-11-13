<?php 
    include 'condb.php';
    if(!empty($_POST)){

        $hotel_id = @$_POST['hotel_id'];
        $hotel_name = @$_POST['hotel_name'];
        $hotel_description = @$_POST['hotel_description'];

        $target_dir = "uploads/";
        $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file);
        $img_name = basename( $_FILES["fileToUpload"]["name"]);
     

        if(!empty($_POST['hotel_id'])){
            
            $sql = "UPDATE hotel SET hotel_name = '{$hotel_name}' 
            , hotel_description = '{$hotel_description}',picture ='{$img_name}'  WHERE 
            hotel_id = '{$hotel_id}'" ;
            $mysqli->query($sql);
            echo $mysqli->error ;	
          
        }else{
            $hotel_name = @$_POST['hotel_name'];
            $hotel_description = @$_POST['hotel_description'];
            $sql = "INSERT INTO hotel (hotel_name, hotel_description,picture ) 
            VALUES ('{$hotel_name}', '{$hotel_description}' , '{$img_name}') " ;
            $mysqli->query($sql);
        }
        echo "<script> window.location.href ='index.php' </script>" ;
		exit();
    }

    if(!empty($_GET)){
        $hotel_id = @$_GET['hotel_id'];
        if($_GET['action'] == 'del'){
            $sql = "DELETE FROM hotel WHERE hotel_id = {$hotel_id} " ;
            $mysqli->query($sql);
            
            $sql = "DELETE FROM  room_type WHERE hotel_id = {$hotel_id}  " ;
            $mysqli->query($sql);
        }
        	
		echo "<script> window.location.href ='index.php' </script>" ;
		exit();
	} 

?>