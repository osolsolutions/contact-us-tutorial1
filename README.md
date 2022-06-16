# Contact Us Tuorial part 2
Using OOP to handle functionalities for sending mail via PHPMailer

create class with methods handling functionalities of each component files in the previous tutorial

declare on those methods and properties called from outside as `public`

```
Class contactUsHandler{
	
	private $output2Display = "";
	//declare variables pertinant to the functionality
	
	protected function validate(){}
	protected function setConfig(){}
	protected function execute(){}	
	
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
	protected function valid_email($str) {}
}
```	

And change `contactUs.php` to

```
<?php 
require '../../vendor/autoload.php'; // include vendor/autoload.php to load PHPMailer Class
require_once('contactUsHandler.php');
$contactUsHandlerInst =  new contactUsHandler();
$contactUsHandlerInst->handleFormPost();
?>
```

This is the second in the series of making a simple contact form. Details can be found here
http://www.outsource-online.net/blog/2022/06/08/setting-up-a-basic-contact-us-form-for-your-site/

## More to come

2. Add JS Validation code
3. Add Captcha
4. Add File Upload feature
5. Post with AJAX and captcha

http://www.outsource-online.net/ is a site managed by http://www.osolsolutions.in/

