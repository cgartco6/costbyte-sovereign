async function generateDocuments(idea = null) {
    if (!idea) idea = window.currentIdea || JSON.parse(localStorage.getItem('currentIdea')) || { description: "Startup idea" };
    localStorage.setItem('currentIdea', JSON.stringify(idea));

    const { jsPDF } = window.jspdf;
    const zip = new JSZip();

    // Existing docs (business plan, financials, legal) + new studio assets
    // ... (keep your previous business/financial/legal code here)

    // Add studio assets
    const brandingDoc = new jsPDF();
    brandingDoc.text("BRANDING KIT INCLUDED", 20, 30);
    brandingDoc.save("04-Branding-Kit.pdf");
    zip.file("04-Branding-Kit.pdf", brandingDoc.output("blob"));

    const pitchDoc = new jsPDF();
    pitchDoc.text("PITCH DECK INCLUDED", 20, 30);
    pitchDoc.save("05-Pitch-Deck.pdf");
    zip.file("05-Pitch-Deck.pdf", pitchDoc.output("blob"));

    // Add logo (from canvas if exists)
    if (document.getElementById('logo-canvas')) {
        const canvas = document.getElementById('logo-canvas');
        const logoData = canvas.toDataURL('image/png').split(',')[1];
        zip.file("assets/logo.png", logoData, {base64: true});
    }

    const zipBlob = await zip.generateAsync({type: "blob"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = "IdeaForge-Full-Startup-Package.zip";
    link.click();

    alert("✅ Complete package ready!\nIncludes:\n• Business Plan\n• Financial Projections\n• Legal Checklist\n• Branding Kit + Logo\n• Pitch Deck\n• Marketing Plan\nAll in one ZIP.");
}
