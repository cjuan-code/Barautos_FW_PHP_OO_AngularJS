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

function load_cats() {

    ajaxPromise('module/home/controller/controller_home.php.?op=load_cats', 'GET', 'JSON')

    .then(function(data_cats) {
        cont = 0;
        
        for (row in data_cats) {
            $('<div></div>').attr('class', 'col-xs-12 col-sm-6 col-md-4 single-work row_'+cont).appendTo(".cont_rows");
            $('<p>'+ data_cats[row].categoria +'</p>').appendTo('.row_'+cont);
            $('<div></div>').attr('class', 'recent-work-wrap ww_'+cont).appendTo('.row_'+cont);
            $('<img></img>').attr('class', 'img-responsive').attr('src', ''+ data_cats[row].img +'').appendTo('.ww_'+cont);
            $('<div></div>').attr('class', 'overlay o_'+cont).appendTo('.ww_'+cont);
            $('<div></div>').attr('class', 'recent-work-inner a_'+cont).appendTo('.o_'+cont);
            $('<a><i class="fa fa-plus"></i></a>').attr('class', 'redir_shop').attr('href', '#').attr('id', ''+ data_cats[row].categoria +'').appendTo('.a_'+cont);
            cont++;
        }
    }) // end-ajax

}

function load_divs() {

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
    load_carousel();
    load_cats();
}

function redirect_shop() {
    $('body').on('click', '.redir_shop', function() {
        $categoria = this.getAttribute('id');
        localStorage.setItem('categoria', $categoria);
        window.location.href="index.php?page=controller_shop&op=list";
    });
}


$(document).ready(function() {
    load_divs();
    redirect_shop();
});