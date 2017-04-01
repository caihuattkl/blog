<?php
//返回某一道菜的菜品详情
    header('Conent-Type:application/json;charset=UTF-8');
    $output=[];
    @$did=$_REQUEST['did']; //@符号,强行压制错误.

    if($did===NULL){
      echo '[]';
      return;
    }
    //包含文件,连接数据库
    include('config.php');
    $conn=mysqli_connect($db_host,$db_user,$db_pwd,$db_name,$db_port);
    //var_dump($conn);//测试数据库是否连接成功

    $count=5; //控制查询条数

    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql="SELECT did,name,img_lg,price,material,detail FROM kf_dish WHERE did=$did";//数据库中查询某表某字段
    $result=mysqli_query($conn,$sql);
    //循环查到字段
    $row=mysqli_fetch_assoc($result);

    $output[]=$row;


    echo json_encode($output);

?>