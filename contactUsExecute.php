<?php
//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;   
//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
$mail->SMTPDebug = SMTP::DEBUG_OFF;// there are other options like SMTP::DEBUG_SERVER;
//Set the hostname of the mail server$class = new ReflectionClass('PHPMailer\PHPMailer\PHPMailer');
$mail->Host = $OSOL_PHPMailer_CONFIG['smtpHost'];
//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port =  $OSOL_PHPMailer_CONFIG['smtpPort'];//465;//587;
$smtpSecureConstant = 'ENCRYPTION_START' . $OSOL_PHPMailer_CONFIG['SMTPSecure'];
//use reflection class to get constant with variable
$class = new ReflectionClass('PHPMailer\PHPMailer\PHPMailer');
$SMTPSecure=$class->getConstant($smtpSecureConstant);
//echo $SMTPSecure."<br/>";
$mail->SMTPSecure = $SMTPSecure;//PHPMailer::$smtpSecureConstant;
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = $OSOL_PHPMailer_CONFIG['username'];
//Password to use for SMTP authentication
$mail->Password = $OSOL_PHPMailer_CONFIG['password'];
$mail->setFrom($OSOL_PHPMailer_CONFIG['fromEmail'], $OSOL_PHPMailer_CONFIG['fromName']);
//Set an alternative reply-to address
$mail->addReplyTo($senderEmail );//, 'Sender name if you know it');
$mail->addAddress($OSOL_PHPMailer_CONFIG['addAddressEmail'], $OSOL_PHPMailer_CONFIG['addAddressName']);
//Set the subject line
$mail->Subject = $OSOL_PHPMailer_CONFIG['Subject'];
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$htmlContentDir = $OSOL_PHPMailer_CONFIG['htmlContentDir'];
$mail->msgHTML(str_replace("__MAIL_CONTENT__",$messageBody,file_get_contents($htmlContentDir.'/emailTemplate.html')),$htmlContentDir );
//Replace the plain text body with one created manually
$mail->AltBody = ($messageBody.'This is a plain-text message body'). str_replace("<br />","\r\n",$messageBody);
if (!$mail->send()) {
    //echo 'Mailer Error: '. $mail->ErrorInfo;
    die("{\"status\":\"error\",\"message\":\"".addslashes($mail->ErrorInfo)."\"}");
} else {
    die('{"status":"Success"}');
}
?>