<!DOCTYPE html>
<html>
    <?php include 'header.php'; ?>
    <body>
        <div class="content" >
            <div class="content-add" >
                <div class="row" >
                    <div class="col-lg-12 col-md-12  col-sm-12 header-text">
                        <span class=""> Add Room</span>
                    </div>
                </div>
            </div>
            <div class="content-table" >
                <?php 	
                if(!empty($_GET['room_number'])){
                    $sql = "SELECT * FROM room_type WHERE room_number = '{$_GET['room_number']}' " ;
                    $rs = $mysqli->query($sql);
                    $room_type = $rs->fetch_assoc();
                }
                ?>
                <form class="form-horizontal" id="hotel_form" action="room_controller.php" method="post"  enctype="multipart/form-data" >
                    <input type="hidden" name="room_number" value="<?php echo @$room_type['room_number'] ;  ?>"/>
                    <div class="form-group">
                        <label for="hotel_name" class="col-sm-3 control-label">Hotel Name</label>
                        <div class="col-sm-9">
                            <select class="form-control form-control-lg" name="select_hotel">
                            <option value="" disabled selected> - Selected Hotel - </option>
                                <?php 
                                    $sql = "SELECT * FROM hotel" ;
                                    $rs = $mysqli->query($sql);
                                    $items = array();
                                    while($hotel = $rs->fetch_assoc()){
                                        $select = '';
                                        if( $hotel['hotel_id'] == $room_type['hotel_id']){
                                            $select = 'selected';
                                        }else if( $hotel['hotel_id'] == $_GET['hotel_id']){
                                            $select = 'selected';
                                        }
                                ?>
                                    <option value="<?php echo $hotel['hotel_id']; ?>" <?php echo $select; ?>> <?php echo $hotel['hotel_name']; ?></option>
                                    <?php 
                                    }
                                ?>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                     <label for="hotel_name" class="col-sm-3 control-label">Room Size</label>
                        <div class="col-sm-10">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="room_size" id="room_size_l" value="L" <?php echo @($room_type['room_size'] == 'L')?  'checked' : ''; ?>>
                                <label class="form-check-label" for="room_size_l">L</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="room_size" id="room_size_m" value="M" <?php echo @($room_type['room_size'] == 'M')?  'checked' : ''; ?>>
                                <label class="form-check-label" for="room_size_m">M</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="room_size" id="room_size_s" value="S" <?php echo @($room_type['room_size'] == 'S')?  'checked' : ''; ?> >
                                <label class="form-check-label" for="room_size_s">S</label>
                            </div>  
                        </div>
                    </div>  
                    <div class="form-group">
                        <label for="room_name" class="col-sm-3 control-label">Room Name</label>
                        <div class="col-sm-9">
                            <input type="text"  class="form-control" id="room_name" name="room_name" placeholder="Room Name" value="<?php echo @$room_type['room_name']  ?>" required >
                        </div>
                    </div>          
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-10">
                            <button type="submit" name="test2" class="btn btn-success" style="margin-left:5px;" value="save" >บันทึกข้อมูล</button>
                            <a href="index.php" class="btn btn-danger" style="margin-left:5px;">ออก</a>
                        </div>
					</div>
                </form>
            </div>
        </div>
    </body>
</html>
