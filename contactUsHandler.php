<?php
//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP; 
Class contactUsHandler{
	
	private $output2Display = "";
	//declare variables pertinant to the functionality
	private $messageBody = "";
	private $senderEmail = "";
	private $OSOL_PHPMailer_CONFIG;
	protected function validate(){
		//$_POST = json_decode(file_get_contents('php://input'));
		//die('{"status":"Error","message":"'. print_r($_POST,true).'"}');
		$this->requestedAction = isset($_GET['action'])?$_GET['action']:"";
		if($this->requestedAction == 'displayCaptcha')$this->displayCaptcha();
		
		$this->keystring = isset($_POST['keystring'])?$_POST['keystring']:"";
		if($this->keystring != $_SESSION['OSOLmulticaptcha_keystring'])
		{
			$this->output2Display = '{"status":"Error","message":"Invalid Captcha(Security Text)"}';
			return false;
		}//if(trim($postedMessage) == "")
		$this->senderEmail = isset($_POST['email'])?$_POST['email']:"";
		$postedMessage = isset($_POST['message'])?$_POST['message']:"";
		$dateSelected = isset($_POST['date'])?$_POST['date']:"";
		if(trim($this->senderEmail) == "" || !$this->valid_email($this->senderEmail))
		{
			$this->output2Display = '{"status":"Error","message":"You should enter a valid email address. '. $this->senderEmail . '"}';
			return false;
		}
		if(trim($postedMessage) == "")
		{
			$this->output2Display = '{"status":"Error","message":"Message should not be empty"}';
			return false;
		}

		
		$this->messageBody .= "Sender Email : ".$this->senderEmail."<br/>";
		$this->messageBody .= "Message : ".$postedMessage."<br/>";
		$this->messageBody .= "Date Selected : ".$dateSelected."<br/>";
		if(isset($_POST['contactFor']) && count($_POST['contactFor'])>0)
		$this->messageBody .= "Contacting for : ".join(",",$_POST['contactFor'])."<br/>";
		if(isset($_FILES['fileToUpload']) && isset($_FILES['fileToUpload']['name']))
		{
			$this->messageBody .= "Attachment : ".$_FILES['fileToUpload']['name']."<br/>";
		}//if(isset($_POST['contactFor']) && count($_POST['contactFor'])>0)
		return true;
		
	}
	protected function setConfig(){
		
		$this->OSOL_PHPMailer_CONFIG = array(
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
		
		
	}
	protected function execute(){
		//die(print_r($this->OSOL_PHPMailer_CONFIG,true)."<hr />". print_r($_POST,true));
		//Create a new PHPMailer instance
		$mail = new PHPMailer;
		//Tell PHPMailer to use SMTP
		$mail->isSMTP();
		$mail->SMTPDebug = SMTP::DEBUG_OFF;// there are other options like SMTP::DEBUG_SERVER;
		//Set the hostname of the mail server$class = new ReflectionClass('PHPMailer\PHPMailer\PHPMailer');
		$mail->Host = $this->OSOL_PHPMailer_CONFIG['smtpHost'];
		//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
		$mail->Port =  $this->OSOL_PHPMailer_CONFIG['smtpPort'];//465;//587;
		$smtpSecureConstant = 'ENCRYPTION_START' . $this->OSOL_PHPMailer_CONFIG['SMTPSecure'];
		//use reflection class to get constant with variable
		$class = new ReflectionClass('PHPMailer\PHPMailer\PHPMailer');
		$SMTPSecure=$class->getConstant($smtpSecureConstant);
		//echo $SMTPSecure."<br/>";
		$mail->SMTPSecure = $SMTPSecure;//PHPMailer::$smtpSecureConstant;
		//Whether to use SMTP authentication
		$mail->SMTPAuth = true;
		//Username to use for SMTP authentication - use full email address for gmail
		$mail->Username = $this->OSOL_PHPMailer_CONFIG['username'];
		//Password to use for SMTP authentication
		$mail->Password = $this->OSOL_PHPMailer_CONFIG['password'];
		$mail->setFrom($this->OSOL_PHPMailer_CONFIG['fromEmail'], $this->OSOL_PHPMailer_CONFIG['fromName']);
		//Set an alternative reply-to address
		$mail->addReplyTo($this->senderEmail );//, 'Sender name if you know it');
		$mail->addAddress($this->OSOL_PHPMailer_CONFIG['addAddressEmail'], $this->OSOL_PHPMailer_CONFIG['addAddressName']);
		//Set the subject line
		$mail->Subject = $this->OSOL_PHPMailer_CONFIG['Subject'];
		//Read an HTML message body from an external file, convert referenced images to embedded,
		//convert HTML into a basic plain-text alternative body
		$htmlContentDir = $this->OSOL_PHPMailer_CONFIG['htmlContentDir'];
		$mail->msgHTML(str_replace("__MAIL_CONTENT__",$this->messageBody,file_get_contents($htmlContentDir.'/emailTemplate.html')),$htmlContentDir );
		//Replace the plain text body with one created manually
		$mail->AltBody = ($this->messageBody.'This is a plain-text message body'). str_replace("<br />","\r\n",$this->messageBody);
		if (!$mail->send()) {
			//echo 'Mailer Error: '. $mail->ErrorInfo;
			$this->output2Display = "{\"status\":\"Error\",\"message\":\"".addslashes($mail->ErrorInfo)."\"}";
			return false;
		} else {
			$this->output2Display = ('{"status":"Success"}');
			return true;
		}
		
	}
	
	//bootstrapping method which coordinates all other methods
	public function handleFormPost(){		
		$this->setConfig();
		if($this->validate())
		{
			$this->execute();
		}
		$this->showOutput();
	}
	
	//single method for printing output
	protected function showOutput(){
		echo $this->output2Display;
	}
	
	// helper methods
	protected function valid_email($str) {
        return (!preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $str)) ? FALSE : TRUE;
	}
	
	protected function displayCaptcha()
	{
		$captcha = new \OSOLUtils\Helpers\OSOLmulticaptcha();
		$captcha->displayCaptcha();
		$_SESSION['OSOLmulticaptcha_keystring'] = $captcha->keystring;
		exit;
	}
}

?>