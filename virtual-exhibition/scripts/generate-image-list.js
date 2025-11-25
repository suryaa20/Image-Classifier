const fs = require("fs");
const path = require("path");

// Configuration
const imagesDir = path.join(__dirname, "../public/images");
const outputFile = path.join(__dirname, "../public/images-list.json");

// Supported image formats
const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"];

/**
 * Recursively scans a directory for image files
 */
function scanDirectory(dir, baseDir = "") {
  const files = [];

  try {
    // Read all files in the directory
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(baseDir, item);

      // Check if it's a directory
      if (fs.statSync(fullPath).isDirectory()) {
        // Recursively scan subdirectories
        const subDirFiles = scanDirectory(fullPath, relativePath);
        files.push(...subDirFiles);
      } else {
        // Check if it's an image file
        const ext = path.extname(item).toLowerCase();
        if (imageExtensions.includes(ext)) {
          files.push({
            filename: relativePath.replace(/\\/g, "/"), // Normalize path for web use
            title: path.basename(item, ext).replace(/-/g, " "),
            artist: "Unknown Artist",
            year: "",
            description: "",
            category: baseDir || "artwork",
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }

  return files;
}

// Main function
function generateImagesList() {
  console.log("Scanning images directory:", imagesDir);

  try {
    // Create the images directory if it doesn't exist
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
      console.log("Created images directory at:", imagesDir);
    }

    // Scan for image files
    const images = scanDirectory(imagesDir);

    // Generate JSON file
    const data = {
      generated: new Date().toISOString(),
      count: images.length,
      images,
    };

    // Write to output file
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));

    console.log(`Generated images list with ${images.length} images`);
    console.log("Output saved to:", outputFile);
  } catch (error) {
    console.error("Error generating images list:", error);
  }
}

// Run the function
generateImagesList();
