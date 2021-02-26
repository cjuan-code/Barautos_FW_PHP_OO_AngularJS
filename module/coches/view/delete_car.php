<br>
<div id="contenido">
    <form autocomplete="on" method="post" name="delete_coches" id="delete_coches" action="index.php?page=controller_cars&op=delete&id=<?php echo $_GET['id']; ?>">
        <table border='0'>
            <tr>
                <td align="center"  colspan="2"><h3>¿Desea seguro borrar al usuario <?php echo $_GET['id']; ?>?</h3></td>
                
            </tr>
            <tr>
                <td align="center"><button data-tr = "Accept" type="submit" class="btn btn-outline-success" name="delete" id="delete"> Accept </button></td>
                <td align="center"><a data-tr = "Cancel" class="btn btn-outline-danger" href="index.php?page=controller_cars&op=list"> Cancel </a></td>
            </tr>
        </table>
    </form>
</div>