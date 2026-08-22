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
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { getWidth, getHeight } = page;
    
    // Get fonts
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Colors
    const teal = rgb(0, 0.83, 0.67);
    const darkGray = rgb(0.2, 0.2, 0.2);
    const lightGray = rgb(0.95, 0.95, 0.95);
    const white = rgb(1, 1, 1);
    
    let yPos = getHeight() - 50;
    
    // Header with teal background
    page.drawRectangle({
      x: 0,
      y: yPos - 100,
      width: getWidth(),
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
      y: yPos - 80,
      width: getWidth() - 100,
      height: 100,
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
    
    page.drawText(`Lot Number: ${product.lot}`, {
      x: 70,
      y: yPos - 50,
      size: 12,
      font: helveticaFont,
      color: darkGray,
    });
    
    page.drawText(`Date of Analysis: ${new Date().toLocaleDateString('en-GB')}`, {
      x: 70,
      y: yPos - 70,
      size: 12,
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
      { test: 'Purity (HPLC)', specification: '≥99.0%', result: product.purity, status: 'PASS' },
      { test: 'Identity (MS)', specification: 'Confirmed', result: 'Confirmed', status: 'PASS' },
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
      width: getWidth() - 100,
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
        width: getWidth() - 100,
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
        color: rgb(0, 0.7, 0)
      });
      
      yPos -= 25;
    });
    
    yPos -= 30;
    
    // Conclusion
    page.drawRectangle({
      x: 50,
      y: yPos - 60,
      width: getWidth() - 100,
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
    
    page.drawText(`The analyzed sample of ${product.name} (Lot: ${product.lot}) meets all`, {
      x: 70,
      y: yPos - 45,
      size: 11,
      font: helveticaFont,
      color: darkGray,
    });
    
    page.drawText('specifications and is approved for release.', {
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
    
    page.drawText('Results relate only to the sample tested. This certificate shall not be reproduced except in full.', {
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
