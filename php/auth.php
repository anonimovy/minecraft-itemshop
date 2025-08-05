<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'register':
                handleRegistration($pdo, $data);
                break;
            case 'login':
                handleLogin($pdo, $data);
                break;
            default:
                echo json_encode(['success' => false, 'message' => 'Nieznana akcja']);
        }
    }
}

function handleRegistration($pdo, $data) {
    // Walidacja danych
    if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
        echo json_encode(['success' => false, 'message' => 'Wszystkie pola są wymagane']);
        return;
    }
    
    if ($data['password'] !== $data['confirmPassword']) {
        echo json_encode(['success' => false, 'message' => 'Hasła nie są identyczne']);
        return;
    }
    
    // Sprawdź czy użytkownik już istnieje
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$data['username'], $data['email']]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'Użytkownik o podanej nazwie lub emailu już istnieje']);
        return;
    }
    
    // Hashowanie hasła
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
    
    // Dodanie użytkownika do bazy
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())");
    $stmt->execute([$data['username'], $data['email'], $hashedPassword]);
    
    echo json_encode(['success' => true, 'message' => 'Rejestracja zakończona pomyślnie']);
}

function handleLogin($pdo, $data) {
    // Znajdź użytkownika po nazwie lub emailu
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$data['username'], $data['username']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user || !password_verify($data['password'], $user['password'])) {
        echo json_encode(['success' => false, 'message' => 'Nieprawidłowa nazwa użytkownika lub hasło']);
        return;
    }
    
    // Ustaw sesję
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['logged_in'] = true;
    
    echo json_encode([
        'success' => true,
        'message' => 'Zalogowano pomyślnie',
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email']
        ]
    ]);
}
?>