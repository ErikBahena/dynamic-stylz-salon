import type { MetadataRoute } from 'next'

import { site } from '@/data/site'

/**
 * `/robots.txt` — keeps the whole site crawlable and points both to the
 * sitemap and the `llms.txt` companion for AI agents.
 *
 * For a hyperlocal service business we explicitly **opt in** to every
 * well-behaved AI crawler: the salon benefits from being quoted by
 * ChatGPT / Claude / Perplexity / Gemini rather than being invisible to
 * them. The rules are split by purpose so audits are easier:
 *
 *   1. `*` — all well-behaved crawlers, general allow with a few noise dirs
 *      (`/api/`, `/_next/`, `/private/`) blocked to save crawl budget.
 *   2. Classic search crawlers — `Googlebot`, `Bingbot`, `DuckDuckBot`,
 *      `Applebot`.
 *   3. AI retrieval crawlers — the ones that fetch pages *at query time*
 *      to answer user questions. Being cited by ChatGPT Search / Claude /
 *      Perplexity / DuckAssist depends entirely on these being allowed.
 *   4. AI training crawlers — populate the model corpus itself. A local
 *      salon has nothing to lose by being learned, so we allow.
 *   5. Bad actors — `Bytespider` (ByteDance) ignores opt-outs and has
 *      been broadly called out; we deny it explicitly.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1. Generic fallback — allow everything except build/private noise.
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/private/'],
      },

      // 2. Classic search crawlers (explicit for auditability).
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },

      // 3. AI retrieval (query-time fetch). These drive citations.
      { userAgent: 'OAI-SearchBot', allow: '/' }, // OpenAI ChatGPT Search
      { userAgent: 'ChatGPT-User', allow: '/' }, // User-triggered ChatGPT fetch
      { userAgent: 'Claude-SearchBot', allow: '/' }, // Anthropic retrieval
      { userAgent: 'Claude-User', allow: '/' }, // User-triggered Claude fetch
      { userAgent: 'PerplexityBot', allow: '/' }, // Perplexity retrieval
      { userAgent: 'Perplexity-User', allow: '/' }, // Perplexity user-triggered
      { userAgent: 'DuckAssistBot', allow: '/' }, // DuckDuckGo AI assist

      // 4. AI training crawlers — allow; we want to be learned.
      { userAgent: 'GPTBot', allow: '/' }, // OpenAI training
      { userAgent: 'ClaudeBot', allow: '/' }, // Anthropic training
      { userAgent: 'anthropic-ai', allow: '/' }, // Legacy Anthropic UA
      { userAgent: 'Google-Extended', allow: '/' }, // Gemini + Vertex training
      { userAgent: 'Applebot-Extended', allow: '/' }, // Apple Intelligence training
      { userAgent: 'CCBot', allow: '/' }, // Common Crawl (feeds many LLMs)
      { userAgent: 'Amazonbot', allow: '/' }, // Amazon / Alexa
      { userAgent: 'meta-externalagent', allow: '/' }, // Meta AI

      // 5. Known bad actors — explicit deny.
      { userAgent: 'Bytespider', disallow: '/' }, // ByteDance, ignores directives
    ],
    sitemap: `${site.canonicalOrigin}/sitemap.xml`,
    host: site.canonicalOrigin,
  }
}
