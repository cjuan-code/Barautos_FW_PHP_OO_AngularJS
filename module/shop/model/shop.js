function print_all_items() {

    $('.cont_rows_items').empty();
    ajaxPromise('module/shop/controller/controller_shop.php.?op=all', 'GET', 'JSON')

    .then(function(data_all) {
        cont = 0;

        for (row in data_all) {

            $('<div></div>').attr('class', 'col-xs-12 col-sm-6 col-md-4 single-work row_'+cont).appendTo(".cont_rows_items");
            $('<p><strong>'+ data_all[row].marca + " " + data_all[row].modelo + '<p style="margin-top: -15px; margin-bottom: -10px;">' + data_all[row].precio + "€" + '</p>' +'</strong></p>').appendTo('.row_'+cont);
            $('<div></div>').attr('class', 'recent-work-wrap ww_'+cont).appendTo('.row_'+cont);
            $('<img></img>').attr('class', 'img-responsive').attr('src', data_all[row].img).appendTo('.ww_'+cont);
            $('<div></div>').attr('class', 'overlay o_'+cont).appendTo('.ww_'+cont);
            $('<div></div>').attr('class', 'recent-work-inner a_'+cont).appendTo('.o_'+cont);
            $('<a><i class="fa fa-plus"></i></a>').attr('class', 'redir_details').attr('href', '#').attr('id', ''+ data_all[row].matricula +'').appendTo('.a_'+cont);
            cont++;
        }
    })

}


function print_nuevos() {

    $('.cont_rows_items').empty();
    ajaxPromise('module/shop/controller/controller_shop.php.?op=nuevos', 'GET', 'JSON')

    .then(function(data_nuevos) {
        cont = 0;

        for (row in data_nuevos) {
            $('<div></div>').attr('class', 'col-xs-12 col-sm-6 col-md-4 single-work row_'+cont).appendTo(".cont_rows_items");
            $('<p>'+ data_nuevos[row].marca + " " + data_nuevos[row].modelo + " " + data_nuevos[row].precio + " €" +'</p>').appendTo('.row_'+cont);
            $('<div></div>').attr('class', 'recent-work-wrap ww_'+cont).appendTo('.row_'+cont);
            $('<img></img>').attr('class', 'img-responsive').attr('src', data_nuevos[row].img).appendTo('.ww_'+cont);
            $('<div></div>').attr('class', 'overlay o_'+cont).appendTo('.ww_'+cont);
            $('<div></div>').attr('class', 'recent-work-inner a_'+cont).appendTo('.o_'+cont);
            $('<a><i class="fa fa-plus"></i></a>').attr('class', 'redir_details').attr('href', '#').attr('id', ''+ data_nuevos[row].matricula +'').appendTo('.a_'+cont);
            cont++;
        }
    })
}


function print_km0() {

    $('.cont_rows_items').empty();
    ajaxPromise('module/shop/controller/controller_shop.php.?op=KM0', 'GET', 'JSON')

    .then(function(data_km0) {
        cont = 0;

        for (row in data_km0) {

            $('<div></div>').attr('class', 'col-xs-12 col-sm-6 col-md-4 single-work row_'+cont).appendTo(".cont_rows_items");
            $('<p>'+ data_km0[row].marca + " " + data_km0[row].modelo + " " + data_km0[row].precio + " €" +'</p>').appendTo('.row_'+cont);
            $('<div></div>').attr('class', 'recent-work-wrap ww_'+cont).appendTo('.row_'+cont);
            $('<img></img>').attr('class', 'img-responsive').attr('src', data_km0[row].img).appendTo('.ww_'+cont);
            $('<div></div>').attr('class', 'overlay o_'+cont).appendTo('.ww_'+cont);
            $('<div></div>').attr('class', 'recent-work-inner a_'+cont).appendTo('.o_'+cont);
            $('<a><i class="fa fa-plus"></i></a>').attr('class', 'redir_details').attr('href', '#').attr('id', ''+ data_km0[row].matricula +'').appendTo('.a_'+cont);
            cont++;
        }
    })

}


