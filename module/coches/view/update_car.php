<br>
<form method="POST" name="update_coches" id="update_coches">
    <p>
        <label for="matricula" data-tr = "Plate"> Plate </label><br>
        <input name="matricula" id="matricula" type="text" placeholder="Matricula" value="<?php echo $car['matricula']; ?>"/>
        <span id="e_matricula" class="error"><?php $e_matricula=""; echo $e_matricula ?></span>
    </p>
    <p>
        <label for="f_ini" data-tr = "Start date"> Start date </label><br>
        <input name="f_ini" id="f_ini" type="text" placeholder="Fecha de inicio" readonly="readonly" value="<?php echo $car['f_ini']; ?>"/>
        <span id="e_f_ini" class="error"></span>
    </p>
    <p>
        <label for="f_fin" data-tr = "Finish date"> Finish date </label><br>
        <input name="f_fin" id="f_fin" type="text" placeholder="Fecha de finalizacion" readonly="readonly" value="<?php echo $car['f_fin']; ?>"/>
        <span id="e_f_fin" class="error"></span>
    </p>

    <p>
        <label for="color"> Color </label>
        <input name="color" id="color" type="color" value="<?php echo $car['color']; ?>"/>
    </p>
    <p> 
        <label for="marca" data-tr = "Brand"> Brand </label>
        <select name="marca" id="marca" default="<?php echo $car['marca']; ?>">
            <?php 
                if ($car['marca']==="Mercedes") { 
            ?>
            <option value="Seat"> Seat </option>
            <option value="Mercedes" selected> Mercedes </option>
            <option value="Opel"> Opel </option>
            <option value="BMW"> BMW </option>
            <option value="Audi"> Audi </option>
            <option value="Renault"> Renault </option>
            <option value="Toyota"> Toyota </option>
            <?php
               } elseif ($car['marca']==="Opel") { 
            ?>
            <option value="Seat"> Seat </option>
            <option value="Mercedes"> Mercedes </option>
            <option value="Opel" selected> Opel </option>
            <option value="BMW"> BMW </option>
            <option value="Audi"> Audi </option>
            <option value="Renault"> Renault </option>
            <option value="Toyota"> Toyota </option>
            <?php
               } elseif ($car['marca']==="BMW") { 
            ?>
            <option value="Seat"> Seat </option>
            <option value="Mercedes"> Mercedes </option>
            <option value="Opel"> Opel </option>
            <option value="BMW" selected> BMW </option>
            <option value="Audi"> Audi </option>
            <option value="Renault"> Renault </option>
            <option value="Toyota"> Toyota </option>
            <?php
               } elseif ($car['marca']==="Audi") { 
            ?>
            <option value="Seat"> Seat </option>
            <option value="Mercedes"> Mercedes </option>
            <option value="Opel"> Opel </option>
            <option value="BMW"> BMW </option>
            <option value="Audi" selected> Audi </option>
            <option value="Renault"> Renault </option>
            <option value="Toyota"> Toyota </option>
            <?php
               } elseif ($car['marca']==="Renault") { 
            ?>
            <option value="Seat"> Seat </option>
            <option value="Mercedes"> Mercedes </option>
            <option value="Opel"> Opel </option>
            <option value="BMW"> BMW </option>
            <option value="Audi"> Audi </option>
            <option value="Renault" selected> Renault </option>
            <option value="Toyota"> Toyota </option>
            <?php
               } elseif ($car['marca']==="Toyota") { 
            ?>
            <option value="Seat"> Seat </option>
            <option value="Mercedes"> Mercedes </option>
            <option value="Opel"> Opel </option>
            <option value="BMW"> BMW </option>
            <option value="Audi"> Audi </option>
            <option value="Renault"> Renault </option>
            <option value="Toyota" selected> Toyota </option>
            <?php
               }
            ?>
        </select>
    </p>
    <p>
        <label for="gps"> ¿Tiene GPS? </label><br>
        <?php 
            if ($car['gps']==="Si") {
        ?>
        <input name="gps" id="gps" type="radio" value="Si" checked/>
        <label for="gps_yes"> Si </label>
        <input name="gps" id="gps" type="radio" value="No"/>
        <label for="gps_no"> No </label>
        <?php 
         } elseif ($car['gps']==="No") {
        ?>
        <input name="gps" id="gps" type="radio" value="Si"/>
        <label for="gps_yes"> Si </label>
        <input name="gps" id="gps" type="radio" value="No" checked/>
        <label for="gps_no"> No </label>
        <?php 
            }
        ?>
        <span id="e_gps" class="error"></span>
    </p>
    <p>
        <label for="wifi"> ¿Tiene wifi? </label><br>
        <?php 
            if ($car['wifi']==="Si") {
        ?>
        <input name="wifi" id="wifi" type="radio" value="Si" checked/>
        <label for="wifi_yes"> Si </label>
        <input name="wifi" id="wifi" type="radio" value="No"/>
        <label for="wifi_no"> No </label>
        <?php
           } elseif ($car['wifi']==="No") {
        ?>
        <input name="wifi" id="wifi" type="radio" value="Si"/>
        <label for="wifi_yes"> Si </label>
        <input name="wifi" id="wifi" type="radio" value="No" checked/>
        <label for="wifi_no"> No </label>
        <?php 
            }
        ?>
        <span id="e_wifi" class="error"></span>
    </p>
    <p>
        <label for="km"> ¿Cuantos km hechos tiene? </label>
        <input name="km" id="km" type="number" min="0" value="<?php echo $car['km']; ?>"/>
        <span id="e_km" class="error"></span>
    </p>

    <button data-tr = "Update" name="Submit" type="button" class="btn btn-success" onclick="return update_cars()"> Update </button>

</form>