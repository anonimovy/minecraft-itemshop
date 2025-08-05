<?php
require_once 'config.php';

header('Content-Type: application/json');


define('API_KEY', 'twoj_sekretny_klucz');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    

    if (!isset($data['api_key']) || $data['api_key'] !== API_KEY) {
        echo json_encode(['success' => false, 'message' => 'Nieprawidłowy klucz API']);
        exit;
    }
    

    try {
        $stmt = $pdo->prepare("INSERT INTO minecraft_orders (player_uuid, player_name, product_id, executed) VALUES (?, ?, ?, 0)");
        $stmt->execute([$data['uuid'], $data['username'], $data['product_id']]);
        
        echo json_encode(['success' => true, 'order_id' => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Błąd bazy danych: ' . $e->getMessage()]);
    }
}
?>