#!/bin/bash

# Create SVG placeholder for missing products
create_placeholder() {
  local filename=$1
  local product_name=$2
  
  cat > "$filename" << SVGEOF
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0d1a17;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <text x="200" y="180" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#00d4aa" text-anchor="middle">GHK</text>
  <text x="200" y="220" font-family="Arial, sans-serif" font-size="14" fill="#666" text-anchor="middle">${product_name}</text>
</svg>
SVGEOF
}

# Generate placeholders for missing products
create_placeholder "ghk-cu-100mg.svg" "GHK-Cu 100mg"
create_placeholder "mots-c-10mg.svg" "MOTS-C 10mg"
create_placeholder "nad-plus-500mg.svg" "NAD+ 500mg"
create_placeholder "klow-80mg.svg" "KLOW 80mg"
create_placeholder "glp3-rt-10mg.svg" "GLP3-RT 10mg"
create_placeholder "igf-1-lr3-10mg.svg" "IGF-1 LR3 10mg"
create_placeholder "tesamorelin-10mg.svg" "Tesamorelin 10mg"
create_placeholder "glp2-tz-10mg.svg" "GLP2-TZ 10mg"
create_placeholder "cjc-1295-no-dac-ipamorelin-10mg.svg" "CJC-1295 + Ipamorelin"
create_placeholder "mt-2-10mg.svg" "Melanotan II 10mg"
create_placeholder "ss-31-10mg.svg" "SS-31 10mg"
create_placeholder "mt-1-10mg.svg" "Melanotan I 10mg"
create_placeholder "wolverine-10mg.svg" "Wolverine 10mg"
create_placeholder "kisspeptin-10mg.svg" "Kisspeptin 10mg"
create_placeholder "cagrilintide-5mg.svg" "Cagrilintide 5mg"
create_placeholder "bpc-157-10mg.svg" "BPC-157 10mg"
create_placeholder "tb-500-10mg.svg" "TB-500 10mg"

echo "Generated $(ls *.svg | wc -l) SVG placeholders"
