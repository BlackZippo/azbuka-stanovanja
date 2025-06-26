import os
import requests
from urllib.parse import urlparse

def create_directories():
    """Create necessary directories for images."""
    directories = [
        'assets/images/properties/kupovina',
        'assets/images/properties/izdavanje',
        'assets/images/properties/poslovni-prostor'
    ]
    for directory in directories:
        os.makedirs(directory, exist_ok=True)

def download_image(url, filename):
    """Download an image from a URL and save it to the specified filename."""
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded: {filename}")
    else:
        print(f"Failed to download: {filename}")

def main():
    # Create directories
    create_directories()

    # Image URLs from Unsplash
    images = {
        'kupovina': [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',  # building-1
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',  # building-2
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',  # building-3
            'https://images.unsplash.com/photo-1460472178825-e5240623afd5',  # building-4
            'https://images.unsplash.com/photo-1523192193543-6e7296d960e4',  # building-5
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',  # building-6
            'https://images.unsplash.com/photo-1495433324511-bf8e92934d90',  # building-7
            'https://images.unsplash.com/photo-1502005097973-6a7082348e28',  # building-8
        ],
        'izdavanje': [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',  # interior-1
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',  # interior-2
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',  # interior-3
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',  # interior-4
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d',  # interior-5
            'https://images.unsplash.com/photo-1600573472592-401b489a3cdc',  # interior-6
            'https://images.unsplash.com/photo-1600566752355-35792bedcfea',  # interior-7
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',  # interior-8
        ],
        'poslovni-prostor': [
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2',  # office-1
            'https://images.unsplash.com/photo-1497366216548-37526070297c',  # office-2
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72',  # office-3
            'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa',  # office-4
            'https://images.unsplash.com/photo-1497366412874-3415097a27e7',  # office-5
            'https://images.unsplash.com/photo-1497366672149-e5e4b4d34eb3',  # office-6
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72',  # office-7
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2',  # office-8
        ]
    }

    # Download images
    for category, urls in images.items():
        for i, url in enumerate(urls, 1):
            filename = f'assets/images/properties/{category}/{category.split("-")[0]}-{i}.jpg'
            download_image(url, filename)

if __name__ == '__main__':
    main() 