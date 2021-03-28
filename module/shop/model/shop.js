function print_cars(consulta) {

    $('.cont_rows_items').empty();
    ajaxPromise('module/shop/controller/controller_shop.php.?op=print_cars&con='+consulta, 'GET', 'JSON')

    .then(function(data_print) {

        if (data_print=='no' | data_print.length==0) {
            alert("No se han encontrado resultados");
            document.getElementById("form_filters").reset();
            localStorage.setItem('categoria', 'all_items');
            $('#list_items').empty();
            load_divs();
            pagination();
        } else {
            cont = 0;
            
            for (row in data_print) {

                $('<div></div>').attr('class', 'col-xs-12 col-sm-6 col-md-4 single-work row_'+cont).appendTo(".cont_rows_items");
                $('<p class="'+ data_print[row].matricula +'" id="hd_items_'+cont+'">'+ data_print[row].marca + " " + data_print[row].modelo + " " +'<span>' + data_print[row].precio + " € "+ '</span></p>').appendTo('.row_'+cont);
                $('<div></div>').attr('class', 'recent-work-wrap ww_'+cont).appendTo('.row_'+cont);
                $('<img></img>').attr('class', 'img-responsive').attr('src', data_print[row].img).appendTo('.ww_'+cont);
                $('<div></div>').attr('class', 'overlay o_'+cont).appendTo('.ww_'+cont);
                $('<div></div>').attr('class', 'recent-work-inner a_'+cont).appendTo('.o_'+cont);
                $('<a><i class="fa fa-plus"></i></a>').attr('class', 'redir_details').attr('href', '#').attr('id', ''+ data_print[row].matricula +'').appendTo('.a_'+cont);

                cont++;
            }

            var user = localStorage.getItem('user');
            
            ajaxPromise('module/shop/controller/controller_shop.php.?op=liked&user='+user, 'GET', 'JSON')

            .then(function(data_liked) {

                var array_liked = [];
                
                for (row in data_liked) {
                    array_liked.push(data_liked[row].matricula);
                }


                for (i=0; i <= (data_print.length-1); i++) {
                    var mat = document.getElementById('hd_items_'+i).className;
                    var matdb = array_liked.includes(mat);

                    if (matdb) {
                        $('<span class="heart liked" id="'+ data_print[i].matricula +'"><i class="fa fa-heart" aria-hidden="true" ></i></span>').appendTo('#hd_items_'+i);
                        $('<span class="cart" id="'+ data_print[i].matricula +'"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>').appendTo('#hd_items_'+i);
                    } else {
                        $('<span class="heart" id="'+ data_print[i].matricula +'"><i class="fa fa-heart-o" aria-hidden="true" ></i></span>').appendTo('#hd_items_'+i);
                        $('<span class="cart" id="'+ data_print[i].matricula +'"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>').appendTo('#hd_items_'+i);
                    }
                }
                
            })
        }
    })

}


