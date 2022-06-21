# Contact Us Tutorial part 6, Implementing Captcha without Cookie
### Author

Name: Sreekanth Dayanand, www.outsource-online.net

### Contributors

This is a solo project.

## Synopsis
Contact Us Tuorial part 6

## Description

*Adding File Upload & attach to mail plus JS Validation code ,AJAX submit and Captcha(without cookie)*

This is the sixth in the series of making a simple contact form. Details can be found here
http://www.outsource-online.net/blog/2022/06/08/setting-up-a-basic-contact-us-form-for-your-site/

## Prerequisites
1. [Composer](https://getcomposer.org/download/) must be installed to run `composer require osolutils/helpers`
2. This is to download [OSOLMutliCaptcha](https://github.com/osolgithub/OSOLMulticaptcha) and [PHPMailer](https://github.com/PHPMailer/PHPMailer) ( without running seperate `composer require phpmailer/phpmailer`)


## Installation
Step By step installation guide
1. Clone/Download origin/tutorial6
2. Run `composer require osolutils/helpers`
3. Set path of `vendor` folder(of composer classes) correctly in `contactUs.php`
5. Edit Config `$this->OSOL_PHPMailer_CONFIG`
6. call `contactUs.html` in browser

## Extending / Installing Addons

## Contributing
Issue Tracker: github.com/project/issues

## License / Copyright Info
copyright (C) 2022 Sreekanth Dayanand, Outsource Online (www.outsource-online.net). All rights reserved.
license see http://www.gnu.org/licenses/gpl-3.0.html  GNU/GPLv3. You can use, redistribute this file and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation.

## Citation
1. How this software can be cited
2. DOI(Digital Object Identifier) link/image

## Contact
Email: info@osolsolutions.in
Url: http://www.outsource-online.net
Url: http://www.osolsolutions.in

## Changes from tutorial 5
1. contactUs.php 
	1. commented `session_start();// for captcha`
2. contactUsHandler class:
	1. commented `$_SESSION['OSOLmulticaptcha_keystring'] = $captcha->keystring;`
	2. added $this->OSOL_Captcha_CONFIG 
```
$this->OSOL_Captcha_CONFIG = array(
									'withoutSession' => true,
									'captchaEncryptionKey' => 'YourUniqueEncryptionKey',										
										);
```	
	3. added getCaptchaWithAjax()  which uses encrtypt & decrypt methods of OSOLMutliCaptcha, instead of session 
	4. getCaptchaWithAjax()  returns json with `captchaEncypted` & `imageContent`
3. OSOLMulticaptcha.php changed to show given captcha text 
4. contactUs.html :  in the contact form additional hidden field `captchaEncypted` added.
5. contactUs.js :
    1. added refreshCaptcha()
		1. to handle  ajax which  returns json with `captchaEncypted` & `imageContent` 
		2. to set hidden field `captchaEncypted` via ajax each time captcha is loaded/refreshed. 
		3. first time loaded in window.onload

	
	



## More to come

5. Add File Upload feature

http://www.outsource-online.net/ is a site managed by http://www.osolsolutions.in/

