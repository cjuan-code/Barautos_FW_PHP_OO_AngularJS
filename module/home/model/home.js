function load_carousel() {

    $.ajax ({
        type: 'GET',
        dataType: 'JSON',
        url: 'module/home/controller/controller_home.php.?op=load_carousel',
    
        success:function(data_carousel) {
            cont = 0;
            for (row in data_carousel) {
                if (cont == 0) {
                    $('<div></div>').attr('class', 'item active main-item').attr('style', 'background-image: url('+ data_carousel[row].img +')').appendTo('.car-container');
                    $('<div></div>').attr('class', 'container act-cont').appendTo('.main-item');
                    $('<div></div>').attr('class', 'row act-row').appendTo('.act-cont');
                    $('<div></div>').attr('class', 'col-md-7 act-col').appendTo('.act-row');
                    $('<div></div>').attr('class', 'carousel-content act-content').appendTo('.act-col');
                    $('<h1 style="color: orange;">'+ data_carousel[row].categoria +'</h1>').appendTo('.act-content');
                    $('<a>Ver</a>').attr('class', 'btn-slide animation animated-item-3 redir_shop').attr('href', '#').attr('id', ''+ data_carousel[row].categoria +'').appendTo('.act-content');
                } else {
                    $('<div></div>').attr('class', 'item sec-item').attr('style', 'background-image: url('+ data_carousel[row].img +')').appendTo('.car-container');
                    $('<div></div>').attr('class', 'container sec-cont').appendTo('.sec-item');
                    $('<div></div>').attr('class', 'row sec-row').appendTo('.sec-cont');
                    $('<div></div>').attr('class', 'col-md-7 sec-col').appendTo('.sec-row');
                    $('<div></div>').attr('class', 'carousel-content sec-content').appendTo('.sec-col');
                    $('<h1 style="color: orange;">'+ data_carousel[row].categoria +'</h1>').appendTo('.sec-content');
                    $('<a>Ver</a>').attr('class', 'btn-slide animation animated-item-3 redir_shop').attr('href', '#').attr('id', ''+ data_carousel[row].categoria +'').appendTo('.sec-content');
                }
                cont++;
            }
        }
    
    
    })
    
    

}

function load_cats(offset, append) {

    var consulta = 'SELECT/*/FROM/categories/LIMIT/'+offset+',3';

    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: 'module/home/controller/controller_home.php.?op=load_cats&con='+consulta,

        success:function(data_cats) {
            cont = 0;
        
            for (row in data_cats) {
            $('<div></div>').attr('class', 'col-xs-12 col-sm-6 col-md-4 single-work row_'+append+cont).appendTo("."+append);
            $('<p>'+ data_cats[row].categoria +'</p>').appendTo('.row_'+append+cont);
            $('<div></div>').attr('class', 'recent-work-wrap ww_'+append+cont).appendTo('.row_'+append+cont);
            $('<img></img>').attr('class', 'img-responsive').attr('src', ''+ data_cats[row].img +'').appendTo('.ww_'+append+cont);
            $('<div></div>').attr('class', 'overlay o_'+append+cont).appendTo('.ww_'+append+cont);
            $('<div></div>').attr('class', 'recent-work-inner a_'+append+cont).appendTo('.o_'+append+cont);
            $('<a><i class="fa fa-plus"></i></a>').attr('class', 'redir_shop').attr('href', '#').attr('id', ''+ data_cats[row].categoria +'').appendTo('.a_'+append+cont);
            cont++;
        }
        },

        error:function() {
            console.log("error print");
        }

    })

}

function load_divs() {

    var offset = localStorage.getItem('offset_cats');

    // divs carousel
    $('<div></div>').attr('class', 'carousel slide car-sl').appendTo('#main-slider');
    $('<ol></ol>').attr('class', 'carousel-indicators ol-car').appendTo('.car-sl');
    $('<li></li>').attr('data-target', '#main-slider').attr('data-slide-to', '0').attr('class', 'active').appendTo('.ol-car');
    $('<li></li>').attr('data-target', '#main-slider').attr('data-slide-to', '1').appendTo('.ol-car');
    $('<div></div>').attr('class', 'carousel-inner car-container').appendTo('.car-sl');
    $('<a><i class="fa fa-chevron-left"></i></a>').attr('class','prev hidden-xs hidden-sm').attr('href', '#main-slider').attr('data-slide', 'prev').appendTo('#main-slider');
    $('<a><i class="fa fa-chevron-right"></i></a>').attr('class','next hidden-xs hidden-sm').attr('href', '#main-slider').attr('data-slide', 'next').appendTo('#main-slider');

    // divs categories
    $('<div></div>').attr('class','container cont1').appendTo('#categories');
    $('<div></div>').attr('class', 'center fadeInDown cont2').appendTo('.cont1');
    $('<h2>Categorias</h2>').appendTo('.cont2');
    $('<div></div>').attr('class', 'row cont_rows').appendTo('#categories');
    $('<button>Cargar mas</button>').attr('class', 'btn-primary load_more').attr('href', '#').appendTo('#categories');
    load_carousel();
    load_cats(offset, "cont_rows");
}

function redirect_shop() {
    $('body').on('click', '.redir_shop', function() {
        $categoria = this.getAttribute('id');
        localStorage.setItem('categoria', $categoria);
        window.location.href="index.php?page=controller_shop&op=list";
    });
}

function load_more() {
    $('body').on('click', '.load_more', function() {
        var offset = localStorage.getItem('offset_cats');
        var offset = parseInt(offset);
        var offset = offset + 3;
        localStorage.setItem('offset_cats', offset);
        $('<div></div>').attr('class', 'row cont_rows_'+offset).appendTo('#categories');
        $('.load_more').remove();
        $('<button>Cargar mas</button>').attr('class', 'btn-primary load_more').attr('href', '#').appendTo('#categories');
        load_cats(offset, "cont_rows_"+offset);
    });
}


$(document).ready(function() {
    localStorage.setItem('offset_cats', 0);
    
    load_divs();
    redirect_shop();
    load_more();
});