function print_details(car_id) {

    ajaxPromise('module/shop/controller/controller_shop.php.?op=details_car&id='+car_id, 'GET', 'JSON')

    .then(function(data_details) {
        
        // VIEWS UP
        $.ajax({
            url: 'module/shop/controller/controller_shop.php.?op=update_views&id='+car_id,

            success:function() {
                console.log("Views updated");
            },
    
            error:function() {
                console.log("error update views");
            }

        })

        // SLIDER IMG AND INFO
        $('#list_items').empty();
        $('<h1>'+ data_details.marca + " " + data_details.modelo +'</h1>').appendTo('#list_items');
        $('<div></div>').attr('style', 'align-content: left; width: 65%;').attr('class', 'slide_info').appendTo('#list_items');

        $('<div></div>').attr('id', 'main-slider').attr('class', 'no-margin').appendTo('.slide_info');
        $('<div></div>').attr('class', 'slide_info_info').attr('style', 'position: absolute; top: 135px; left: 900px;').appendTo('.slide_info');
       
        $('<h1>Breve descripcion</h1>').appendTo('.slide_info_info');
        $('<hr/>').appendTo('.slide_info_info');
        $('<p><strong><span style="text-align: left;">Color</span>'+ " " +'<span style="float: right;">'+ data_details.color +'</span></strong></p>').appendTo('.slide_info_info');
        $('<p><strong><span style="text-align: left;">Funcionamiento</span>'+ " " +'<span style="float: right;">'+ data_details.funcionamiento +'</span></strong></p>').appendTo('.slide_info_info');
        $('<p><strong><span style="text-align: left;">Manejo</span>'+'<span style="float: right;">'+ data_details.manejo +'</span></strong></p>').appendTo('.slide_info_info');
        $('<a href="#desc"><p>Mas informacion</p></a>').attr('style', 'text-align: right;').appendTo('.slide_info_info');
        $('<h2>'+ data_details.precio +'€</h2>').attr('style', 'text-align: right;').appendTo('.slide_info_info');
        $('<hr/>').appendTo('.slide_info_info');
        $('<p id="buttons"></p>').attr('style','float: right;').appendTo('.slide_info_info');

        // liked 

        var user = localStorage.getItem('user');

        ajaxPromise('module/shop/controller/controller_shop.php.?op=liked&user='+user, 'GET', 'JSON')

        .then(function(data_liked) {

            var array_liked = [];
            
            for (row in data_liked) {
                array_liked.push(data_liked[row].matricula);
            }

            var matdb = array_liked.includes(data_details.matricula);

            if (matdb) {
                $('<span class="heart liked" id="'+ data_details.matricula +'"><i class="fa fa-heart" aria-hidden="true" ></i></span>').appendTo('#buttons');
                $('<span class="cart" id="'+ data_details.matricula +'"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>').appendTo('#buttons');
            } else {
                $('<span class="heart" id="'+ data_details.matricula +'"><i class="fa fa-heart-o" aria-hidden="true" ></i></span>').appendTo('#buttons');
                $('<span class="cart" id="'+ data_details.matricula +'"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>').appendTo('#buttons');
            }
            
        })

        
        $('<div></div>').attr('class', 'carousel slide car-sl').appendTo('#main-slider');
        $('<div></div>').attr('class', 'carousel-inner car-container').appendTo('.car-sl');
        $('<a><i class="fa fa-chevron-left"></i></a>').attr('class','prev hidden-xs hidden-sm').attr('href', '#main-slider').attr('data-slide', 'prev').appendTo('#main-slider');
        $('<a><i class="fa fa-chevron-right"></i></a>').attr('class','next hidden-xs hidden-sm').attr('href', '#main-slider').attr('data-slide', 'next').appendTo('#main-slider');

        // IMGS
        ajaxPromise('module/shop/controller/controller_shop.php.?op=details_img&id='+car_id, 'GET', 'JSON')
            
        .then(function(data_img) {
            cont = 0;

            for (row in data_img) {
                
                if (cont == 0) {
                    $('<div></div>').attr('class', 'item active main-item').attr('style', 'background-image: url('+ data_img[row].img +')').appendTo('.car-container');
                    
                } else {
                    $('<div></div>').attr('class', 'item item_'+cont).attr('style', 'background-image: url('+ data_img[row].img +')').appendTo('.car-container');

                }
                cont++;
            }

        })

        // DESCRIPTION 
        $('<h1>Descripcion</h1>').attr('id', 'desc').appendTo('#list_items');
        $('<hr/>').appendTo('#list_items');
        $('<h3><strong>Marca: </strong>'+ data_details.marca +'</h3>').appendTo('#list_items');
        $('<h3><strong>Modelo: </strong>'+ data_details.modelo +'</h3>').appendTo('#list_items');
        $('<h3><strong>Color: </strong>'+ data_details.color +'</h3>').appendTo('#list_items');
        $('<h3><strong>Capacidad del mavarero: </strong>'+ data_details.cap_mavarero + 'L' +'</h3>').appendTo('#list_items');
        $('<h3><strong>Funcionamiento: </strong>'+ data_details.funcionamiento +'</h3>').appendTo('#list_items');
        $('<h3><strong>Manejo: </strong>'+ data_details.manejo +'</h3>').appendTo('#list_items');
        $('<h3><strong>GPS: </strong>'+ data_details.gps +'</h3>').appendTo('#list_items');
        $('<h3><strong>WIFI: </strong>'+ data_details.wifi +'</h3>').appendTo('#list_items');
        $('<h3><strong>KM: </strong>'+ data_details.km +'</h3>').appendTo('#list_items');
        $('<h3><strong>Numero de asientos: </strong>'+ data_details.n_asientos +'</h3>').appendTo('#list_items');
        $('<h3><strong>Numero de puertas: </strong>'+ data_details.n_puertas +'</h3>').appendTo('#list_items');

        // API GOOGLE BOOKS
        $('<br/>').appendTo('#list_items');
        $('<h1>Libros relacionados</h1>').appendTo('#list_items');
        $('<hr/>').appendTo('#list_items');
        $('<div></div>').attr('class', 'container_api').appendTo('#list_items');

        ajaxPromise("https://www.googleapis.com/books/v1/volumes?q="+data_details.marca, 'GET', 'JSON')

        .then(function(data_api) {
           
            cont = 0;

            for (i = 0; i < 3; i++) {

                $('<div></div>').attr('class', 'col-xs-12 col-sm-6 col-md-4 single-work row_'+cont).appendTo(".container_api");
                $('<p>'+ data_api.items[i].volumeInfo.title+'</p>').appendTo('.row_'+cont);
                $('<div></div>').attr('class', 'recent-work-wrap div_img ww_'+cont).appendTo('.row_'+cont);
                $('<img></img>').attr('class', 'img-responsive').attr('style', 'width: 30%; height: 30%;').attr('src', data_api.items[i].volumeInfo.imageLinks.thumbnail).appendTo('.ww_'+cont);
                $('<button>Comprar</button>').attr('class', 'btn-primary redir_details').attr('onclick','window.location.href="'+data_api.items[i].saleInfo.buyLink+'";').appendTo('.ww_'+cont);

                cont++;
            }
            $('<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>').appendTo('#list_items');
        })

    })
    
}


