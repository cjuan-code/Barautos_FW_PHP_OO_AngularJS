barautos.controller('controller_shop', function($scope, $rootScope, $location, $http, services, localStorageServices, categorias, marcas, color, funcionamiento, manejo, gps, wifi, asientos, puertas) {
    
    localStorageServices.setPage('/shop');

    $scope.list = true;
    $scope.list_details = false;
    var categoria = localStorage.getItem('categoria');
    var consulta = localStorage.getItem('consulta');

    if (categoria=='all_items') {
        services.post('shop', 'select_con', {con: "SELECT/v.*,/i.img/FROM/vehicles/v/INNER/JOIN/img/i/ON/v.matricula=i.matricula/WHERE/i.img/LIKE/('%1.jpg')/ORDER/BY/visitas/DESC"})
        .then(function(response) {
            $scope.items = response;
        });
    } else if (categoria=='Nuevos') {
        services.post('shop', 'select_con', {con: "SELECT/v.*,/i.img/FROM/vehicles/v/INNER/JOIN/img/i/ON/v.matricula=i.matricula/WHERE/i.img/LIKE/('%1.jpg')/AND/v.categoria/=/(SELECT/cod/FROM/categories/WHERE/categoria/=/'Nuevos')/ORDER/BY/visitas/DESC"})
        .then(function(response) {
            $scope.items = response;
        });
    } else if (categoria=='KM0') {
        services.post('shop', 'select_con', {con: "SELECT/v.*,/i.img/FROM/vehicles/v/INNER/JOIN/img/i/ON/v.matricula=i.matricula/WHERE/i.img/LIKE/('%1.jpg')/AND/v.categoria/=/(SELECT/cod/FROM/categories/WHERE/categoria/=/'KM0')/ORDER/BY/visitas/DESC"})
        .then(function(response) {
            $scope.items = response;
        });
    } else if (categoria=='Segunda Mano') {
        services.post('shop', 'select_con', {con: "SELECT/v.*,/i.img/FROM/vehicles/v/INNER/JOIN/img/i/ON/v.matricula=i.matricula/WHERE/i.img/LIKE/('%1.jpg')/AND/v.categoria/=/(SELECT/cod/FROM/categories/WHERE/categoria/=/'Segunda Mano')/ORDER/BY/visitas/DESC"})
        .then(function(response) {
            $scope.items = response;
        });
    } else if (categoria=='search') {
        services.post('shop', 'select_con', {con: consulta})
        .then(function(response) {
            $scope.items = response;
        });
    } else if (categoria=='filters') {
        services.post('shop', 'select_con', {con: consulta})
        .then(function(response) {
            $scope.items = response;
        });
    }

    $scope.categorias = categorias;
    $scope.marcas = marcas;
    $scope.color = color;
    $scope.funcionamiento= funcionamiento;
    $scope.manejo = manejo;
    $scope.gps = gps;
    $scope.wifi = wifi;
    $scope.asientos = asientos;
    $scope.puertas = puertas;

    $scope.filter_itms = function() {
        var categoria= $scope.cats_val;
        var marca= $scope.marca_val;
        var color= $scope.color_val;
        var funcionamiento = $scope.func_val;
        var manejo = $scope.manejo_val;
        var gps = $scope.gps_val;
        var wifi = $scope.wifi_val;
        var asientos = $scope.asientos_val;
        var puertas = $scope.puertas_val;

        // console.log(categoria + " " + marca + " " + color + " " + funcionamiento + " " + manejo + " " + gps + " " + wifi + " " + asientos + " " + puertas);

        if (categoria==undefined && marca==undefined && color==undefined && funcionamiento==undefined && manejo==undefined && gps==undefined && wifi==undefined && asientos==undefined && puertas==undefined) {
            console.log('No filters');
        } else {
            var filters = [];
    
            if (categoria!=undefined) {
                filters.push("categoria");
                filters.push(categoria);
            }
    
            if (marca!=undefined) {
                filters.push("marca");
                filters.push(marca);
            }
    
            if (color!=undefined) {
                filters.push("color");
                filters.push(color);
            }
    
            if (funcionamiento!=undefined) {
                filters.push("funcionamiento");
                filters.push(funcionamiento);
            }
    
            if (manejo!=undefined) {
                filters.push("manejo");
                filters.push(manejo);
            }
    
            if (gps!=undefined) {
                filters.push("gps");
                filters.push(gps);
            }
    
            if (wifi!=undefined) {
                filters.push("wifi");
                filters.push(wifi);
            }
    
            if (asientos!=undefined) {
                filters.push("n_asientos");
                filters.push(asientos);
            }
    
            if (puertas!=undefined) {
                filters.push("n_puertas");
                filters.push(puertas);
            }
        }
    
        if (filters) {
            var i;
            var consulta = "SELECT/v.*,/i.img/FROM/vehicles/v/INNER/JOIN/img/i/ON/v.matricula=i.matricula/WHERE/i.img/LIKE/('%1.jpg')/AND/";
    
            for (i = 0; i < filters.length; i++) {
                
                if (i == (filters.length-2)) {
                    consulta += filters[i] + "=" + "'" + filters[i+1] + "'" + "/ORDER/BY/visitas/DESC"
                } else {
                    consulta += filters[i] + "=" + "'" + filters[i+1] + "'" + "/AND/"
                }
                i++;
            }
        }

        if (consulta) {
        
            localStorage.setItem('categoria', 'filters');
            localStorage.setItem('consulta', consulta);
            window.location.reload();    
        }
    
    };

    $scope.redi_details = function(mat) {

        $scope.list = false;
        $scope.list_details = true;
        
        services.post('shop', 'details_car', {id: mat})
        .then(function(response) {
            $scope.details = response;

            $http.get('https://www.googleapis.com/books/v1/volumes?q='+response.marca)
            .then(function(response) {
                $scope.related = response.data.items;
            })
        });

        services.post('shop', 'update_views', {id: mat});

        services.post('shop', 'details_img', {id: mat})
        .then(function(response) {
            $scope.details_img = response;
        });

    };

    $scope.reset_filters = function() {
        $scope.form_filters = {};
        localStorage.setItem('categoria', 'all_items');
        localStorage.removeItem('consulta');
        window.location.reload();
    };

    $scope.redir_related = function(url) {
        window.location.href(url);
    }

    var user = localStorage.getItem('user');

    if (user) {
        services.post('shop', 'liked', {user: user})
        .then(function(response) {
            
            var array_liked = [];
                        
            for (row in response) {
                array_liked.push(response[row].matricula);
            }

            $scope.likes = array_liked;
        });
    } else {
        $scope.likes = [];
    }

    $scope.clk_like = function() {
        
        // var elem = angular.element('#'+this.data.matricula);

        var tk = localStorage.getItem('token');

        if (tk) {

            var user = localStorage.getItem('user');

            if (((this.$parent.likes.indexOf(this.data.matricula))>-1)) {

                var index = this.$parent.likes.indexOf(this.data.matricula);
                this.$parent.likes.splice(index, 1);
                services.post('shop', 'favs', {mat : this.data.matricula, user: user, oper: 'unlike'});

            } else {

                this.$parent.likes.push(this.data.matricula);
                services.post('shop', 'favs', {mat : this.data.matricula, user: user, oper: 'like'});
                
            }

        } else {
            $location.path('/login');
        }

    };

    $scope.clk_cart = function() {
        var newMat = this.data.matricula;

        // $rootScope.cart_mats = newMat;
        var cart = localStorage.getItem('cart');

        if (cart) {

            var parsed = JSON.parse(cart);
            var array = [];

            if ((Object.keys(parsed).length)==7) {
                array.push(parsed);
                array.push(newMat);
            } else {
                for (row in parsed) {
                    if (parsed[row]!=newMat) {
                        array.push(parsed[row]);
                    }
                }
                array.push(newMat);
            }

            localStorage.setItem('cart', JSON.stringify(array));
        } else {

            var array = [newMat];
            localStorage.setItem('cart', JSON.stringify(array));
        }
        // $scope.cart = newMat;

        // console.log(this.$parent.$parent);
    }

});