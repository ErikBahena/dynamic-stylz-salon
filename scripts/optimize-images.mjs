/**
 * Optimize the handful of source images in /public/media that actually
 * ship on the site. Re-encodes JPEGs with mozjpeg at a carefully tuned
 * quality, and converts the single PNG headshot to JPEG (PNG is wasteful
 * for photography).
 *
 * Vercel's image pipeline will still resize and serve AVIF/WebP variants
 * at request time — this step just makes sure the *source* files we ship
 * into the pipeline are already lean, which lowers build-time optimization
 * work, cold-cache miss cost, and repo weight.
 *
 * Run: `pnpm optimize:images`
 */

import { readFile, writeFile, rename, unlink, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MEDIA_DIR = path.resolve(__dirname, '..', 'public', 'media')

/**
 * Files that are actively rendered on the site. Anything not in this list
 * is dead weight and can be pruned separately.
 *
 * Each entry: source filename (inside /public/media) + an optional
 * `maxWidth` to downscale overly-large sources. Images are always re-encoded
 * to JPEG with mozjpeg.
 */
const TARGETS = [
  // Hero (LCP — used with priority). Cap at 1600px wide since the display
  // is 42vw of the viewport → ~800px × 2x retina ≈ 1600px source.
  { name: 'nice_hair_1.jpg', quality: 82, maxWidth: 1600 },

  // Service tiles
  { name: 'womens-haircut-600x804.jpg', quality: 82 },
  { name: 'mens-cut-1200x630.jpg', quality: 80 },
  { name: 'kids-cut-1200x630.jpg', quality: 80 },

  // Team portrait — convert PNG → JPG. The output is named `amber.jpg`.
  {
    name: 'amber-300x291.png',
    quality: 88,
    convertTo: 'jpeg',
    renameTo: 'amber.jpg',
  },

  // Testimonial photos
  { name: 'shannon-j-2-900x1200.jpg', quality: 82 },
  { name: 'karna-600x800.jpg', quality: 82 },
  { name: 'kids-cut-1-600x804.jpg', quality: 82 },
  // Used both as testimonial and women's service tile (same file)
  // (already listed above for women's)
]

function kb(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB'
}

async function optimizeOne({ name, quality, maxWidth, convertTo, renameTo }) {
  const src = path.join(MEDIA_DIR, name)
  if (!existsSync(src)) {
    console.warn(`  · skip ${name} — not found`)
    return null
  }

  const beforeSize = (await stat(src)).size
  const input = await readFile(src)
  let pipeline = sharp(input, { failOn: 'none' })

  const meta = await pipeline.metadata()
  if (maxWidth && meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true })
  }

  // Always re-encode as JPEG with mozjpeg (best real-world compression).
  const targetFormat = convertTo || 'jpeg'
  if (targetFormat === 'jpeg') {
    pipeline = pipeline.jpeg({
      quality,
      mozjpeg: true,
      chromaSubsampling: '4:2:0',
      progressive: true,
    })
  } else if (targetFormat === 'webp') {
    pipeline = pipeline.webp({ quality, effort: 6 })
  }

  const out = await pipeline.toBuffer()
  const destName = renameTo || name
  const dest = path.join(MEDIA_DIR, destName)
  await writeFile(dest, out)

  // If we renamed and the old file would otherwise linger, drop it.
  if (renameTo && renameTo !== name) {
    try {
      await unlink(src)
    } catch {
      /* ignore */
    }
  }

  const afterSize = out.length
  const delta = ((1 - afterSize / beforeSize) * 100).toFixed(0)
  console.log(
    `  ✓ ${name.padEnd(34)} ${kb(beforeSize).padStart(10)} → ${kb(afterSize).padStart(10)}  (-${delta}%)` +
      (renameTo ? `  → ${renameTo}` : ''),
  )
  return { name, destName, beforeSize, afterSize }
}

async function main() {
  console.log(`\nOptimizing ${TARGETS.length} image(s) in ${MEDIA_DIR}\n`)
  let totalBefore = 0
  let totalAfter = 0
  for (const t of TARGETS) {
    const r = await optimizeOne(t)
    if (r) {
      totalBefore += r.beforeSize
      totalAfter += r.afterSize
    }
  }
  const delta = totalBefore ? ((1 - totalAfter / totalBefore) * 100).toFixed(0) : 0
  console.log(`\nTotal: ${kb(totalBefore)} → ${kb(totalAfter)}  (-${delta}%)\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