function build_categorias() {

    ajaxPromise('module/shop/controller/controller_shop.php.?op=categorias', 'GET', 'JSON')

    .then(function(data_cats) {
       
        $('<select></select>').attr('class', 's_cats').attr('name','categoria').attr('id', 'categoria').appendTo('.fs_filters');
        $('<option selected>-- Seleccione una categoria --</option>').attr('value', 'nada').appendTo('.s_cats');

        for (row in data_cats) {
            $('<option value="'+data_cats[row].cod+'">'+data_cats[row].categoria+'</option>').appendTo('.s_cats');
        
        }
    })
}


function build_marcas() {

    ajaxPromise('module/shop/controller/controller_shop.php.?op=marcas', 'GET', 'JSON')

    .then(function(data_marca) {
       
        $('<select></select>').attr('class', 's_marca').attr('name','marca').attr('id', 'marca').appendTo('.fs_filters');
        $('<option selected>-- Seleccione una marca --</option>').attr('value', 'nada').appendTo('.s_marca');

        for (row in data_marca) {
            $('<option value="'+data_marca[row].marca+'">'+data_marca[row].marca+'</option>').appendTo('.s_marca');
        
        }
    })
}


function build_color() {
    
    ajaxPromise('module/shop/controller/controller_shop.php.?op=color', 'GET', 'JSON')

    .then(function(data_color) {
       
        $('<select></select>').attr('class', 's_color').attr('name','color').attr('id', 'color').appendTo('.fs_filters');
        $('<option selected>-- Seleccione un color --</option>').attr('value', 'nada').appendTo('.s_color');

        for (row in data_color) {
            $('<option value="'+data_color[row].color+'">'+data_color[row].color+'</option>').appendTo('.s_color');
        
        }
    })
}


function build_funcionamiento() {
    
    ajaxPromise('module/shop/controller/controller_shop.php.?op=funcionamiento', 'GET', 'JSON')

    .then(function(data_funcionamiento) {
        
        $('<select></select>').attr('class', 's_funcionamiento').attr('name', 'funcionamiento').attr('id', 'funcionamiento').appendTo('.fs_filters');
        $('<option selected>-- Seleccione el funcionamiento --</option>').attr('value', 'nada').appendTo('.s_funcionamiento');

        for (row in data_funcionamiento) {
            $('<option value="'+data_funcionamiento[row].funcionamiento+'">'+data_funcionamiento[row].funcionamiento+'</option>').appendTo('.s_funcionamiento');
            
        }
    })
}


