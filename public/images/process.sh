#\!/bin/bash

# Dark teal background color (hex: 1a3d3a)
BG_COLOR="1a3d3a"
WIDTH=800
HEIGHT=800

echo "Processing accessory images..."

# Process research-accessory-1.avif
echo "Processing research-accessory-1.avif..."
ffmpeg -i research-accessory-1.avif -f lavfi -i color=${BG_COLOR}:s=800x800 -f lavfi -i "[0]scale=800:800[img];[1][img]overlay=(W-w)/2:(H-h)/2[out]" -map "[out]" -y research-accessory-1.png 2>/dev/null
echo "  Saved as research-accessory-1.png"

# Process research-accessory-2.avif  
echo "Processing research-accessory-2.avif..."
ffmpeg -i research-accessory-2.avif -f lavfi -i color=${BG_COLOR}:s=480x480 -f lavfi -i "[0]scale=480:480[img];[1][img]overlay=(W-w)/2:(H-h)/2[out]" -map "[out]" -y research-accessory-2.png 2>/dev/null
echo "  Saved as research-accessory-2.png"

echo "Done\!"
