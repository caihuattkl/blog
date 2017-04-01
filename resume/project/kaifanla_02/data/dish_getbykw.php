<?php
    header('Conent-Type:application/json;charset=UTF-8');
    $output=[];
    @$kw=$_REQUEST['kw']; //@符号,强行压制错误.

    if($kw===NULL){
      echo '[]';//若客户端提交数据,返回一个空数组
      return;//退出当前页面的执行
    }
    //包含文件,连接数据库
    include('config.php');
    $conn=mysqli_connect($db_host,$db_user,$db_pwd,$db_name,$db_port);
    //var_dump($conn);//测试数据库是否连接成功

    $count=5; //控制查询条数

    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql="SELECT did,name,img_sm,price,material FROM kf_dish WHERE name LIKE '%$kw%' or material LIKE '%$kw%'";//数据库中查询某表某字段
    //var_dump($sql);
    $result=mysqli_query($conn,$sql);
    //循环查到字段
    while(($row=mysqli_fetch_assoc($result))!==NULL){

        $output[]=$row;

    }

    echo json_encode($output);

?>