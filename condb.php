<?php
	define("HOSTNAME","localhost") ;
	define("DBNAEM","hotel") ;
	define("USERNAME","root") ;
	define("PASSWORD","") ;

	$mysqli = new mysqli( HOSTNAME , USERNAME , PASSWORD );
	$mysqli->select_db(DBNAEM);
	$mysqli->query("SET NAMES utf8");

?>