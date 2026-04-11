// core/auth.js - Memorable Session Engine with Roles
let currentUser = null;
let currentRole = null;

function login(username, role = "operator") {
    currentUser = username;
    currentRole = role;
    localStorage.setItem('sovereignUser', username);
    localStorage.setItem('sovereignRole', role);
    console.log(`Sovereign session started → \( {username} ( \){role})`);
}

function updateAuthUI() {
    const el = document.getElementById('auth-status');
    if (el) {
        el.textContent = currentUser ? `\( {currentUser} ( \){currentRole?.toUpperCase()})` : 'Guest';
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

// Restore session on load
window.addEventListener('load', () => {
    currentUser = localStorage.getItem('sovereignUser');
    currentRole = localStorage.getItem('sovereignRole');
});
