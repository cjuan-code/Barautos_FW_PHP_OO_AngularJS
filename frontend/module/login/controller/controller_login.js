barautos.controller('controller_login', function($scope, $window, $location, $rootScope, toastr, services, SocialSignIn, logInServices, localStorageServices) {

    var opt = $location.path().split('/');

    if (opt[2]=='recover') {
        $scope.titulo = "Recover password";
        $scope.card_style = {height: 230};
        $scope.cont_pass = 1;
        $scope.loginForm = false;
        $scope.registerForm = false;
        $scope.recoverMailForm = false;
        $scope.recoverPasswdForm = true;
    } else {
        $scope.titulo = "Login";
        $scope.cont_mail = 1;
        $scope.cont_pass = 1;
        $scope.loginForm = true;
        $scope.registerForm = false;
        $scope.recoverMailForm = false;
        $scope.recoverPasswdForm = false;
    }

    $scope.regButton = true;
    $scope.recButton = true;
    $scope.recPassButton = true;

    $scope.changeRegister = function() {
        $scope.loginForm = false;
        $scope.registerForm = true;
        $scope.recoverMailForm = false;
        $scope.recoverPasswdForm = false;
        $scope.titulo = "Register";
    }

    $scope.changeLogin = function() {
        $scope.loginForm = true;
        $scope.registerForm = false;
        $scope.recoverMailForm = false;
        $scope.recoverPasswdForm = false;
        $scope.titulo = "Login";
    }

    $scope.changeRecoverMail = function() {
        $scope.loginForm = false;
        $scope.registerForm = false;
        $scope.recoverMailForm = true;
        $scope.recoverPasswdForm = false;
        $scope.titulo = "Recover password";
    }


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
    }

    $scope.val_mail = function() {

        if (!$scope.email) {

            if (($scope.cont_mail%8)==0) {
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
    }

    $scope.val_pass = function() {
        if ($scope.pass) {
            if (!($scope.pass==$scope.cpass)) {
                
                if (($scope.cont_pass%5)==0) {
                    toastr.error("La password no coincide");
                }

                $scope.cont_pass++;
                $scope.pass_valid = false;
            } else {
                $scope.pass_valid = true;
            }
        } else {
            if (($scope.cont_pass%5)==0) {
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

    }

    $scope.val_mail_rec = function() {

        if (!$scope.recover_mail) {
            if (($scope.cont_mail%8)==0) {
                toastr.error("Estructura email: example@example.example");
            }

            $scope.cont_mail++;
            $scope.recButton = true;
        } else {
            $scope.recButton = false;
        }
    }

    $scope.val_pass_rec = function() {

        if ($scope.pass_recover) {
            if (!($scope.pass_recover==$scope.cpass_recover)) {
                
                if (($scope.cont_pass%5)==0) {
                    toastr.error("La password no coincide");
                }

                $scope.cont_pass++;
                $scope.pass_valid = false;
            } else {
                $scope.pass_valid = true;
            }
        } else {
            if (($scope.cont_pass%5)==0) {
                toastr.error("La password tiene que ser de 6 caracteres");
            }

            $scope.cont_pass++;
            $scope.pass_valid = false;
        }

        if ($scope.pass_valid) {
            $scope.recPassButton = false;
        } else {
            $scope.recPassButton = true;
        }
    }

    $scope.Register = function() {
        var usr = $scope.username_reg;
        var email = $scope.email;
        var pass = $scope.pass;

        services.post('login', 'register', {name: usr, mail: email, password: pass})
        .then(function(response) {

            if (response==0) {
                toastr.error('User not registered');
            } else if (response==1) {
                toastr.success('User registered');
                $window.location.reload();
            } else if (response==2) {
                toastr.error('The email is already used');
            } else if (response==3) {
                toastr.error('The user is already used');
            }
        });
    }

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

                logInServices.loadMenu();
                
                $location.path(last_page);
            }
        });
    }

    $scope.recover_password_email = function() {
        var email = $scope.recover_mail;

        services.post('login', 'send_mail_recover', {email: email})
        .then(function(response) {
            if (response==1) {
                toastr.success('Revisa tu correo, para recuperar tu contraseña');
            } else {
                toastr.error('Algo ha fallado');
            }
        });
    }

    $scope.recover_password = function() {
        var pass = $scope.pass_recover;
        var token = opt[3];

        services.post('login', 'recover_password', {password : pass, tk : token})
        .then(function(response) {
            if (response==1) {
                toastr.success('La contraseña se ha cambiado');
                $location.path('/login');
            } else {
                toastr.error('Algo ha fallado');
            }
        });

    }

    $scope.login_GitHub = function() {
        SocialSignIn.GitHub();
    }

    $scope.login_Gmail = function() {
        SocialSignIn.Gmail();
    }
    

});