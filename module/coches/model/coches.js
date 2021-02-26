function check_mat_pattern() {
    var mat = document.getElementById("matricula");
    var patt = '[0-9]{4}[A-Z]{3}';

    var val = new RegExp(patt);

    if (val.test(mat.value)) {
        return true;
    } else {
        return false;
    }
}

function validate_car() {

    if (document.form_coches.matricula.value.length==0) {

        document.getElementById("e_matricula").innerHTML = ("Tiene que escribir la matricula.");
        document.form_coches.matricula.focus();
        return false;
    } else {
        var ck = check_mat_pattern();

        if (ck) {
            document.getElementById("e_matricula").innerHTML = (" ");
        } else {
            document.getElementById("e_matricula").innerHTML = ("La matricula introducida no es valida.");
            document.form_coches.matricula.focus();
            return false;
        }
    }

    if (document.form_coches.f_ini.value.length==0) {
        
        document.getElementById("e_f_ini").innerHTML = ("Tiene que escribir una fecha de inicio.");
        document.form_coches.f_ini.focus();
        return false;
    } else {
        document.getElementById("e_f_ini").innerHTML = (" ");
    }

    if (document.form_coches.f_fin.value.length==0) {
        
        document.getElementById("e_f_fin").innerHTML = ("Tiene que escribir una fecha de fin.");
        document.form_coches.f_fin.focus();
        return false;
    } else {
        document.getElementById("e_f_fin").innerHTML = (" ");

    }
    
    if (document.form_coches.f_fin.value.length==0) {
        
        document.getElementById("e_f_fin").innerHTML = ("Tiene que escribir una fecha de fin.");
        document.form_coches.f_fin.focus();
        return false;
    } else {
        document.getElementById("e_f_fin").innerHTML = (" ");
    }

    if (document.form_coches.gps.value!="Si" && document.form_coches.gps.value!="No") {   

        document.getElementById("e_gps").innerHTML = ("Tiene que indicar si tiene GPS o no.");
        return false;
    } else {
        document.getElementById("e_gps").innerHTML = (" "); 
    }

    if (document.form_coches.wifi.value!="Si" && document.form_coches.wifi.value!="No") {   

        document.getElementById("e_wifi").innerHTML = ("Tiene que indicar si tiene GPS o no.");
        return false;
    } else {
        document.getElementById("e_wifi").innerHTML = (" "); 
    }

    if (document.form_coches.km.value=="") {
        
        document.getElementById("e_km").innerHTML = ("Tiene que poner los kilometros que tiene el vehiculo.");
        document.form_coches.km.focus();
        return false;
    } else {
        document.getElementById("e_km").innerHTML = (" ");
    }
    
    document.form_coches.submit();
    document.form_coches.action="index.php?page=controller_cars&op=create";
    return true;
}

function update_cars() {

    if (document.update_coches.matricula.value.length==0) {

        document.getElementById("e_matricula").innerHTML = ("Tiene que escribir la matricula.");
        document.update_coches.matricula.focus();
        return false;
    } else {
        var ck = check_mat_pattern();

        if (ck) {
            document.getElementById("e_matricula").innerHTML = (" ");
        } else {
            document.getElementById("e_matricula").innerHTML = ("La matricula introducida no es valida.");
            document.update_coches.matricula.focus();
            return false;
        }
    }

    if (document.update_coches.f_ini.value.length==0) {
        
        document.getElementById("e_f_ini").innerHTML = ("Tiene que escribir una fecha de inicio.");
        document.update_coches.f_ini.focus();
        return false;
    } else {
        document.getElementById("e_f_ini").innerHTML = (" ");
    }

    if (document.update_coches.f_fin.value.length==0) {
        
        document.getElementById("e_f_fin").innerHTML = ("Tiene que escribir una fecha de fin.");
        document.update_coches.f_fin.focus();
        return false;
    } else {
        document.getElementById("e_f_fin").innerHTML = (" ");

    }
    
    if (document.update_coches.f_fin.value.length==0) {
        
        document.getElementById("e_f_fin").innerHTML = ("Tiene que escribir una fecha de fin.");
        document.update_coches.f_fin.focus();
        return false;
    } else {
        document.getElementById("e_f_fin").innerHTML = (" ");
    }

    if (document.update_coches.gps.value!="Si" && document.update_coches.gps.value!="No") {   

        document.getElementById("e_gps").innerHTML = ("Tiene que indicar si tiene GPS o no.");
        return false;
    } else {
        document.getElementById("e_gps").innerHTML = (" "); 
    }

    if (document.update_coches.wifi.value!="Si" && document.update_coches.wifi.value!="No") {   

        document.getElementById("e_wifi").innerHTML = ("Tiene que indicar si tiene GPS o no.");
        return false;
    } else {
        document.getElementById("e_wifi").innerHTML = (" "); 
    }

    if (document.update_coches.km.value=="") {
        
        document.getElementById("e_km").innerHTML = ("Tiene que poner los kilometros que tiene el vehiculo.");
        document.update_coches.km.focus();
        return false;
    } else {
        document.getElementById("e_km").innerHTML = (" ");
    }
    
    document.update_coches.submit();
    document.update_coches.action="index.php?page=controller_cars&op=update";
    return true;
}

function remove_car() {
    document.delete_coches.submit();
    document.delete_coches.action="index.php?page=controller_cars&op=delete&id=<?php echo $_GET['id']; ?>";
    return true;
}

// $(document).ready( function () {
//     $('#data_table_crud').DataTable();
// } );
