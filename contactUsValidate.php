<?php
/**************************GET THE SUBMITTED VARIABLES AND VALIDATE******************************/
function valid_email($str) {
        return (!preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $str)) ? FALSE : TRUE;
}
$senderEmail = isset($_POST['email'])?$_POST['email']:"";
$postedMessage = isset($_POST['message'])?$_POST['message']:"";
$dateSelected = isset($_POST['date'])?$_POST['date']:"";
if(trim($senderEmail) == "" || !valid_email($senderEmail))die('{"status":"Error","mesage":"You should enter a valid email address"}');
if(trim($postedMessage) == "")die('{"status":"Error","mesage":"Message should not be empty"}');

$messageBody = "";
$messageBody .= "Sender Email : ".$senderEmail."<br/>";
$messageBody .= "Message : ".$postedMessage."<br/>";
$messageBody .= "Date Selected : ".$dateSelected."<br/>";
if(isset($_POST['contactFor']) && count($_POST['contactFor'])>0)
$messageBody .= "Contacting for : ".join(",",$_POST['contactFor'])."<br/>";
if(isset($_FILES['fileToUpload']) && isset($_FILES['fileToUpload']['name']))
{
    $messageBody .= "Attachment : ".$_FILES['fileToUpload']['name']."<br/>";
}//if(isset($_POST['contactFor']) && count($_POST['contactFor'])>0)
/**************************GET THE SUBMITTED VARIABLES AND VALIDATE ENDS HERE******************************/
?>