# Virtual Exhibition Gallery

A 3D virtual gallery for showcasing artwork in an interactive environment.

## How to Add Your Own Images (Automatic Detection)

Adding your own images to the gallery is now incredibly simple:

1. **Place your image files in the `public/images` directory.**
2. **Start the application - images are automatically detected and displayed!**

That's it! The gallery will automatically scan the images directory each time you start the application and display all images it finds.

### Supported Image Formats

- JPG/JPEG
- PNG
- GIF
- WebP
- AVIF

### Organizing Your Images

You can organize your images in subdirectories for better organization:

```
public/images/
  ├── landscapes/
  │   ├── sunset.jpg
  │   ├── mountains.jpg
  │   └── ...
  ├── portraits/
  │   ├── person1.jpg
  │   └── ...
  └── other-images.jpg
```

The gallery will automatically find all images in all subdirectories.

### Image Metadata

By default, the gallery generates titles from filenames (replacing hyphens with spaces and removing the extension). For example, `mountain-landscape.jpg` becomes "mountain landscape".

If you want to add more detailed metadata (artist, year, description), you can manually edit the generated `public/images-list.json` file after it's created.

## Gallery Controls

- **W, A, S, D**: Move around
- **Mouse**: Look around
- **Shift**: Run (hold while moving)
- **Click**: Select artwork to view details
- **ESC**: Release mouse control

## Development

This project was built with:

- React
- Three.js
- React Three Fiber
- TypeScript

### Available Scripts

- `npm start`: Automatically detects images and runs the development server
- `npm run generate-images`: Manually generate the images list
- `npm run build`: Build for production (also auto-detects images)
- `npm test`: Run tests











