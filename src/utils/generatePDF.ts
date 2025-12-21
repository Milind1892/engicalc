import jsPDF from "jspdf";

export function generatePDF({
  title,
  inputs,
  results,
}: {
  title: string;
  inputs: any;
  results: any;
}) {
  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text(title, 20, 20);

  pdf.setFontSize(12);
  pdf.text("Inputs:", 20, 35);
  pdf.text(JSON.stringify(inputs, null, 2), 20, 45);

  pdf.text("Results:", 20, 90);
  pdf.text(JSON.stringify(results, null, 2), 20, 100);

  pdf.save(`${title.replace(" ", "_")}.pdf`);
}
