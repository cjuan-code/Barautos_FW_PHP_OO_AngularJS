function search(e) {
    var inp = document.getElementById('search-bar');
    
    if (e.code == "Enter") {
        var upper = (inp.value).toUpperCase();
        var consulta = 'SELECT/v.*,/i.img/FROM/vehicles/v/INNER/JOIN/img/i/ON/v.matricula=i.matricula/WHERE/i.img/LIKE/("%1.jpg")/AND/v.marca/LIKE/("'+upper+'%")';
        localStorage.setItem("consulta", consulta);
        localStorage.setItem("categoria", "search");
        window.location.href = "/shop/";
    }
};