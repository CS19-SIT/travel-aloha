<?php 
    include 'condb.php';
    if(!empty($_POST)){
        $room_number = @$_POST['room_number'];
        $hotel_id = @$_POST['select_hotel'];
        $room_size = @$_POST['room_size'];
        $room_name = @$_POST['room_name'];
        
        if(!empty($_POST['room_number'])){

            $sql = "UPDATE  room_type SET room_name = '{$room_name}' 
            , room_size = '{$room_size}',hotel_id ='{$hotel_id}'  WHERE 
            room_number = '{$room_number}'" ;
            $mysqli->query($sql);
            echo $mysqli->error ;	
          
        }else{

            $sql = "INSERT INTO  room_type (room_name, room_size,hotel_id ) 
            VALUES ('{$room_name}', '{$room_size}' , '{$hotel_id}') " ;
            $mysqli->query($sql);
            echo $mysqli->error ;	
        }
        echo "<script> window.location.href ='room.php?hotel_id=".$hotel_id."'</script>" ;
		exit();
    }

    if(!empty($_GET)){
        $room_number = @$_GET['room_number'];
        $hotel_id = @$_GET['hotel_id'];

        if($_GET['action'] == 'del'){
            $sql = "DELETE FROM  room_type WHERE room_number = {$room_number} " ;
            $mysqli->query($sql);
        }
        	
		echo "<script> window.location.href ='room.php?hotel_id=".$hotel_id."'</script>" ;
		exit();
	} 

?>