import { RepeatWrapping, TextureLoader, Texture } from "three";

/**
 * Configure a texture with proper wrapping and repeat settings
 * @param texture The texture to configure
 * @param repeat How many times to repeat the texture
 * @returns The configured texture
 */
const configureTexture = (texture: Texture, repeat: [number, number]) => {
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(repeat[0], repeat[1]);
  texture.needsUpdate = true;
  return texture;
};

/**
 * Load and configure textures for the gallery
 * @param path Path to the texture file
 * @param repeat How many times to repeat the texture (default: [4, 4])
 * @returns The configured texture
 */
export const loadTexture = (
  path: string,
  repeat: [number, number] = [4, 4]
) => {
  const loader = new TextureLoader();
  const texture = loader.load(path);
  return configureTexture(texture, repeat);
};

interface TextureSet {
  diffuse: Texture;
  normal?: Texture;
  roughness?: Texture;
  aoMap?: Texture;
}

/**
 * Creates a floor texture set with default values
 * Includes marble, wood, and other options
 * @param type Type of floor texture ('marble', 'wood', 'tile')
 * @param repeat Repeat settings
 * @returns A set of textures for the material
 */
export const createFloorTextures = (
  type: "marble" | "wood" | "tile" = "marble",
  repeat: [number, number] = [8, 8]
): TextureSet => {
  const loader = new TextureLoader();
  let diffusePath = "";

  // Set appropriate paths based on texture type
  switch (type) {
    case "wood":
      diffusePath = "/textures/wood_floor.jpg";
      break;
    case "tile":
      diffusePath = "/textures/tile_floor.jpg";
      break;
    case "marble":
    default:
      diffusePath = "/textures/marble_floor.jpg";
      break;
  }

  // Load and configure diffuse texture
  const diffuse = loader.load(diffusePath);
  configureTexture(diffuse, repeat);

  return {
    diffuse,
  };
};
