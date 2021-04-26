function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
}

function friendlyURL(url) {
    return new Promise(function(resolve, reject) {
        //////
        $.ajax({
            url: 'http://' + window.location.hostname + '/paths.php?op=get',
            type: 'POST',
            dataType: 'JSON'
        }).done(function(data) {
            let link = "";
            if (data === true) {
                url = url.replace("?", "");
                url = url.split("&");
                for (let i = 0; i < url.length; i++) {
                    let aux = url[i].split("=");
                    link +=  "/" + aux[1];
                }// end_for
            }else {
                link = '/' + url;
            }// end_else
            resolve ("http://" + window.location.hostname + link);
        }).fail(function(error) {
            reject (error);
        });
    }); 
}// end_friendlyURL

function click_menu_shop() {
    $('body').on('click', '.menu_shop', function() {
        localStorage.setItem('categoria', 'all_items');
        window.location.href="/shop/";
    });
}


$(document).ready(function() {
    click_menu_shop();
});