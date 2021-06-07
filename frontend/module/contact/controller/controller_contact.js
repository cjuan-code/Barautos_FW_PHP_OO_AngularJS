barautos.controller('controller_contact', function($scope, services, toastr) {

    $scope.sendButton = true;
    $scope.sendButtonS = 'grey';
    $scope.cont_mail = 1;
    $scope.mail_valid = false;
    $scope.usr_valid = false;
    $scope.text_pet_valid = false;

    $scope.val = function() {

        if (!$scope.user_email) {

            if (($scope.cont_mail%8)==0) {
                toastr.error("Estructura email: example@example.example");
            }

            $scope.cont_mail++;
            $scope.mail_valid = false;
        } else {
            $scope.mail_valid = true;
        }

        if ($scope.user_name) {
            $scope.usr_valid = true;
        } else {
            $scope.usr_valid = false;
        }

        if ($scope.text_pet) {
            $scope.text_pet_valid = true;
        } else {
            $scope.text_pet_valid = false;
        }

        if ($scope.mail_valid && $scope.usr_valid && $scope.text_pet_valid) {
            $scope.sendButton = false;
            $scope.sendButtonS = '#fc4366';
        } else {
            $scope.sendButton = true;
            $scope.sendButtonS = 'grey';
        }
    }

    $scope.send = function() {
        var user = $scope.user_name;
        var correo = $scope.user_email;
        var cont = $scope.text_pet;
        services.post('contact', 'sendEmail', {name: user, mail: correo, content: cont})
        .then(function(response) {
            if (response==1) {
                toastr.success('Email sended, you will get a response soon.');
            } else {
                toastr.error('Something failed');
            }
        });

    }
});