<?php 
require '../../vendor/autoload.php'; // include vendor/autoload.php to load PHPMailer Class
require_once('contactUsHandler.php');
$contactUsHandlerInst =  new contactUsHandler();
$contactUsHandlerInst->handleFormPost();
?>