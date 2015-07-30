<?php

$conn_string = "host=144.92.235.143 port=5432 dbname=samples user=lcfr password=FaD9Q4Xek";
$dbconn = pg_connect($conn_string) or die ('Could not connect: ' . pg_last_error());


?>