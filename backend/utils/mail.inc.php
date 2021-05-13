<?php 

class mail {

	public static function buildEmail($type) {

		$content = "";

		switch($type['type']) {
			case 'toClient':

				$type['toEmail'] = $type['email'];
				$type['replyTo'] = 'soporteautobar@gmail.com';
				$type['subject'] = 'Email received';

				$content .= '<h4>Thanks ' . $type['username'] . ' for sending us an email</h4><br>';
                $content .= '<p>You will recive an email soon answering your request.</p><br>';

                break;
			case 'toSupport':

				$type['toEmail'] = 'soporteautobar@gmail.com';
				$type['replyTo'] = 'soporteautobar@gmail.com';
				$type['subject'] = 'Support petition';

				$content .= '<p><strong>Username: ' . $type['username'] .'</strong></p><br>';
				$content .= '<p><strong>Email: ' . $type['email'] .'</strong></p><br>';
				$content .= '<p><strong>Content: ' . $type['content'] .'</strong></p><br>';
				
				break;
			case 'activate':

				$username = $type['username'];

				$type['toEmail'] = $type['email'];
				$type['replyTo'] = 'soporteautobar@gmail.com';
				$type['subject'] = 'Activate user';

				$token = $type['tk'];

				$url = 'http://localhost/login/activate/'.$token;

				$content .= '<p>Hello, ' . $username . ', to activate your account. Press the next link : ' . '<a href="'.$url.'">'.$url.'</a></p>';
				break;

			case 'recover':

				$type['toEmail'] = $type['email'];
				$type['replyTo'] = 'soporteautobar@gmail.com';
				$type['subject'] = 'Recover your password';

				$url = 'http://localhost/login/recover/'.$type['token'];

				$content .= '<p>Hello, to recover your password. Press the next link: <a href="'.$url.'">'.$url.'</a></p>';

				break;
		}

		$type['body'] = $content;
		
		return self::sendMailGun($type);

	}

    public static function sendMailGun($data) {

		$ini_file = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/model/apis/apis.ini');
    	$config = array();
    	$config['api_key'] = $ini_file['mailGunKey']; //API Key
    	$config['api_url'] = $ini_file['mailGunURL']; //API Base URL

    	$message = array();
    	$message['from'] = "soporteautobar@gmail.com";
    	$message['to'] = $data['toEmail'];
    	$message['h:Reply-To'] = $data['replyTo'];
    	$message['subject'] = $data['subject'];
    	$message['html'] = $data['body'];
     
    	$ch = curl_init();
    	curl_setopt($ch, CURLOPT_URL, $config['api_url']);
    	curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    	curl_setopt($ch, CURLOPT_USERPWD, "api:{$config['api_key']}");
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    	curl_setopt($ch, CURLOPT_POST, true); 
    	curl_setopt($ch, CURLOPT_POSTFIELDS,$message);
    	$result = curl_exec($ch);
    	curl_close($ch);
    	return $result;
    }
}

?>