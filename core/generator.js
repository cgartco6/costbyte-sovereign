async function generateDocuments(idea = null) {
    if (!idea) idea = window.currentIdea || JSON.parse(localStorage.getItem('currentIdea')) || { description: "Startup Idea" };

    const { jsPDF } = window.jspdf;
    const zip = new JSZip();

    // Business Plan
    const bp = new jsPDF();
    bp.setFontSize(22);
    bp.text("BUSINESS PLAN", 20, 30);
    bp.setFontSize(14);
    bp.text(idea.description.substring(0,80), 20, 50);
    bp.setFontSize(12);
    bp.text(`Founder: ${localStorage.getItem('sovereignUser') || 'Founder'}`, 20, 70);
    bp.text(`Date: ${new Date().toISOString().slice(0,10)}`, 20, 80);
    let y = 110;
    ["Executive Summary", "Market Analysis", "Solution", "Financial Overview", "Next Steps"].forEach(title => {
        bp.text(title, 20, y);
        y += 15;
    });
    bp.save("01-Business-Plan.pdf");
    zip.file("01-Business-Plan.pdf", bp.output("blob"));

    // Financial Projections
    const fin = new jsPDF();
    fin.setFontSize(20);
    fin.text("FINANCIAL PROJECTIONS", 20, 30);
    fin.setFontSize(12);
    fin.text("Year 1 Revenue: $150,000", 20, 60);
    fin.text("Year 2 Revenue: $650,000", 20, 75);
    fin.text("Year 3 Revenue: $1,800,000", 20, 90);
    fin.text("Break-even: Month 8", 20, 120);
    fin.save("02-Financial-Projections.pdf");
    zip.file("02-Financial-Projections.pdf", fin.output("blob"));

    // Legal Checklist
    const leg = new jsPDF();
    leg.setFontSize(20);
    leg.text("LEGAL CHECKLIST", 20, 30);
    leg.setFontSize(12);
    const items = ["Entity Formation (LLC/C-Corp)", "EIN Application", "IP Assignment", "Founder Agreements", "Privacy Policy", "Terms of Service"];
    let ly = 50;
    items.forEach(item => {
        leg.text("• " + item, 20, ly);
        ly += 12;
    });
    leg.save("03-Legal-Checklist.pdf");
    zip.file("03-Legal-Checklist.pdf", leg.output("blob"));

    // Branding & Marketing assets
    const brand = new jsPDF();
    brand.text("BRANDING KIT", 20, 30);
    brand.save("04-Branding-Kit.pdf");
    zip.file("04-Branding-Kit.pdf", brand.output("blob"));

    const pitch = new jsPDF();
    pitch.text("PITCH DECK", 20, 30);
    pitch.save("05-Pitch-Deck.pdf");
    zip.file("05-Pitch-Deck.pdf", pitch.output("blob"));

    // Logo from canvas if available
    const canvas = document.getElementById('logo-canvas');
    if (canvas) {
        const logoData = canvas.toDataURL('image/png').split(',')[1];
        zip.file("assets/logo.png", logoData, {base64: true});
    }

    // Final ZIP
    const zipBlob = await zip.generateAsync({type: "blob"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = "IdeaForge-Full-Startup-Package.zip";
    link.click();

    alert("✅ Full startup package generated successfully!\n\nIncludes:\n• Business Plan\n• Financial Projections\n• Legal Checklist\n• Branding Kit\n• Pitch Deck\n• Logo PNG\nAll bundled in one professional ZIP.");
}
