# Photography & Art Collection

This folder is for your photography and art images to be displayed in the Photography section of your portfolio.

## How to Add Your Images

1. **Add your images to this folder** with descriptive names:
   - `photo1.jpg`, `photo2.jpg`, etc.
   - Or use meaningful names like `sunset-landscape.jpg`, `portrait-series.jpg`

2. **Update the HTML** to display your images:
   - Edit `index.html`
   - Find the Photography section (search for `id="photography"`)
   - Replace the placeholder divs with actual image tags:

```html
<div class="photo-item">
    <img src="assets/photography/your-image.jpg" alt="Description of your photo" loading="lazy">
</div>
```

## Recommended Image Specifications

- **Format**: JPG or PNG
- **Size**: 800x800px to 1200x1200px (square ratio works best)
- **File size**: Keep under 500KB for fast loading
- **Optimization**: Use tools like TinyPNG or ImageOptim before uploading

## Image Grid

The photography section displays images in a responsive grid:
- Desktop: 3-4 images per row
- Tablet: 2-3 images per row  
- Mobile: 1-2 images per row (depending on screen size)

## Tips

- Use high-quality images that showcase your best work
- Consider a cohesive style or theme
- Add descriptive alt text for accessibility
- Compress images to optimize loading speed

## Example Structure

```
assets/photography/
├── landscape-1.jpg
├── portrait-1.jpg
├── architecture-1.jpg
├── nature-1.jpg
├── urban-1.jpg
└── abstract-1.jpg
```

Start with 6-12 images for your initial portfolio, then add more as you create new work!
