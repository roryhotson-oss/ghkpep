#!/bin/bash

# Dark teal background color (hex: 1a3d3a) - matching product images
BG_COLOR="0x1a3d3a"
PRODUCT_WIDTH=1408
PRODUCT_HEIGHT=768

echo "Processing accessory images with dark teal background..."

# Process research-accessory-1.avif
echo "Processing research-accessory-1.avif..."
ffmpeg -i research-accessory-1.avif -f lavfi -i color=size=${PRODUCT_WIDTH}x${PRODUCT_HEIGHT}:c=${BG_COLOR} -filter_complex "[1][0]scale2ref=${PRODUCT_WIDTH}:${PRODUCT_HEIGHT}[bg][img];[bg][img]overlay=(W-w)/2:(H-h)/2" -frames:v 1 -update 1 -y research-accessory-1.png 2>/dev/null
echo "  Saved as research-accessory-1.png (${PRODUCT_WIDTH}x${PRODUCT_HEIGHT})"

# Process research-accessory-2.avif  
echo "Processing research-accessory-2.avif..."
ffmpeg -i research-accessory-2.avif -f lavfi -i color=size=${PRODUCT_WIDTH}x${PRODUCT_HEIGHT}:c=${BG_COLOR} -filter_complex "[1][0]scale2ref=${PRODUCT_WIDTH}:${PRODUCT_HEIGHT}[bg][img];[bg][img]overlay=(W-w)/2:(H-h)/2" -frames:v 1 -update 1 -y research-accessory-2.png 2>/dev/null
echo "  Saved as research-accessory-2.png (${PRODUCT_WIDTH}x${PRODUCT_HEIGHT})"

echo "Done!"
