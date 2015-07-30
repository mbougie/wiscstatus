<?php

//$conn_string = "host=144.92.235.143 port=5432 dbname=wisttest user=lc_public password=trees";
//$dbconn = pg_connect($conn_string) or die ('Could not connect: ' . pg_last_error());

include('connect.php');

$sql = "SELECT row_to_json(fc)
				FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
				FROM (SELECT 'Feature' As type
				    , row_to_json((SELECT l FROM (SELECT total_need, collected, holder_v5, level1, level1_label, css_id, lc_class_mod, county_underscore, percentage) As l
				      )) As properties
				FROM status.status_counts As lg
				ORDER BY holder_v5    
			) As f 
		)  As fc 
";

$query = pg_query($dbconn, $sql);

$result = pg_fetch_row($query, 0);

echo $result[0];

?>