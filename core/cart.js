/**
 * Sovereign Cart Logic v3.0
 * Handles temporary session data for Tier Selections.
 */

const SovereignCart = {
    currentSelection: null,

    selectTier(tierName, price) {
        this.currentSelection = {
            tier: tierName,
            amount: price,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('sovereign_intent', JSON.stringify(this.currentSelection));
        console.log(`[CART] Selected: ${tierName} - R${price}`);
    },

    getSelection() {
        const intent = localStorage.getItem('sovereign_intent');
        return intent ? JSON.parse(intent) : null;
    },

    clear() {
        localStorage.removeItem('sovereign_intent');
    }
};
