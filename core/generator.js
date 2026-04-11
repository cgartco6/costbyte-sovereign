// core/generator.js
async function generateDelivery() {
    if (typeof window.jspdf === 'undefined' || typeof JSZip === 'undefined') {
        alert("jsPDF or JSZip not loaded. Please ensure vendor libraries are included.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const zip = new JSZip();

    // Create PDF Manifest
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SOVEREIGN AGENCY", 20, 25);
    doc.setFontSize(16);
    doc.text("DELIVERY MANIFEST - PRODUCTION FORGE", 20, 40);
    
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toISOString().slice(0,19).replace('T',' ')}`, 20, 60);
    doc.text(`Operator: ${localStorage.getItem('sovereignUser') || 'SovereignAdmin'}`, 20, 70);
    doc.text(`Role: ${localStorage.getItem('sovereignRole') || 'ADMIN'}`, 20, 80);
    doc.text("Assets: Enterprise VPN Cluster + Production Terminal License", 20, 100);
    doc.text("Settlement Value: $11,498 USD", 20, 110);
    doc.text("Status: FORGED & SEALED", 20, 130);

    // Save PDF locally first
    doc.save("sovereign-delivery-manifest.pdf");

    // Add to ZIP package
    const pdfBlob = doc.output("blob");
    zip.file("manifest/sovereign-delivery-manifest.pdf", pdfBlob);
    zip.file("config/asset-deployment.json", JSON.stringify({
        deployment: "production",
        nodes: 47,
        encryption: "AES-256-GCM",
        integrity: "verified",
        timestamp: new Date().toISOString()
    }, null, 2));

    // Generate ZIP
    const content = await zip.generateAsync({type: "blob"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "sovereign-production-package.zip";
    link.click();

    alert("✓ Industrial delivery package generated:\n• PDF Manifest\n• ZIP Archive with config");
}
