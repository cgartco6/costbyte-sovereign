const Generator = {
    async createBrandPlan(email) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("COSTBYTE SOVEREIGN: BRAND PLAN", 20, 20);
        doc.text(`Client: ${email}`, 20, 30);
        doc.save("Brand_Plan.pdf");
    },
    async createAssetZip() {
        const zip = new JSZip();
        zip.file("Industrial_Assets.txt", "Deployment active on 1,000 nodes.");
        zip.generateAsync({type:"blob"}).then(content => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = "Sovereign_Assets.zip";
            link.click();
        });
    }
};
