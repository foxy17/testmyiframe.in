import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = resolve(__dirname, 'public');

async function optimize() {
  try {
    console.log('Optimizing images in public directory...');

    // 1. Optimize logo.png -> logo.webp (256x256) and optimized logo.png (256x256)
    console.log('Processing logo...');
    await sharp(resolve(PUBLIC_DIR, 'logo.png'))
      .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 85 })
      .toFile(resolve(PUBLIC_DIR, 'logo.webp'));

    await sharp(resolve(PUBLIC_DIR, 'logo.png'))
      .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9, quality: 85 })
      .toFile(resolve(PUBLIC_DIR, 'logo_temp.png'));

    // 2. Optimize mascot.png -> mascot.webp (800x800 max) and optimized mascot.png (800x800 max)
    console.log('Processing mascot...');
    await sharp(resolve(PUBLIC_DIR, 'mascot.png'))
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(resolve(PUBLIC_DIR, 'mascot.webp'));

    await sharp(resolve(PUBLIC_DIR, 'mascot.png'))
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 9, quality: 85 })
      .toFile(resolve(PUBLIC_DIR, 'mascot_temp.png'));

    // 3. Optimize og.png -> og.webp (1200x630) and optimized og.png (1200x630)
    console.log('Processing og...');
    await sharp(resolve(PUBLIC_DIR, 'og.png'))
      .resize(1200, 630, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(resolve(PUBLIC_DIR, 'og.webp'));

    await sharp(resolve(PUBLIC_DIR, 'og.png'))
      .resize(1200, 630, { fit: 'cover' })
      .png({ compressionLevel: 9, quality: 80 })
      .toFile(resolve(PUBLIC_DIR, 'og_temp.png'));

    // 4. Optimize twitter-og.png -> twitter-og.webp (1200x600) and optimized twitter-og.png (1200x600)
    console.log('Processing twitter-og...');
    await sharp(resolve(PUBLIC_DIR, 'twitter-og.png'))
      .resize(1200, 600, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(resolve(PUBLIC_DIR, 'twitter-og.webp'));

    await sharp(resolve(PUBLIC_DIR, 'twitter-og.png'))
      .resize(1200, 600, { fit: 'cover' })
      .png({ compressionLevel: 9, quality: 80 })
      .toFile(resolve(PUBLIC_DIR, 'twitter-og_temp.png'));

    // Replaces the original files with optimized versions
    console.log('Replacing originals with optimized versions...');
    const { promises: fs } = await import('fs');
    await fs.rename(resolve(PUBLIC_DIR, 'logo_temp.png'), resolve(PUBLIC_DIR, 'logo.png'));
    await fs.rename(resolve(PUBLIC_DIR, 'mascot_temp.png'), resolve(PUBLIC_DIR, 'mascot.png'));
    await fs.rename(resolve(PUBLIC_DIR, 'og_temp.png'), resolve(PUBLIC_DIR, 'og.png'));
    await fs.rename(resolve(PUBLIC_DIR, 'twitter-og_temp.png'), resolve(PUBLIC_DIR, 'twitter-og.png'));

    console.log('Image optimization finished successfully!');
  } catch (error) {
    console.error('Image optimization failed:', error);
  }
}

optimize();