function print_segunda_mano() {

    ajaxPromise('module/shop/controller/controller_shop.php.?op=sec_hand', 'GET', 'JSON')

    .then(function(data_segunda_mano) {
        cont = 0;

        for (row in data_segunda_mano) {

            $('<div></div>').attr('class', 'col-xs-12 col-sm-6 col-md-4 single-work row_'+cont).appendTo(".cont_rows_items");
            $('<p>'+ data_segunda_mano[row].marca + " "  + data_segunda_mano[row].modelo + " " + data_segunda_mano[row].precio + " €" +'</p>').appendTo('.row_'+cont);
            $('<div></div>').attr('class', 'recent-work-wrap ww_'+cont).appendTo('.row_'+cont);
            $('<img></img>').attr('class', 'img-responsive').attr('src', data_segunda_mano[row].img).appendTo('.ww_'+cont);
            $('<div></div>').attr('class', 'overlay o_'+cont).appendTo('.ww_'+cont);
            $('<div></div>').attr('class', 'recent-work-inner a_'+cont).appendTo('.o_'+cont);
            $('<a><i class="fa fa-plus"></i></a>').attr('class', 'redir_details').attr('href', '#').attr('id', ''+ data_segunda_mano[row].matricula +'').appendTo('.a_'+cont);
            cont++;
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
        $('<span><button>Añadir al carrito</button></span>'+'<span><button>Añadir a favoritos</button></span>').attr('style','float: right;').appendTo('.slide_info_info');

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
        $('<h3><strong>Capacidad del maletero: </strong>'+ data_details.cap_maletero + 'L' +'</h3>').appendTo('#list_items');
        $('<h3><strong>Funcionamiento: </strong>'+ data_details.funcionamiento +'</h3>').appendTo('#list_items');
        $('<h3><strong>Manejo: </strong>'+ data_details.manejo +'</h3>').appendTo('#list_items');
        $('<h3><strong>GPS: </strong>'+ data_details.gps +'</h3>').appendTo('#list_items');
        $('<h3><strong>WIFI: </strong>'+ data_details.wifi +'</h3>').appendTo('#list_items');
        $('<h3><strong>KM: </strong>'+ data_details.km +'</h3>').appendTo('#list_items');
        $('<h3><strong>Numero de asientos: </strong>'+ data_details.n_asientos +'</h3>').appendTo('#list_items');
        $('<h3><strong>Numero de puertas: </strong>'+ data_details.n_puertas +'</h3>').appendTo('#list_items');

        

    })
    
}


function print_filters_items(consulta) {
    
    ajaxPromise('module/shop/controller/controller_shop.php.?op=filters&con='+consulta, 'GET', 'JSON')

    .then(function(data_fil) {

        if (data_fil=='no' | data_fil.length==0) {
            alert("No se han encontrado resultados");
            document.getElementById("form_filters").reset();
            print_all_items();
        } else {
            cont = 0;

            for (row in data_fil) {

                $('<div></div>').attr('class', 'col-xs-12 col-sm-6 col-md-4 single-work row_'+cont).appendTo(".cont_rows_items");
                $('<p>'+ data_fil[row].marca + " "  + data_fil[row].modelo + " " + data_fil[row].precio + " €" +'</p>').appendTo('.row_'+cont);
                $('<div></div>').attr('class', 'recent-work-wrap ww_'+cont).appendTo('.row_'+cont);
                $('<img></img>').attr('class', 'img-responsive').attr('src', data_fil[row].img).appendTo('.ww_'+cont);
                $('<div></div>').attr('class', 'overlay o_'+cont).appendTo('.ww_'+cont);
                $('<div></div>').attr('class', 'recent-work-inner a_'+cont).appendTo('.o_'+cont);
                $('<a><i class="fa fa-plus"></i></a>').attr('class', 'redir_details').attr('href', '#').attr('id', ''+ data_fil[row].matricula +'').appendTo('.a_'+cont);
                
                cont++;
            }
        }
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
        $('.cont_rows_items').empty();
        print_filters_items(consulta);
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
        print_all_items();
    });
}


function redirect_details() {

    $('body').on('click', '.redir_details', function() {
        var car_id = this.getAttribute('id');
        print_details(car_id);
    });
    
}


function load_divs() {
    $('<div></div>').attr('class','container cont1').appendTo('#list_items');
    $('<div></div>').attr('class', 'center fadeInDown cont2').appendTo('.cont1');
    $('<h2>Coches</h2>').appendTo('.cont2');
    print_filters();
    $('<div></div>').attr('class', 'row cont_rows_items').appendTo('#list_items');
}





$(document).ready(function() {

    var categoria = localStorage.getItem('categoria');
    load_divs();

    if (categoria=="all_items") {
        print_all_items();
    } else if (categoria=='Nuevos') {
        print_nuevos();
    } else if (categoria=='KM0') {
        print_km0();
    } else if (categoria=='Segunda Mano') {
        print_segunda_mano();
    }

    redirect_details();
    reset_form();
});