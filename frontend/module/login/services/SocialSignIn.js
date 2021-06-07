barautos.factory('SocialSignIn', ['services', 'localStorageServices', 'logInServices', '$location', function(services, localStorageServices, logInServices, $location) {

    var service = {ini_fb: ini_fb, GitHub: GitHub, Gmail: Gmail};
    return service;

    function ini_fb() {
        var config = {
            apiKey: apiKeySL,
            authDomain: domainSL,
            databaseURL: urlSL,
            projectId: idSL,
            storageBucket: "",
            messagingSenderId: pjSL
        };
        firebase.initializeApp(config);
    }

    function GitHub() {
        var provider = new firebase.auth.GithubAuthProvider();
		var authService = firebase.auth();

		authService.signInWithPopup(provider)
		.then(function(result) {

			var tk = 'GH-' + result.user.uid;

			var usr = result.user.displayName.split(" ");
			
			if (usr.length<2) {
				username = usr[0];
			} else {
				username = usr[0].slice(0,1);
				username += usr[1].slice(0,3);
			}
			
			username = username.toLowerCase();

            services.post('login', 'social_login', {id: tk, user: username, mail: result.user.email, photo: result.user.photoURL})
            .then(function(response) {

                localStorageServices.startSession(response);
                last_page = localStorage.getItem('location');

                logInServices.loadMenu();

                $location.path(last_page);            
            });
		}).catch(function(error) {

			var errorCode = error.code;
			console.log(errorCode);
			var errorMessage = error.message;
			console.log(errorMessage);
			var email = error.email;
			console.log(email);
			var credential = error.credential;
			console.log(credential);
		});

    }

    function Gmail() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
    
        var authService = firebase.auth();

		authService.signInWithPopup(provider)
		.then(function(result) {

			var tk = 'GM-' + result.user.uid;

			var usr = result.user.displayName.split(" ");

			if (usr.length<2) {
				username = usr[0];
			} else {
				username = usr[0].slice(0,1);
				username += usr[1].slice(0,3);
			}
			
			username = username.toLowerCase();

            services.post('login', 'social_login', {id: tk, user: username, mail: result.user.email, photo: result.user.photoURL})
            .then(function(response) {

                localStorageServices.startSession(response);
                last_page = localStorage.getItem('location');

                logInServices.loadMenu();

                $location.path(last_page);            
            });
		})
		.catch(function(error) {
			console.log('Se ha encontrado un error:', error);
		});
    }
}]);