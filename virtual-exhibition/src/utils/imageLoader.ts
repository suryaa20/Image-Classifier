import { v4 as uuidv4 } from "uuid";
import { ImageType } from "../hooks/useImageData";

/**
 * Utility function to help create image entries for the gallery
 * @param filename The filename in the public/images folder
 * @param options Additional metadata about the image
 * @returns An ImageType object for the gallery
 */
export function createImageEntry(
  filename: string,
  options: {
    title?: string;
    artist?: string;
    year?: string;
    description?: string;
    category?: string;
  } = {}
): ImageType {
  return {
    id: uuidv4(),
    url: `/images/${filename}`,
    title: options.title || filename.split(".")[0].replace(/-/g, " "),
    artist: options.artist || "Unknown Artist",
    year: options.year || "",
    description: options.description || "",
    category: options.category || "artwork",
  };
}

/**
 * Auto-detect images in the public/images directory and generate gallery entries
 */
export const autoDetectGalleryImages = async (): Promise<ImageType[]> => {
  try {
    // Fetch the list of files from the images directory
    const response = await fetch("/images-list.json");

    // If the images-list.json file exists, use it
    if (response.ok) {
      const data = await response.json();
      return data.images.map((img: any) =>
        createImageEntry(img.filename, {
          title: img.title,
          artist: img.artist,
          year: img.year,
          description: img.description,
          category: img.category,
        })
      );
    }

    // Otherwise, attempt to scan the directory directly
    // Note: This is a fallback that works only in development
    console.log("Using directory scanning fallback to find images");

    // Get all image files in the public/images directory
    // This uses the fact that in dev mode, we can access the directory structure
    const files = await scanImagesDirectory();

    return files.map((file) => createImageEntry(file));
  } catch (error) {
    console.error("Error auto-detecting images:", error);
    return createSampleGallery(); // Fallback to sample gallery if auto-detection fails
  }
};

/**
 * Attempt to scan for image files in the directory
 * Note: This is a development-only solution
 */
const scanImagesDirectory = async (): Promise<string[]> => {
  // In production, this should be replaced with a server-side script
  // that pre-generates a list of images

  try {
    // Try to request the images directory and parse HTML for files
    const response = await fetch("/images/");

    if (response.ok) {
      const html = await response.text();

      // Extract filenames from directory listing (works in some dev servers)
      const fileRegex = /<a href="([^"]+\.(jpg|jpeg|png|gif|webp|avif))"/gi;
      let match;
      const files = [];

      while ((match = fileRegex.exec(html)) !== null) {
        files.push(match[1]);
      }

      return files;
    }

    // If that fails, try a few common image filenames
    return ["image1.jpg", "image2.jpg", "image3.jpg"].filter(
      async (filename) => {
        // Check if the file exists
        try {
          const response = await fetch(`/images/${filename}`);
          return response.ok;
        } catch {
          return false;
        }
      }
    );
  } catch (error) {
    console.error("Failed to scan images directory:", error);
    return [];
  }
};

/**
 * Fallback sample gallery if auto-detection fails
 */
export const createSampleGallery = (): ImageType[] => {
  // Get all image files that match common patterns
  const commonImagePatterns = [
    // Try to load some common image names
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "artwork1.jpg",
    "artwork2.jpg",
    "artwork3.jpg",
    "photo1.jpg",
    "photo2.jpg",
    "photo3.jpg",
    "painting1.jpg",
    "painting2.jpg",
    "painting3.jpg",
  ];

  // Return entries for any images that might exist
  return commonImagePatterns.map((filename) => createImageEntry(filename));
};
