# Onigi - Photo Editor

A lightweight, browser-based photo editor that runs entirely in your browser. No uploads, no servers, no tracking.

## Features

- **Image Adjustments**
  - Brightness control (0-200%)
  - Contrast adjustment (0-200%)
  - Saturation control (0-200%)
  - Blur effect (0-10px)
  - Grayscale filter (0-100%)
  - Sepia tone (0-100%)

- **Preset Filters**
  - None (default)
  - Vintage
  - Cool
  - Warm
  - Fade
  - Dramatic

- **Cropping Tool** - Select and crop any region of your image

- **Download** - Save your edited image as PNG

## How to Use

1. **Upload an Image**
   - Click the upload zone or drag and drop an image
   - Supported formats: JPG, PNG, GIF, WebP, etc.

2. **Edit Your Photo**
   - Use the sliders to adjust brightness, contrast, saturation, and other effects
   - Click on preset filter buttons for quick styling
   - All changes are applied in real-time

3. **Crop (Optional)**
   - Click the "Crop" button to enable crop mode
   - Draw a rectangle on your image
   - Click "Apply crop" to confirm or "Cancel" to discard

4. **Download**
   - Click "Download" to save your edited image as PNG

5. **Reset or Change**
   - "Reset" - restores all adjustments to default
   - "Change Photo" - upload a new image

## Technical Details

- **No Server Required** - Everything runs in your browser
- **Client-Side Processing** - Your images never leave your device
- **Pure HTML/CSS/JavaScript** - No dependencies or frameworks
- **Responsive Design** - Works on desktop and mobile

## Installation

Simply open `index.html` in a web browser. No build process or dependencies required.

```bash
# If you want to serve it locally
python -m http.server 8000
# Then visit http://localhost:8000
```

## Browser Support

Works in all modern browsers that support:
- HTML5 Canvas
- FileReader API
- CSS Filters

