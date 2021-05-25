barautos.controller('controller_login', function($scope, $rootScope, toastr, services, localStorageServices) {

    $scope.loginForm = true;
    $scope.registerForm = false;
    $scope.recoverMailForm = false;
    $scope.recoverPasswdForm = false;
    $scope.titulo = "Login";
    $scope.regButton = true;
    $scope.recButton = true;
    $scope.recPassButton = true;
    $scope.cont_mail = 1;
    $scope.cont_pass = 1;

    $scope.changeRegister = function() {
        $scope.loginForm = false;
        $scope.registerForm = true;
        $scope.recoverMailForm = false;
        $scope.recoverPasswdForm = false;
        $scope.titulo = "Register";
    };

    $scope.changeLogin = function() {
        $scope.loginForm = true;
        $scope.registerForm = false;
        $scope.recoverMailForm = false;
        $scope.recoverPasswdForm = false;
        $scope.titulo = "Login";
    };

    $scope.changeRecoverMail = function() {
        $scope.loginForm = false;
        $scope.registerForm = false;
        $scope.recoverMailForm = true;
        $scope.recoverPasswdForm = false;
        $scope.titulo = "Recover password";
    };


    $scope.val_user = function() {
        if ($scope.username_reg.length==0) {
            toastr.error("Introduzca un usuario");
            $scope.usr_valid = false;
        } else {
            $scope.usr_valid = true;
        }

        if ($scope.pass_valid && $scope.mail_valid && $scope.usr_valid) {
            $scope.regButton = false;
        } else {
            $scope.regButton = true;
        }
    };

    $scope.val_mail = function() {

        if (!$scope.email) {

            if (($scope.cont_mail%3)==0) {
                toastr.error("Estructura email: example@example.example");
            }

            $scope.cont_mail++;
            $scope.mail_valid = false;
        } else {
            $scope.mail_valid = true;
        }

        if ($scope.pass_valid && $scope.mail_valid && $scope.usr_valid) {
            $scope.regButton = false;
        } else {
            $scope.regButton = true;
        }
    };

    $scope.val_pass = function() {
        if ($scope.pass) {
            if (!($scope.pass==$scope.cpass)) {
                
                if (($scope.cont_pass%3)==0) {
                    toastr.error("La password no coincide");
                }

                $scope.cont_pass++;
                $scope.pass_valid = false;
            } else {
                $scope.pass_valid = true;
            }
        } else {
            if (($scope.cont_pass%3)==0) {
                toastr.error("La password tiene que ser de 6 caracteres");
            }

            $scope.cont_pass++;
            $scope.pass_valid = false;
        }

        if ($scope.pass_valid && $scope.mail_valid && $scope.usr_valid) {
            $scope.regButton = false;
        } else {
            $scope.regButton = true;
        }

    };

    $scope.Register = function() {
        var usr = $scope.username_reg;
        var email = $scope.email;
        var pass = $scope.pass;

        console.log(usr + " " + email + " " + pass);

        // services.post('login', 'register', {name: usr, mail: email, password: pass})
        // .then(function(response) {
        //     console.log(response);
        // });
    };

    $scope.Login = function() {
        var usr = $scope.username_login;
        var pass = $scope.pass_login;

        services.post('login', 'login', {user: usr, password: pass})
        .then(function(response) {
            
            if (response==2) {
                toastr.error("El usuario no existe");
            } else if (response==1) {
                toastr.error("La contraseña no coincide");
            } else if (response==0) {
                toastr.error("El usuario no esta activado");
            } else {

                localStorageServices.startSession(response);
                last_page = localStorage.getItem('location');
                $rootScope.login_red = false;
                $rootScope.profile = true;

                window.location.href = last_page;
            }
        });
    };

});