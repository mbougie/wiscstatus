<?php

include('connect.php');

$sql = "SELECT max(date_added) FROM master.master_sample";

$query = pg_query($dbconn, $sql);
if (!$query) {
  echo "An error occurred.\n";
  exit;
}

$result = pg_fetch_row($query);
echo $result[0];

?>
