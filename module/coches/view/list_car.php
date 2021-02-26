<br>
<section>
	<div id="contenido">
		<div class="container">
			<div class="row">
					<h3 data-tr = "CAR LIST">CAR LIST</h3>
					<?php echo '&nbsp;'; echo '&nbsp;'; echo '&nbsp;'; echo '&nbsp;'; echo '&nbsp;';?>
					<p><button data-tr = "Create" type="button" class="btn btn-success" onclick="window.location='index.php?page=controller_cars&op=create'"> Crear </button></p>
			</div>
			<div class="row">
				<table id="data_table_crud">
					<thead>
						<tr>
							<td width=125><b data-tr = "Plate">Matricula</b></td>
							<td width=125><b data-tr = "Action">Action</b></td>
						</tr>
					</thead>
					<tbody>
						<?php
							if ($res->num_rows === 0){
								echo '<tr>';
								echo '<td align="center" colspan="3">NO HAY NINGUN COCHE</td>';
								echo '</tr>';
							}else{
								foreach ($res as $row) {
									echo '<tr>';
									echo '<td width=125>'. $row['matricula'] . '</td>';
									echo '<td width=350>';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									//echo '<a data-tr = "Read" class="btn btn-warning" id="read_modal" href="index.php?page=controller_cars&op=read&id='.$row['matricula'].'">Read</a>';
									//print ("<div id='read_modal' class='btn btn-warning'></div>");
									echo '<a data-tr = "Read" class="btn btn-warning hover-car-modal" id='.$row['matricula'].'>Read</a>';
									//print ("<div id='read_modal' class='btn btn-warning'><div class='hover-car-modal' id='".$row['matricula']."' data-tr = 'Read' >Read</div></div>");
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '<a data-tr = "Update" class="btn btn-primary" href="index.php?page=controller_cars&op=update&id='.$row['matricula'].'">Update</a>';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '&nbsp;';
									echo '<a data-tr = "Delete" class="btn btn-danger" href="index.php?page=controller_cars&op=delete&id='.$row['matricula'].'">Delete</a>';
									echo '</td>';
									echo '</tr>';
								}
							}
						?>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div id="read_modal"></div>
</section>