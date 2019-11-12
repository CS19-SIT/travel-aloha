<!DOCTYPE html>
<html>
    <?php include 'header.php'; ?>
    <body>
        <div class="content" >
            <div class="content-add" >
                <div class="row" >
                    <div class="col-lg-12 col-md-12  col-sm-12 header-text">
                        <span class=""> Add Hotel</span>
                    </div>
                </div>
            </div>
            <div class="content-table" >
                <?php 	
                if(!empty($_GET['hotel_id'])){
                    $sql = "SELECT * FROM hotel WHERE hotel_id = '{$_GET['hotel_id']}' " ;
                    $rs = $mysqli->query($sql);
                    $hotel = $rs->fetch_assoc();
                }
                ?>
                <form class="form-horizontal" id="hotel_form" action="hotel_controller.php" method="post"  enctype="multipart/form-data" >
                    <input type="hidden" name="hotel_id" value="<?php echo @$hotel['hotel_id'] ;  ?>"/>
                    <div class="form-group">
                        <label for="hotel_name" class="col-sm-3 control-label">Hotel Name</label>
                        <div class="col-sm-9">
                            <input type="text"  class="form-control" id="hotel_name" name="hotel_name" placeholder="Hotel Name" value="<?php echo @$hotel['hotel_name']  ?>" required >
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="hotel_description" class="col-sm-3 control-label">Description</label>
                        <div class="col-sm-9">
                            <textarea  class="form-control" id="hotel_description" name="hotel_description" placeholder="Description" ><?php echo @$hotel['hotel_description'] ?></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="img" class="col-sm-3 control-label">Picture</label>
                        <div class="col-sm-9">
                        <?php  if(!empty($hotel['picture'])){ ?>
                            <img src="uploads/<?php echo $hotel['picture']; ?>" height="300" width="300">
                        <?php }else{ ?>
                            <img src="uploads/images.PNG" height="300" width="300">
                        <?php 
                        }  ?>
                            <br>
                            <input type="file"  name="fileToUpload" id="fileToUpload">
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
