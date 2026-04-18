import OgImage, { alt as ogAlt, size as ogSize, contentType as ogContentType } from './opengraph-image'

/**
 * Twitter Card image — same visual composition as the OG image. Re-declared
 * (rather than re-exported) because Next's build-time static analyzer can't
 * follow re-exported route-segment-config across files. Runtime is left
 * as the default (node) so Next can pre-render it statically at build time
 * and serve it from the edge cache forever — no cold starts.
 */
export const alt = ogAlt
export const size = ogSize
export const contentType = ogContentType

export default OgImage
