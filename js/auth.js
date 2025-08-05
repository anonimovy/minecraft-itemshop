// Rejestracja
document.getElementById('registerForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    try {
        const response = await fetch('php/auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'register',
                username,
                email,
                password,
                confirmPassword
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
            window.location.href = 'login.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Błąd:', error);
        alert('Wystąpił błąd podczas rejestracji');
    }
});

// Logowanie
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    try {
        const response = await fetch('php/auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'login',
                username,
                password,
                rememberMe
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Błąd:', error);
        alert('Wystąpił błąd podczas logowania');
    }
});