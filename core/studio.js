let currentIdea = null;

function initStudio() {
    updateAuthUI();
    currentIdea = JSON.parse(localStorage.getItem('currentIdea')) || { description: "Your startup idea" };
    document.getElementById('current-idea-display').textContent = `Working on: ${currentIdea.description.substring(0,80)}...`;
    drawLogoPreview();
}

function switchTab(n) {
    document.querySelectorAll('.studio-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + n).classList.add('active');
    document.querySelectorAll('.tab-btn')[n].classList.add('active');
    if (n === 0) drawLogoPreview();
}

function drawLogoPreview() {
    const canvas = document.getElementById('logo-canvas');
    const ctx = canvas.getContext('2d');
    const text = document.getElementById('logo-text').value || "IdeaForge";
    const color = document.getElementById('logo-color').value;
    const bg = document.getElementById('bg-color').value;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.font = "bold 90px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 30);
}

document.getElementById('logo-text').addEventListener('input', drawLogoPreview);
document.getElementById('logo-color').addEventListener('input', drawLogoPreview);
document.getElementById('bg-color').addEventListener('input', drawLogoPreview);

function generateLogoPNG() {
    const canvas = document.getElementById('logo-canvas');
    const link = document.createElement('a');
    link.download = 'logo.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    alert('Logo PNG downloaded — it will also be included in your full ZIP package.');
}

async function generateBrandingPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("BRANDING GUIDELINES", 20, 30);
    doc.setFontSize(14);
    doc.text(currentIdea.description.substring(0,60), 20, 50);
    doc.setFontSize(12);
    doc.text("Primary Color: " + document.getElementById('logo-color').value, 20, 70);
    doc.text("Logo Usage: Place on white or dark backgrounds only.", 20, 85);
    doc.text("Typography: Use Arial / Helvetica for headlines.", 20, 100);
    doc.save("Branding-Guidelines.pdf");
    alert("Branding Guidelines PDF generated!");
}

async function generatePitchDeck() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(28);
    doc.text("PITCH DECK", 20, 40);
    doc.setFontSize(16);
    doc.text(currentIdea.description.substring(0,80), 20, 70);
    // Add 5 sample slides
    doc.addPage();
    doc.text("Problem", 20, 30);
    doc.text("Market Opportunity", 20, 80);
    doc.addPage();
    doc.text("Solution", 20, 30);
    doc.addPage();
    doc.text("Traction & Business Model", 20, 30);
    doc.addPage();
    doc.text("Ask", 20, 30);
    doc.save("Pitch-Deck.pdf");
    alert("Pitch Deck PDF generated (5 slides)!");
}

async function generateMarketingPlan() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("GO-TO-MARKET PLAN", 20, 30);
    doc.setFontSize(12);
    doc.text("Target Audience: Early adopters in your sector", 20, 50);
    doc.text("Channels: LinkedIn, Product Hunt, Indie Hackers", 20, 65);
    doc.text("Budget: $5k first 3 months", 20, 80);
    doc.save("Marketing-Plan.pdf");
    alert("Marketing Plan PDF generated!");
}
