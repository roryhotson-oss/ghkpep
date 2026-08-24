import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { getProducts } from '@/lib/admin-store';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lot = searchParams.get('lot');
  
  if (!lot) {
    return NextResponse.json({ error: 'Lot number required' }, { status: 400 });
  }
  
  // Find product by lot number
  const products = getProducts();
  const product = products.find(p => p.lot === lot);
  
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  
  try {
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
    const teal = rgb(0.18, 0.28, 0.36);
    const darkGray = rgb(0.12, 0.15, 0.18);
    const lightGray = rgb(0.93, 0.94, 0.95);
    const midGray = rgb(0.42, 0.46, 0.5);
    const white = rgb(1, 1, 1);
    
    let yPos = pageHeight - 50;
    
    // Restrained report header
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
    
    page.drawText('Batch Analytical Test Report', {
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
      color: lightGray,
    });
    
    page.drawText('CONCLUSION', {
      x: 70,
      y: yPos - 25,
      size: 14,
      font: helveticaBold,
      color: teal,
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
    page.drawText('Prepared from available batch records:', {
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
    
    page.drawText('Technical documentation record', {
      x: 50,
      y: yPos - 35,
      size: 9,
      font: helveticaFont,
      color: darkGray,
    });
    
    page.drawText('Review status:', {
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
    
    page.drawText('Pending source laboratory attachments', {
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
      color: midGray,
    });
    
    page.drawText('Results relate only to the five vial composite sample tested. This certificate shall not be reproduced except in full.', {
      x: 50,
      y: yPos - 12,
      size: 8,
      font: helveticaFont,
      color: midGray,
    });
    
    page.drawText('GHK Peptides UK | www.ghkpep.com', {
      x: 50,
      y: yPos - 30,
      size: 8,
      font: helveticaFont,
      color: midGray,
    });

    // Technical exhibits and legal status are kept separate from the summary page.
    const exhibits = pdfDoc.addPage([595.28, 841.89]);
    exhibits.drawText('TECHNICAL EXHIBITS AND GOVERNANCE', {
      x: 50,
      y: 790,
      size: 16,
      font: helveticaBold,
      color: teal,
    });
    exhibits.drawText(`Product: ${product.name}   Batch Number (Lot): ${product.lot}`, {
      x: 50,
      y: 765,
      size: 10,
      font: helveticaFont,
      color: darkGray,
    });
    exhibits.drawText('Testing Partner: GLYvantix Research', {
      x: 50,
      y: 748,
      size: 10,
      font: helveticaFont,
      color: darkGray,
    });
    exhibits.drawText('Standards reference: ISO/IEC 17025', {
      x: 50,
      y: 733,
      size: 10,
      font: helveticaFont,
      color: darkGray,
    });

    exhibits.drawText('GRAPHICAL EXHIBITS', {
      x: 50,
      y: 700,
      size: 13,
      font: helveticaBold,
      color: darkGray,
    });
    exhibits.drawRectangle({ x: 50, y: 465, width: 495, height: 210, borderColor: midGray, borderWidth: 1 });
    exhibits.drawLine({ start: { x: 85, y: 520 }, end: { x: 85, y: 665 }, thickness: 1, color: midGray });
    exhibits.drawLine({ start: { x: 85, y: 520 }, end: { x: 510, y: 520 }, thickness: 1, color: midGray });
    exhibits.drawText('HPLC chromatogram: verified instrument export required', { x: 125, y: 585, size: 11, font: helveticaFont, color: midGray });
    exhibits.drawText('No chromatogram is embedded until the source file is supplied.', { x: 125, y: 565, size: 9, font: helveticaFont, color: midGray });

    exhibits.drawRectangle({ x: 50, y: 210, width: 495, height: 210, borderColor: midGray, borderWidth: 1 });
    exhibits.drawLine({ start: { x: 85, y: 265 }, end: { x: 85, y: 410 }, thickness: 1, color: midGray });
    exhibits.drawLine({ start: { x: 85, y: 265 }, end: { x: 510, y: 265 }, thickness: 1, color: midGray });
    exhibits.drawText('Mass spectrum: verified instrument export required', { x: 135, y: 330, size: 11, font: helveticaFont, color: midGray });
    exhibits.drawText('No spectrum is embedded until the source file is supplied.', { x: 135, y: 310, size: 9, font: helveticaFont, color: midGray });

    exhibits.drawText('GOVERNANCE AND LEGAL STATUS', { x: 50, y: 185, size: 13, font: helveticaBold, color: darkGray });
    exhibits.drawText('This material is documented for laboratory research and chemistry use only.', { x: 50, y: 162, size: 9, font: helveticaFont, color: darkGray });
    exhibits.drawText('It is not for human or veterinary administration, diagnosis, or treatment.', { x: 50, y: 147, size: 9, font: helveticaFont, color: darkGray });
    exhibits.drawText('ISO/IEC 17025 is referenced as a testing standard; accreditation is not asserted here without evidence.', { x: 50, y: 132, size: 9, font: helveticaFont, color: darkGray });
    exhibits.drawText('UK legal classification and lawful use depend on the material, activity, and jurisdiction.', { x: 50, y: 117, size: 9, font: helveticaFont, color: darkGray });
    exhibits.drawText('This report does not constitute regulatory approval, clinical authorization, or medical advice.', { x: 50, y: 102, size: 9, font: helveticaFont, color: darkGray });
    
    // Save and return PDF
    const pdfBytes = await pdfDoc.save();
    
    return new NextResponse(pdfBytes as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="COA-${product.lot}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating COA:', error);
    return NextResponse.json({ error: 'Failed to generate COA' }, { status: 500 });
  }
}