function build_manejo() {
    
    ajaxPromise('module/shop/controller/controller_shop.php.?op=manejo', 'GET', 'JSON')

    .then(function(data_manejo) {
        
        $('<select></select>').attr('class', 's_manejo').attr('name', 'manejo').attr('id', 'manejo').appendTo('.fs_filters');
        $('<option selected>-- Seleccione el manejo --</option>').attr('value', 'nada').appendTo('.s_manejo');

        for (row in data_manejo) {
            $('<option value="'+data_manejo[row].manejo+'">'+data_manejo[row].manejo+'</option>').appendTo('.s_manejo');
            
        }
    })
}


function build_gps() {
    
    ajaxPromise('module/shop/controller/controller_shop.php.?op=gps', 'GET', 'JSON')

    .then(function(data_gps) {
        
        $('<select></select>').attr('class', 's_gps').attr('name', 'gps').attr('id', 'gps').appendTo('.fs_filters');
        $('<option selected>-- Seleccione si tiene GPS --</option>').attr('value', 'nada').appendTo('.s_gps');

        for (row in data_gps) {
            $('<option value="'+data_gps[row].gps+'">'+data_gps[row].gps+'</option>').appendTo('.s_gps');
            
        }
    })
}


function build_wifi() {

    ajaxPromise('module/shop/controller/controller_shop.php.?op=wifi', 'GET', 'JSON')

    .then(function(data_wifi) {
        
        $('<select></select>').attr('class', 's_wifi').attr('name', 'wifi').attr('id', 'wifi').appendTo('.fs_filters');
        $('<option selected>-- Seleccione si tiene WIFI --</option>').attr('value', 'nada').appendTo('.s_wifi');

        for (row in data_wifi) {
            $('<option value="'+data_wifi[row].wifi+'">'+data_wifi[row].wifi+'</option>').appendTo('.s_wifi');
            
        }
    })
}


function build_asientos() {

    ajaxPromise('module/shop/controller/controller_shop.php.?op=asientos', 'GET', 'JSON')

    .then(function(data_asientos) {
        
        $('<select></select>').attr('class', 's_asientos').attr('name', 'asientos').attr('id', 'asientos').appendTo('.fs_filters');
        $('<option selected>-- Seleccione el numero de asientos --</option>').attr('value', 'nada').appendTo('.s_asientos');

        for (row in data_asientos) {
            $('<option value="'+data_asientos[row].n_asientos+'">'+data_asientos[row].n_asientos+'</option>').appendTo('.s_asientos');
            
        }
    })
}


function build_puertas() {

    ajaxPromise('module/shop/controller/controller_shop.php.?op=puertas', 'GET', 'JSON')

    .then(function(data_puertas) {
        
        $('<select></select>').attr('class', 's_puertas').attr('name', 'puertas').attr('id', 'puertas').appendTo('.fs_filters');
        $('<option selected>-- Seleccione el numero de puertas --</option>').attr('value', 'nada').appendTo('.s_puertas');

        for (row in data_puertas) {
            $('<option value="'+data_puertas[row].n_puertas+'">'+data_puertas[row].n_puertas+'</option>').appendTo('.s_puertas');
            
        }
    })
}


