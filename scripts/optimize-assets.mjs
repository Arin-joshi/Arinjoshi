import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import ffmpegStatic from 'ffmpeg-static';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

async function convertImage(inputPath, { maxWidth = 1200 } = {}) {
  const parsed = path.parse(inputPath);
  const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);

  const image = sharp(inputPath).rotate();
  const meta = await image.metadata();
  const resizeWidth = meta.width && meta.width > maxWidth ? maxWidth : undefined;

  let pipeline = image;
  if (resizeWidth) pipeline = pipeline.resize(resizeWidth, undefined, { withoutEnlargement: true });

  await pipeline.webp({ quality: 82 }).toFile(webpPath);

  const webpSize = fs.statSync(webpPath).size;
  console.log(`  ${path.basename(inputPath)} -> webp ${(webpSize / 1024).toFixed(1)}KB`);
}

async function convertAllPngs() {
  const pngFiles = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.toLowerCase().endsWith('.png')) pngFiles.push(full);
    }
  }

  walk(publicDir);

  console.log(`Converting ${pngFiles.length} PNG files...`);
  for (const file of pngFiles) {
    const maxWidth = file.includes('favicon') ? 480 : 1200;
    await convertImage(file, { maxWidth });
  }
}

function reencodeVideo() {
  const input = path.join(publicDir, 'ArinJoshi.mp4');
  const output = path.join(publicDir, 'ArinJoshi-optimized.mp4');
  const poster = path.join(publicDir, 'hero-poster.webp');

  if (!fs.existsSync(input)) {
    console.log('Video not found, skipping.');
    return;
  }

  if (!ffmpegStatic) {
    console.log('ffmpeg-static not available, skipping video.');
    return;
  }

  console.log('Re-encoding hero video...');
  const result = spawnSync(
    ffmpegStatic,
    [
      '-y', '-i', input,
      '-vf', 'scale=1280:-2',
      '-c:v', 'libx264', '-crf', '28', '-preset', 'medium',
      '-an',
      '-movflags', '+faststart',
      output,
    ],
    { stdio: 'inherit' }
  );

  if (result.status === 0 && fs.existsSync(output)) {
    fs.renameSync(output, input);
    console.log(`  Video optimized: ${(fs.statSync(input).size / 1024).toFixed(1)}KB`);
  }

  console.log('Extracting video poster frame...');
  spawnSync(
    ffmpegStatic,
    ['-y', '-i', input, '-ss', '00:00:01', '-vframes', '1', '-q:v', '2', poster.replace('.webp', '.jpg')],
    { stdio: 'inherit' }
  );

  const posterJpg = poster.replace('.webp', '.jpg');
  if (fs.existsSync(posterJpg)) {
    sharp(posterJpg)
      .resize(640, undefined, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(poster)
      .then(() => {
        fs.unlinkSync(posterJpg);
        console.log(`  Poster: ${(fs.statSync(poster).size / 1024).toFixed(1)}KB`);
      });
  }
}

async function optimizeProfile() {
  const profilePng = path.join(publicDir, 'profile.png');
  if (fs.existsSync(profilePng)) {
    await sharp(profilePng)
      .resize(800, 800, { fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(path.join(publicDir, 'profile.webp'));
    console.log('Created profile.webp');
  }
}

function removeOrphans() {
  for (const file of ['Legiit.png', 'kotibox.png']) {
    const full = path.join(publicDir, file);
    if (fs.existsSync(full)) {
      fs.unlinkSync(full);
      console.log(`Removed orphan: ${file}`);
    }
  }
}

await convertAllPngs();
await optimizeProfile();
reencodeVideo();
removeOrphans();
console.log('Asset optimization complete.');
