let currentUser = null;
let currentRole = null;

function login(username, role = "founder", email = "") {
    currentUser = username;
    currentRole = role;
    localStorage.setItem('sovereignUser', username);
    localStorage.setItem('sovereignRole', role);
    if (email) localStorage.setItem('sovereignEmail', email);
    console.log(`Session started for ${username}`);
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

// Restore session
window.addEventListener('load', () => {
    currentUser = localStorage.getItem('sovereignUser');
    currentRole = localStorage.getItem('sovereignRole');
});
