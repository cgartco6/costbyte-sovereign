/**
 * Sovereign Persistent Auth v4.0
 * Handles Client, Admin, and Owner roles
 */
const Auth = {
    login: (email, role, remember) => {
        const userData = { email, role, timestamp: Date.now() };
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('sov_user', JSON.stringify(userData));
        window.location.href = "dashboard.html";
    },
    check: () => {
        const user = JSON.parse(localStorage.getItem('sov_user')) || JSON.parse(sessionStorage.getItem('sov_user'));
        if (user && document.getElementById('user-display')) {
            document.getElementById('user-display').innerText = `[${user.role.toUpperCase()}] ${user.email}`;
            document.getElementById('login-btn').innerText = "DASHBOARD";
            document.getElementById('login-btn').href = "dashboard.html";
        }
    },
    logout: () => {
        localStorage.removeItem('sov_user');
        sessionStorage.removeItem('sov_user');
        window.location.href = "index.html";
    }
};
document.addEventListener('DOMContentLoaded', Auth.check);
