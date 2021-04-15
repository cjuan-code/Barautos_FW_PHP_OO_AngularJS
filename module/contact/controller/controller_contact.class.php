<?php

// include(UTILS_PATH . 'common.inc.php');

class controller_contact {
    function list() {
        common::loadView('lib_contact.php', VIEW_PATH_CONTACT . 'contact.html');
    }
}

?>