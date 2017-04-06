<?php

    header('Content-Type:application/json;charset=UTF-8');

    $output=[];

     @$phone = $_REQUEST['phone'];  //@符号用于压制当前抛出的警告提示
    if($phone === NULL){ //若客户端未提交请求参数phone，则赋予默认值0
        echo '[]';
        return;
    }
    include('config.php');
    $conn=mysqli_connect($db_host, $db_user, $db_pwd, $db_name, $db_port);

    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql = "SELECT oid,phone,user_name,order_time,kf_dish.did,kf_order.did,img_sm,name FROM kf_order,kf_dish WHERE phone='$phone' AND kf_order.did=kf_dish.did";
    $result = mysqli_query($conn,$sql);
    while(($row=mysqli_fetch_assoc($result))!==NULL){
            $output[]=$row;
    }
    echo json_encode($output);
?>