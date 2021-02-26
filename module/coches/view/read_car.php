<br>
<div id="contenido">
    <h1 data-tr = "Car Information">Informacion del coche <?php echo $_GET['id']; ?></h1>
    <p>
    <table border='2'>
        <tr>
            <td data-tr = "Plate">Plate</td>
            <td>
                <?php
                    echo $car_show['matricula'];
                ?>
            </td>
        </tr>
    
        <tr>
            <td data-tr = "Start date">Start date </td>
            <td>
                <?php
                    echo $car_show['f_ini'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td data-tr = "Finish date">Finish date </td>
            <td>
                <?php
                    echo $car_show['f_fin'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td>Color </td>
            <td>
                <?php
                    echo $car_show['color'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td data-tr = "Brand">Brand </td>
            <td>
                <?php
                    echo $car_show['marca'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td>GPS </td>
            <td>
                <?php
                    echo $car_show['gps'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td>Wifi </td>
            <td>
                <?php
                    echo $car_show['wifi'];
                ?>
            </td>
            
        </tr>
        
        <tr>
            <td>KM </td>
            <td>
                <?php
                    echo $car_show['km'];
                ?>
            </td>
        </tr>
    
    </table>
    </p>
    <p><a data-tr = "Back" class="btn btn-danger" href="index.php?page=controller_cars&op=list">Back</a></p>
</div>