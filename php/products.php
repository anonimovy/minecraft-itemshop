<?php
require_once 'config.php';

header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $category = isset($_GET['category']) ? $_GET['category'] : null;
        
        $sql = "SELECT * FROM products";
        if ($category) {
            $sql .= " WHERE category = :category";
        }
        
        $stmt = $pdo->prepare($sql);
        if ($category) {
            $stmt->bindParam(':category', $category);
        }
        
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(['success' => true, 'data' => $products]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Błąd bazy danych: ' . $e->getMessage()]);
    }
}
?>