import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildApp() {
  try {
    console.log('Building application...');
    
    await build({
      configFile: resolve(__dirname, 'vite.config.ts'),
      mode: 'production',
    });
    
    console.log('Build completed successfully! Copying guide.html to guide/index.html for clean URLs...');
    
    const distGuideDir = resolve(__dirname, 'dist', 'guide');
    await fs.mkdir(distGuideDir, { recursive: true });
    await fs.copyFile(
      resolve(__dirname, 'dist', 'guide.html'),
      resolve(distGuideDir, 'index.html')
    );
    
    console.log('Successfully copied guide.html to guide/index.html!');
    process.exit(0);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildApp(); 