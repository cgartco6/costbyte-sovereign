function initiatePayment(tier, amount) {
    if (amount === 0 || tier === 'FREE') {
        window.location.href = "intake.html?tier=FREE";
        return;
    }
    // Simulated PayFast Handoff for Production
    alert(`R${amount} Redirect: PayFast ZAR Gateway.`);
    window.location.href = `intake.html?tier=${tier}&status=PAID`;
}
