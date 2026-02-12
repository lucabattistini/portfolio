import type { Texture } from 'three';

export type TextureImage = CanvasImageSource & { width: number; height: number };

function getTextureImage(texture: Texture): TextureImage | null {
  const image = texture.image as unknown;
  if (!image || typeof image !== 'object') return null;

  const maybe = image as { width?: unknown; height?: unknown };
  if (typeof maybe.width !== 'number' || typeof maybe.height !== 'number') return null;

  return image as TextureImage;
}

function hasTextureImage(texture: Texture): texture is Texture & { image: TextureImage } {
  return getTextureImage(texture) !== null;
}

export { getTextureImage, hasTextureImage };