function filter_search() {
    var categoria= document.form_filters.categoria.value;
    var marca= document.form_filters.marca.value;
    var color= document.form_filters.color.value;
    var funcionamiento = document.form_filters.funcionamiento.value;
    var manejo = document.form_filters.manejo.value;
    var gps = document.form_filters.gps.value;
    var wifi = document.form_filters.wifi.value;
    var asientos = document.form_filters.asientos.value;
    var puertas = document.form_filters.puertas.value;

    if (categoria=='nada' && marca=='nada' && color=='nada' && funcionamiento=='nada' && manejo=='nada' && gps=='nada' && wifi=='nada' && asientos=='nada' && puertas=='nada') {
        console.log('No filters');
    } else {
        var filters = [];

        if (categoria!='nada') {
            filters.push("categoria");
            filters.push(categoria);
        }

        if (marca!='nada') {
            filters.push("marca");
            filters.push(marca);
        }

        if (color!='nada') {
            filters.push("color");
            filters.push(color);
        }

        if (funcionamiento!='nada') {
            filters.push("funcionamiento");
            filters.push(funcionamiento);
        }

        if (manejo!='nada') {
            filters.push("manejo");
            filters.push(manejo);
        }

        if (gps!='nada') {
            filters.push("gps");
            filters.push(gps);
        }

        if (wifi!='nada') {
            filters.push("wifi");
            filters.push(wifi);
        }

        if (asientos!='nada') {
            filters.push("n_asientos");
            filters.push(asientos);
        }

        if (puertas!='nada') {
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
        $('#list_items').empty();
        load_divs();
        pagination();
    }
}


function print_filters() {
    $('<div></div>').attr('class', 'main_filters').appendTo('#list_items');
    $('<div></div>').attr('class', 'cont_filters').appendTo('.main_filters');
    $('<form></form>').attr('class', 'form_filters').attr('name', 'form_filters').attr('id', 'form_filters').appendTo('.cont_filters');
    $('<div></div>').attr('class', 'fs_filters').appendTo('.form_filters');
    build_categorias();
    build_marcas();
    build_color();
    build_funcionamiento();
    build_manejo();
    build_gps();
    build_wifi();
    build_asientos();
    build_puertas();
    $('<button>Filtrar</button>').attr('type', 'button').attr('class', 'btn btn-success filter_button').attr('onclick', 'filter_search()').appendTo('.form_filters');
    $('<button>Borrar filtros</button>').attr('type', 'button').attr('class', 'btn btn-danger reset_filters').appendTo('.form_filters');

}

function reset_form() {
    
    $('body').on('click', '.reset_filters', function() {
        document.getElementById("form_filters").reset();
        localStorage.setItem('categoria', 'all_items');
        $('#list_items').empty();
        load_divs();
        pagination();
    });
}


function redirect_details() {

    $('body').on('click', '.redir_details', function() {
        var car_id = this.getAttribute('id');
        print_details(car_id);
    });
    
}

function pagination() {

    var categoria = localStorage.getItem('categoria');
    var consulta = localStorage.getItem('consulta');

    if (categoria=='all_items') {
        var consulta_count = "SELECT/COUNT(*)/AS/total/FROM/vehicles";
        var consulta_print = "SELECT/v.*,/i.img/FROM/vehicles/v/INNER/JOIN/img/i/ON/v.matricula=i.matricula/WHERE/i.img/LIKE/('%1.jpg')/ORDER/BY/visitas/DESC";
    } else if (categoria=='Nuevos') {
        var consulta_count = "SELECT/COUNT(*)/AS/total/FROM/vehicles/WHERE/categoria/=/(SELECT/cod/FROM/categories/WHERE/categoria/=/'Nuevos')";
        var consulta_print = "SELECT/v.*,/i.img/FROM/vehicles/v/INNER/JOIN/img/i/ON/v.matricula=i.matricula/WHERE/i.img/LIKE/('%1.jpg')/AND/v.categoria/=/(SELECT/cod/FROM/categories/WHERE/categoria/=/'Nuevos')/ORDER/BY/visitas/DESC";
    } else if (categoria=='KM0') {
        var consulta_count = "SELECT/COUNT(*)/AS/total/FROM/vehicles/WHERE/categoria/=/(SELECT/cod/FROM/categories/WHERE/categoria/=/'KM0')";
        var consulta_print = "SELECT/v.*,/i.img/FROM/vehicles/v/INNER/JOIN/img/i/ON/v.matricula=i.matricula/WHERE/i.img/LIKE/('%1.jpg')/AND/v.categoria/=/(SELECT/cod/FROM/categories/WHERE/categoria/=/'KM0')/ORDER/BY/visitas/DESC";
    } else if (categoria=='Segunda Mano') {
        var consulta_count = "SELECT/COUNT(*)/AS/total/FROM/vehicles/WHERE/categoria/=/(SELECT/cod/FROM/categories/WHERE/categoria/=/'Segunda Mano')";
        var consulta_print = "SELECT/v.*,/i.img/FROM/vehicles/v/INNER/JOIN/img/i/ON/v.matricula=i.matricula/WHERE/i.img/LIKE/('%1.jpg')/AND/v.categoria/=/(SELECT/cod/FROM/categories/WHERE/categoria/=/'Segunda Mano')/ORDER/BY/visitas/DESC";
    } else if (categoria=='search') {
        var consulta_count = consulta.slice(0,6)+"/COUNT(*)/AS/total/"+consulta.slice(18,consulta.length);
        var consulta_print = consulta;
    } else if (categoria=='filters') {
        var consulta_count = consulta.slice(0,6)+"/COUNT(*)/AS/total/"+consulta.slice(18,consulta.length);
        var consulta_print = consulta;
    }

    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: 'module/shop/controller/controller_shop.php.?op=print_cars&con='+consulta_count,

        success:function(data_total) {
        
            var total = data_total[0].total;
            var total_pages = total / 3;

            if (Number.isInteger(total_pages)) {
                var total_pages = total_pages;
            } else {
                var total_pages = Math.ceil(total_pages);
            }
            
            print_cars(consulta_print+'/LIMIT/0,3');

            $('#pagination').bootpag({
                total: total_pages,
                maxVisible: total_pages
             }).on('page', function(event, num){
                var offset = 3 * (num-1);
                var build_consulta = consulta_print+'/LIMIT/'+offset+',3';
                print_cars(build_consulta);

             });
        },

        error:function() {
            console.log("error print");
        }

    })

    localStorage.removeItem('consulta');
}


