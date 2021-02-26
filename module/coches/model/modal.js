/* function show_read_modal(matr) {
    $('#detailsCar').show();
    $('#read_modal').dialog({
        title: "INFO",
        width: 850,
        height: 500,
        resizable: "false",
        modal: "true",
        hide: "fold",
        show: "fold",
        buttons: {
            Update: function() {
                window.location.href = 'index.php?page=controller_cars&op=update&id=' + matr;
            },
            Delete: function() {
                window.location.href = 'index.php?page=controller_cars&op=delete&id=' + matr;
            }
        }
    });
}

function read_car_modal() {
    $(".hover-car-modal").on("click", ".hover-car-modal", function() {
        var car_id = $(".hover-car-modal").attr("id");

        $.ajax ({
            type: 'GET',
            dataType: 'JSON',
            url: 'module/coches/controller/controller_cars.php?op=read_modal&modal=' + car_id

        }).done(function(car_show) {
            $('<div></div>').attr('id', 'detailsCar', 'type', 'hidden').appendTo("#read_modal");
            $('<div></div>').attr('id', 'containerCar').appendTo("#detailsCar");
            $('#containerCar').empty();
            $('<div></div>').attr('id', 'showCar').appendTo('#containerCar');
            $('#showCar').html(function() {
                var content = "";
                for(row in car_show) {
                    content += '<br><span>' + row + ': <span id=' + row + '>' + car_show[row] + '</span></span>';
                }
                });
                return content;

                show_read_modal(car_show.matricula);
        }).fail(function() {
            window.location.href = 'index.php?page=error503';
        }); 
    });
     
} */

$(document).ready(function() {
    $('#data_table_crud').DataTable();

    $("body").on("click", ".hover-car-modal", function() {
        var car_id = this.getAttribute('id');

        $.ajax ({
            type: 'GET',
            dataType: 'JSON',
            url: 'module/coches/controller/controller_cars.php?op=read&id=' + car_id,

            error:function() {
                console.log("error");
            },

            success:function(car_show) {
                
               $('#read_modal').dialog({
                    autoOpen: false,
                    modal: true,
                    title: "Info",
               });
               $('.hover-car-modal', function() {

                    $('#read_modal').dialog().dialog('open');
                    $('#read_modal').dialog().dialog('option', 'width', 500);
                    $('#read_modal').dialog().dialog('option', 'height', 300);
                    $('<div></div>').attr('id', 'showCar').appendTo('#read_modal');
               
               $('#showCar').html(
                   '<span id="matricula">Matricula: '+car_show.matricula+'</span>'+'<br>'+
                   '<span id="f_ini">Fecha de Inicio: '+car_show.f_ini+'</span>'+'<br>'+
                   '<span id="f_fin">Fecha de final: '+car_show.f_fin+'</span>'+'<br>'+
                   '<span id="color">Color: '+car_show.color+'</span>'+'<br>'+
                   '<span id="marca">Marca: '+car_show.marca+'</span>'+'<br>'+
                   '<span id="gps">GPS: '+car_show.gps+'</span>'+'<br>'+
                   '<span id="wifi">WIFI: '+car_show.wifi+'</span>'+'<br>'+
                   '<span id="km">KM:'+car_show.km+'</span>'
               )
            });

            }
        })

        });
    //localStorage.setItem('currentPage', 'crud');
    //read_car_modal();
});