function ajaxPromise(sUrl, sType, sTData) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
}

function click_menu_shop() {
    $('body').on('click', '.menu_shop', function() {
        localStorage.setItem('categoria', 'all_items');
        window.location.href="index.php?page=controller_shop&op=list";
    });
}



$(document).ready(function() {
    click_menu_shop();
});