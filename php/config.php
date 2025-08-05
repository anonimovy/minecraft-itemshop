<?php

define('DB_HOST', 'localhost');
define('DB_USER', 'username');
define('DB_PASS', 'password');
define('DB_NAME', 'minecraft_shop');


define('SITE_NAME', 'ColorMC - Sklep');
define('SITE_URL', 'https://colormc.pl');


session_start();


try {
    $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Błąd połączenia z bazą danych: " . $e->getMessage());
}
?>