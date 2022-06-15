<?php
$OSOL_PHPMailer_CONFIG = array(
                            'username' => 'username of email',
                            'password' => 'password of email', // app password if it is gmail
                            'smtpHost' => 'smtp server url',
                            'smtpPort' => 587,// check with the host, ususally it is 587
                            'SMTPSecure' => 'TLS',// PHPMailer::ENCRYPTION_STARTTLS OR PHPMailer::ENCRYPTION_STARTSMTPS
                            'fromEmail' => 'yourFromEmail@domain.com',
                            'fromName' => 'your from name',
                            'addAddressEmail' => 'yourAddAddressEmail@domain.com',
                            'addAddressName' => 'your Add Address name',
                            'Subject' => 'your subject for contact us mail submission',
                            'htmlContentDir' => __DIR__."/emailTemplates",// folder where hmtl template is saved
                            );					
?>