#!/bin/bash

# Create directories if they don't exist
mkdir -p assets/images/properties/izdavanje
mkdir -p assets/images/properties/poslovni-prostor
mkdir -p assets/images/properties/kupovina

# Function to download images using curl
download_image() {
    local url=$1
    local filename=$2
    curl -L "$url" -o "$filename"
}

# Download images from Unsplash using their API
# Note: Using direct download links for demo purposes
# In production, you should use the Unsplash API properly

# Izdavanje (Interior homes) - 20 images
izdavanje_urls=(
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
    # Add more URLs here
)

# Poslovni prostor (Offices) - 15 images
office_urls=(
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    "https://images.unsplash.com/photo-1497366216548-37526070297c"
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72"
    "https://images.unsplash.com/photo-1497366412874-3415097a27e7"
    # Add more URLs here
)

# Kupovina (Buildings) - 15 images
building_urls=(
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde"
    "https://images.unsplash.com/photo-1600047509358-9dc75507daeb"
    "https://images.unsplash.com/photo-1600047509782-20cd95ce4f9b"
    "https://images.unsplash.com/photo-1600047509697-5a9e5c0a067a"
    # Add more URLs here
)

# Download images
for i in "${!izdavanje_urls[@]}"; do
    download_image "${izdavanje_urls[$i]}" "assets/images/properties/izdavanje/interior-$((i+1)).jpg"
done

for i in "${!office_urls[@]}"; do
    download_image "${office_urls[$i]}" "assets/images/properties/poslovni-prostor/office-$((i+1)).jpg"
done

for i in "${!building_urls[@]}"; do
    download_image "${building_urls[$i]}" "assets/images/properties/kupovina/building-$((i+1)).jpg"
done 