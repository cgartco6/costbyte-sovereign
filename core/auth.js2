let currentUser = null;

function updateAuthUI() {
    const status = document.getElementById('auth-status');
    if (status) {
        status.textContent = currentUser ? currentUser : 'Guest';
    }
}

function login(username) {
    currentUser = username || 'SovereignOperator';
    localStorage.setItem('sovereignUser', currentUser);
    updateAuthUI();
    console.log('Sovereign session started for', currentUser);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('sovereignUser');
    updateAuthUI();
}

// Auto-login for demo
window.addEventListener('load', () => {
    const saved = localStorage.getItem('sovereignUser');
    if (saved) currentUser = saved;
});
