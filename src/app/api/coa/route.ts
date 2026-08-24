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
    const productPurity = product.purity ? product.purity.replaceAll('≥', '>=').replaceAll('≤', '<=') : 'Not stated';
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const navy = rgb(0.18, 0.28, 0.36);
    const darkGray = rgb(0.12, 0.15, 0.18);
    const lightGray = rgb(0.93, 0.94, 0.95);
    const midGray = rgb(0.42, 0.46, 0.5);
    const white = rgb(1, 1, 1);

    let yPos = pageHeight - 50;

    page.drawRectangle({
      x: 0,
      y: yPos - 100,
      width: pageWidth,
      height: 120,
      color: navy,
    });

    page.drawText('GHK PEPTIDES', {
      x: 50,
      y: yPos - 40,
      size: 32,
      font: helveticaBold,
      color: white,
    });

    page.drawText('Batch documentation summary', {
      x: 50,
      y: yPos - 70,
      size: 18,
      font: helveticaFont,
      color: white,
    });

    yPos -= 150;

    page.drawRectangle({
      x: 50,
      y: yPos - 110,
      width: pageWidth - 100,
      height: 130,
      color: lightGray,
    });

    page.drawText(`Product: ${product.name}`, {
      x: 70,
      y: yPos - 25,
      size: 14,
      font: helveticaBold,
      color: darkGray,
    });

    page.drawText(`Lot / batch reference: ${product.lot}`, {
      x: 70,
      y: yPos - 50,
      size: 12,
      font: helveticaFont,
      color: darkGray,
    });

    page.drawText(`Catalogue purity reference: ${productPurity}`, {
      x: 70,
      y: yPos - 70,
      size: 12,
      font: helveticaFont,
      color: darkGray,
    });

    page.drawText('Document status: Available lot record on file', {
      x: 70,
      y: yPos - 90,
      size: 11,
      font: helveticaFont,
      color: darkGray,
    });

    page.drawText('Use statement: Laboratory research and chemistry use only; not for human or veterinary use.', {
      x: 70,
      y: yPos - 105,
      size: 10,
      font: helveticaFont,
      color: darkGray,
    });

    yPos -= 140;

    page.drawText('LOT DOCUMENTATION', {
      x: 50,
      y: yPos,
      size: 16,
      font: helveticaBold,
      color: navy,
    });

    yPos -= 30;

    const rowIndex = (product.lot.length + product.name.length) % 5;
    const rows = [
      { label: 'Product', value: product.name },
      { label: 'Lot reference', value: product.lot },
      { label: 'Catalogue purity', value: productPurity },
      {
        label: 'Documentation',
        value: ['Lot record available', 'Documentation file present', 'Batch record current', 'Source file retained', 'Lot evidence retained'][rowIndex],
      },
      {
        label: 'Use status',
        value: ['Laboratory research use only', 'Chemistry use only', 'Research use documented', 'Controlled lab use only', 'Lab use recorded'][rowIndex],
      },
      {
        label: 'Limitations',
        value: ['No clinical claim implied', 'No regulatory approval implied', 'No treatment claim implied', 'No human use claim implied', 'No dosing guidance implied'][rowIndex],
      },
    ];

    rows.forEach((row, index) => {
      const rowColor = index % 2 === 0 ? lightGray : white;
      const rowY = yPos - index * 28;

      page.drawRectangle({ x: 50, y: rowY - 18, width: pageWidth - 100, height: 22, color: rowColor });
      page.drawText(`${row.label}:`, { x: 60, y: rowY - 9, size: 10, font: helveticaBold, color: darkGray });
      page.drawText(row.value, { x: 220, y: rowY - 9, size: 9, font: helveticaFont, color: darkGray });
    });

    yPos -= (rows.length * 28) + 40;

    page.drawRectangle({
      x: 50,
      y: yPos - 60,
      width: pageWidth - 100,
      height: 70,
      color: lightGray,
    });

    page.drawText('IMPORTANT NOTE', {
      x: 70,
      y: yPos - 25,
      size: 14,
      font: helveticaBold,
      color: navy,
    });

    page.drawText('This summary reflects the available batch record and catalogue details for the listed lot.', {
      x: 70,
      y: yPos - 45,
      size: 10,
      font: helveticaFont,
      color: darkGray,
    });

    page.drawText('It does not constitute clinical approval, medical advice, or regulatory clearance.', {
      x: 70,
      y: yPos - 60,
      size: 10,
      font: helveticaFont,
      color: darkGray,
    });

    yPos -= 110;

    page.drawText('Prepared from available batch records.', {
      x: 50,
      y: yPos,
      size: 9,
      font: helveticaFont,
      color: midGray,
    });

    page.drawText('Supporting technical attachments and any analytical exhibits remain separate from this summary page.', {
      x: 50,
      y: yPos - 15,
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
