<!DOCTYPE html>
<html>
    <?php include 'header.php'; 
    $hotel_name = '';
    if(!empty($_GET['hotel_id'])){
        $sql = "SELECT * FROM hotel WHERE hotel_id = '{$_GET['hotel_id']}' " ;
        $rs = $mysqli->query($sql);
        $detail = $rs->fetch_assoc();
        $hotel_name = 'Hotel '.$detail['hotel_name'];
    }
    ?>
    <body>
        <div class="content" >
            <div class="content-add" >
                <div class="row" >
                    <div class="col-lg-12 col-md-12  col-sm-12 header-text">
                        <span class=""> Manage Room <?php echo $hotel_name; ?> </span>
                    </div>
                </div>
                <div class="row" >
                    <div class="col-lg-12 col-md-12  col-sm-12 ">
                        <a href="add_room.php?hotel_id=<?php echo $_GET['hotel_id']; ?>" class="btn btn-primary">Add Room</a> 
                    </div>
                </div>
            </div>
            <div class="content-table" >
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Room Number</th>
                            <th scope="col">Room Name</th>
                            <th scope="col">Room size</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php 	
                            $sql = "SELECT * FROM room_type WHERE hotel_id = '{$_GET['hotel_id']}'" ;
                            $rs = $mysqli->query($sql);
                            $items = array();
                            while($hotel = $rs->fetch_assoc()){
                        ?>
                            <tr>
                                <td><?php echo $hotel['room_number']; ?></td>
                                <td><?php echo $hotel['room_name']; ?></td>
                                <td><?php echo $hotel['room_size']; ?></td>
                                <td>
                                    <a href="add_room.php?room_number=<?php echo $hotel['room_number']; ?>" ><i class="fas fa-edit"></i></a> | <a href="room_controller.php?action=del&room_number=<?php echo $hotel['room_number']; ?>&hotel_id=<?php echo $hotel['hotel_id']; ?>"onclick="return confirm('Delete Room Name <?php echo  $hotel['room_name'] ?>');" ><i class="far fa-trash-alt"></i> </a> 
                                </td>
                            </tr>
                        <?php   
                           }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </body>
</html>