function load_divs() {
    $('<div></div>').attr('class','container cont1').appendTo('#list_items');
    $('<div></div>').attr('class', 'center fadeInDown cont2').appendTo('.cont1');
    $('<h2>Coches</h2>').appendTo('.cont2');
    print_filters();
    $('<div></div>').attr('id', 'pagination').attr('class', 'center').appendTo('#list_items');
    $('<div></div>').attr('class', 'row cont_rows_items').appendTo('#list_items');
    
}

function check_like() {

    $(document).on("click", '.heart', function() {

        var tk = localStorage.getItem('token');

        if (tk) {
            var car_id = this.getAttribute('id');

            if ($('#'+ car_id +'').hasClass("liked")) {

                $('#'+ car_id +'').html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
                $('#'+ car_id +'').removeClass("liked");
                like(car_id, 'unlike');
                
            } else {

                $('#'+ car_id +'').html('<i class="fa fa-heart" aria-hidden="true"></i>');
                $('#'+ car_id +'').addClass("liked");
                like(car_id, 'like');

            }

        } else {
            window.location.href = 'index.php?page=controller_login&op=list';
        }
    });
}

function like(matricula, op) {

    var user = localStorage.getItem('user');

    ajaxPromise('module/shop/controller/controller_shop.php.?op=favs&mat='+matricula+'&user='+user+'&oper='+op)

}

function check_cart() {
    $(document).on("click", '.heart', function() {

            var car_id = this.getAttribute('id');

            if ($('#'+ car_id +'').hasClass("liked")) {

                $('#'+ car_id +'').html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
                $('#'+ car_id +'').removeClass("liked");
                like(car_id, 'unlike');
                
            } else {

                $('#'+ car_id +'').html('<i class="fa fa-heart" aria-hidden="true"></i>');
                $('#'+ car_id +'').addClass("liked");
                like(car_id, 'like');

            }
    });
}

function check_cart() {
    $(document).on("click", '.cart', function() {

        var car_id = this.getAttribute('id');

        var cart = localStorage.getItem('cart');

        if (cart) {

            var parsed = JSON.parse(cart);
            var array = [];

            if ((Object.keys(parsed).length)==7) {
                array.push(parsed);
                array.push(car_id);
            } else {
                for (row in parsed) {
                    if (parsed[row]!=car_id) {
                        array.push(parsed[row]);
                    }
                }
                array.push(car_id);
            }

            localStorage.setItem('cart', JSON.stringify(array));
        } else {

            var array = [car_id];
            localStorage.setItem('cart', JSON.stringify(array));
        }
    });
}

$(document).ready(function() {
    
    localStorage.setItem('location', 'index.php?page=controller_shop&op=list');

    load_divs();
    pagination();
    redirect_details();
    reset_form();
    check_like();
    check_cart();
});