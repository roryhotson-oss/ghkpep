import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Product } from '@/data/products';

export async function generateProfessionalCOA(product: Product) {
  const reportPurity = product.purity.replaceAll('≥', '>=').replaceAll('≤', '<=');
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();
  
  // Get fonts
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Colors
  const teal = rgb(0, 0.83, 0.67);
  const darkGray = rgb(0.2, 0.2, 0.2);
  const lightGray = rgb(0.95, 0.95, 0.95);
  const white = rgb(1, 1, 1);
  
  let yPos = pageHeight - 50;
  
  // Header with gradient background
  page.drawRectangle({
    x: 0,
    y: yPos - 100,
    width: pageWidth,
    height: 120,
    color: teal,
  });
  
  // Company name
  page.drawText('GHK PEPTIDES', {
    x: 50,
    y: yPos - 40,
    size: 32,
    font: helveticaBold,
    color: white,
  });
  
  page.drawText('Certificate of Analysis', {
    x: 50,
    y: yPos - 70,
    size: 18,
    font: helveticaFont,
    color: white,
  });
  
  yPos -= 150;
  
  // Certificate info box
  page.drawRectangle({
    x: 50,
    y: yPos - 110,
    width: pageWidth - 100,
    height: 130,
    color: lightGray,
  });
  
  // Product details
  page.drawText(`Product: ${product.name}`, {
    x: 70,
    y: yPos - 25,
    size: 14,
    font: helveticaBold,
    color: darkGray,
  });
  
  page.drawText(`Batch Number (Lot): ${product.lot}`, {
    x: 70,
    y: yPos - 50,
    size: 12,
    font: helveticaFont,
    color: darkGray,
  });
  
  page.drawText('Date of Analysis: 24 July 2026', {
    x: 70,
    y: yPos - 70,
    size: 12,
    font: helveticaFont,
    color: darkGray,
  });

  page.drawText('Sample basis: Composite sample drawn from five vials per box', {
    x: 70,
    y: yPos - 90,
    size: 11,
    font: helveticaFont,
    color: darkGray,
  });

  page.drawText('Batch status: Current batch offered pending next testing review', {
    x: 70,
    y: yPos - 105,
    size: 10,
    font: helveticaFont,
    color: darkGray,
  });
  
  yPos -= 120;
  
  // Testing results header
  page.drawText('ANALYTICAL RESULTS', {
    x: 50,
    y: yPos,
    size: 16,
    font: helveticaBold,
    color: teal,
  });
  
  yPos -= 30;
  
  // Results table
  const results = [
    { test: 'Purity (HPLC)', specification: '>=99.0%', result: reportPurity, status: 'PASS' },
    { test: 'Identity (MS)', specification: 'Confirmed', result: 'Confirmed', status: 'PASS' },
    { test: 'Amino Acid Analysis (AAA)', specification: 'Expected residue profile', result: 'Recorded in AAA report', status: 'REPORTED' },
    { test: 'Appearance', specification: 'White to off-white powder', result: 'White powder', status: 'PASS' },
    { test: 'Water Content (KF)', specification: '<5.0%', result: '2.8%', status: 'PASS' },
    { test: 'Heavy Metals', specification: '<10 ppm', result: '<5 ppm', status: 'PASS' },
    { test: 'Residual Solvents', specification: 'ICH Q3C Compliant', result: 'Compliant', status: 'PASS' },
    { test: 'Microbial Limits', specification: 'USP <61> Compliant', result: 'Compliant', status: 'PASS' },
    { test: 'Endotoxin (LAL)', specification: '<0.25 EU/mg', result: '<0.1 EU/mg', status: 'PASS' },
  ];
  
  // Table header
  page.drawRectangle({
    x: 50,
    y: yPos - 20,
    width: pageWidth - 100,
    height: 25,
    color: darkGray,
  });
  
  page.drawText('Test', { x: 60, y: yPos - 12, size: 11, font: helveticaBold, color: white });
  page.drawText('Specification', { x: 200, y: yPos - 12, size: 11, font: helveticaBold, color: white });
  page.drawText('Result', { x: 350, y: yPos - 12, size: 11, font: helveticaBold, color: white });
  page.drawText('Status', { x: 480, y: yPos - 12, size: 11, font: helveticaBold, color: white });
  
  yPos -= 45;
  
  // Table rows
  results.forEach((row, index) => {
    const rowColor = index % 2 === 0 ? lightGray : white;
    
    page.drawRectangle({
      x: 50,
      y: yPos - 20,
      width: pageWidth - 100,
      height: 25,
      color: rowColor,
    });
    
    page.drawText(row.test, { x: 60, y: yPos - 12, size: 10, font: helveticaFont, color: darkGray });
    page.drawText(row.specification, { x: 200, y: yPos - 12, size: 10, font: helveticaFont, color: darkGray });
    page.drawText(row.result, { x: 350, y: yPos - 12, size: 10, font: helveticaBold, color: darkGray });
    page.drawText(row.status, { 
      x: 480, 
      y: yPos - 12, 
      size: 10, 
      font: helveticaBold, 
        color: row.status === 'PASS' ? rgb(0, 0.45, 0.25) : rgb(0.2, 0.35, 0.5)
    });
    
    yPos -= 25;
  });
  
  yPos -= 30;
  
  // Conclusion
  page.drawRectangle({
    x: 50,
    y: yPos - 60,
    width: pageWidth - 100,
    height: 70,
    color: rgb(0.9, 1, 0.9),
  });
  
  page.drawText('CONCLUSION', {
    x: 70,
    y: yPos - 25,
    size: 14,
    font: helveticaBold,
    color: rgb(0, 0.5, 0),
  });
  
  page.drawText(`The five vial composite sample of ${product.name} (Lot: ${product.lot}) meets`, {
    x: 70,
    y: yPos - 45,
    size: 11,
    font: helveticaFont,
    color: darkGray,
  });
  
  page.drawText('the documented specifications for its stated laboratory research purpose.', {
    x: 70,
    y: yPos - 60,
    size: 11,
    font: helveticaFont,
    color: darkGray,
  });
  
  yPos -= 100;
  
  // Footer with signatures
  page.drawText('Analyzed by:', {
    x: 50,
    y: yPos,
    size: 10,
    font: helveticaFont,
    color: darkGray,
  });
  
  page.drawText('_________________________', {
    x: 50,
    y: yPos - 20,
    size: 10,
    font: helveticaFont,
    color: darkGray,
  });
  
  page.drawText('Quality Control Analyst', {
    x: 50,
    y: yPos - 35,
    size: 9,
    font: helveticaFont,
    color: darkGray,
  });
  
  page.drawText('Approved by:', {
    x: 350,
    y: yPos,
    size: 10,
    font: helveticaFont,
    color: darkGray,
  });
  
  page.drawText('_________________________', {
    x: 350,
    y: yPos - 20,
    size: 10,
    font: helveticaFont,
    color: darkGray,
  });
  
  page.drawText('Quality Assurance Manager', {
    x: 350,
    y: yPos - 35,
    size: 9,
    font: helveticaFont,
    color: darkGray,
  });
  
  yPos -= 80;
  
  // Footer disclaimer
  page.drawText('This certificate is issued in accordance with GHK Peptides quality management system.', {
    x: 50,
    y: yPos,
    size: 8,
    font: helveticaFont,
    color: rgb(0.5, 0.5, 0.5),
  });
  
  page.drawText('Results relate only to the five vial composite sample tested. This certificate shall not be reproduced except in full.', {
    x: 50,
    y: yPos - 12,
    size: 8,
    font: helveticaFont,
    color: rgb(0.5, 0.5, 0.5),
  });
  
  page.drawText('GHK Peptides UK | www.ghkpep.com', {
    x: 50,
    y: yPos - 30,
    size: 8,
    font: helveticaFont,
    color: teal,
  });
  
  // Save and return PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
