<?php
/*��;������order��ҳ���ύ�Ķ������ݣ����ɶ���
* ���ݸ�ʽ��JSON��ʽ�����磺
*{"status": 200, "reason": 6}
*   ����
*{"status": 400, "reason": "�ͻ����ύ���������ݲ���"}
*   ����
*{"status": 500, "reason": "��������ִ�г���"}
*��ϸ˵�������տͻ����ύ�Ķ������ݣ��������⣬����ʾ�ͻ��������д��󣻷������ɶ���������ͻ��˷��ض������
*�����ˣ�key
*����ʱ�䣺2016-3-15
*/
    header('Content-Type:application/json;charset=UTF-8');
    $output=["status"=>0, "reason"=>''];

    @$user_name = $_REQUEST['user_name'];
    @$sex = $_REQUEST['sex'];
    @$phone = $_REQUEST['phone'];
    @$addr = $_REQUEST['addr'];
    @$did = $_REQUEST['did'];
    @$pid=$_REQUEST['pid'];

    if($user_name===NULL){
        $output['reason'] = "��������������Ϊ�գ�";
    }else if($sex===NULL){
        $output['reason'] = "�������Ա���Ϊ�գ�";
    }else if($phone===NULL){
        $output['reason'] = "�绰���벻��Ϊ�գ�";
    }else if($addr===NULL){
        $output['reason'] = "�ջ���ַ����Ϊ�գ�";
    }else if($did===NULL){
        $output['reason'] = "��Ʒ��Ų���Ϊ�գ�";
    }else if($pid===NULL){
        $output['pid'] = "���ɶ�����Ŵ���";
        }
    //ֻҪǰ��ļ������κ�һ�������ֱ����ͻ��˷���һ����ʾ������Ϣ���ַ���

    if($output['reason']){
        $output['status']=400;
        echo json_encode($output);
        return;
    }

    $order_time = time()*1000;  //PHP�е�time()�������ص�ǰ��ϵͳʱ��

    include('config.php');
    $conn=mysqli_connect($db_host, $db_user, $db_pwd, $db_name, $db_port);

    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql = "INSERT INTO kf_order VALUES (NULL,'$phone','$user_name','$sex','$order_time','$addr','$did','$pid')";
    $result = mysqli_query($conn,$sql);
    if($result){ //ִ�гɹ�
        $output['status'] = 200;
        $output['reason'] = mysqli_insert_id($conn);    //���ظո�ִ�гɹ���INSERT���������������
    }else{ //ִ��ʧ��
        $output['status'] = 500;
        $output['reason'] = "�����ύʧ�ܣ��������˴�����������SQL��䣺".$sql;
    }

    echo json_encode($output);
?>