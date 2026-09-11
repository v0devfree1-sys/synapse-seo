// Demo data layer for STRATA — AI SEO Intelligence.
// UI consumes this module; a real crawler adapter can replace these exports later.

export const siteTree = {
  label: "/",
  path: "example.com",
  children: [
    {
      label: "Home", path: "/", status: 200, children: [
        { label: "Products", path: "/products", status: 200, children: [
          { label: "Widget", path: "/products/widget", status: 200, children: [] },
          { label: "Gadget", path: "/products/gadget", status: 200, children: [] },
          { label: "Pro Suite", path: "/products/pro", status: 301, children: [] },
        ]},
        { label: "Blog", path: "/blog", status: 200, children: [
          { label: "SEO Guide", path: "/blog/seo-guide", status: 200, children: [] },
          { label: "JWT Security", path: "/blog/jwt-security", status: 200, children: [] },
          { label: "Core Web Vitals", path: "/blog/cwv", status: 200, children: [] },
          { label: "Internal Linking", path: "/blog/internal-links", status: 200, children: [] },
        ]},
        { label: "Tools", path: "/tools", status: 200, children: [
          { label: "JWT Generator", path: "/tools/jwt-generator", status: 200, children: [] },
          { label: "Key Gen", path: "/tools/key-generator", status: 404, children: [] },
        ]},
        { label: "Docs", path: "/docs", status: 200, children: [
          { label: "API Reference", path: "/docs/api", status: 200, children: [] },
          { label: "Guides", path: "/docs/guides", status: 200, children: [] },
        ]},
        { label: "Pricing", path: "/pricing", status: 200, children: [] },
        { label: "About", path: "/about", status: 200, children: [] },
      ]
    }
  ]
};

// Real-looking structured crawl events (status, path)
export const crawlEventSequence = [
  { code: 200, path: "/" },
  { code: 200, path: "/robots.txt" },
  { code: 200, path: "/sitemap.xml" },
  { code: 200, path: "/products" },
  { code: 200, path: "/blog" },
  { code: 200, path: "/tools" },
  { code: 200, path: "/docs" },
  { code: 200, path: "/pricing" },
  { code: 200, path: "/about" },
  { code: 200, path: "/products/widget" },
  { code: 200, path: "/products/gadget" },
  { code: 301, path: "/products/pro → /products/pro-suite" },
  { code: 200, path: "/blog/seo-guide" },
  { code: 200, path: "/blog/jwt-security" },
  { code: 200, path: "/blog/cwv" },
  { code: 200, path: "/blog/internal-links" },
  { code: 200, path: "/tools/jwt-generator" },
  { code: 404, path: "/tools/key-generator" },
  { code: 200, path: "/docs/api" },
  { code: 200, path: "/docs/guides" },
  { code: 200, path: "/blog/structured-data" },
  { code: 200, path: "/blog/canonical-tags" },
  { code: 200, path: "/products/widget#reviews" },
  { code: 301, path: "/old-pricing → /pricing" },
  { code: 200, path: "/docs/quickstart" },
  { code: 404, path: "/missing-asset.css" },
  { code: 200, path: "/blog/schema-markup" },
  { code: 200, path: "/products/gadget/spec" },
  { code: 200, path: "/tools/hash-generator" },
  { code: 500, path: "/api/status" },
  { code: 200, path: "/docs/migration" },
  { code: 200, path: "/blog/core-web-vitals-2026" },
  { code: 200, path: "/products/widget/reviews" },
  { code: 200, path: "/changelog" },
  { code: 200, path: "/legal/privacy" },
  { code: 200, path: "/legal/terms" },
  { code: 200, path: "/blog/internal-link-equity" },
  { code: 404, path: "/deprecated/old-page" },
  { code: 200, path: "/docs/sdk" },
  { code: 200, path: "/products/pro-suite" },
];

export const audit = {
  domain: "example.com",
  healthScore: 84,
  prevHealth: 77,
  pagesAnalyzed: 1842,
  critical: 12,
  highImpact: 47,
  opportunities: 126,
  indexed: 1742,
  brokenLinks: 8,
  subscores: [
    { key: "crawling", label: "Crawlability", value: 96, prev: 94 },
    { key: "indexability", label: "Indexability", value: 89, prev: 85 },
    { key: "content", label: "Content", value: 73, prev: 70 },
    { key: "architecture", label: "Architecture", value: 81, prev: 79 },
    { key: "performance", label: "Performance", value: 68, prev: 64 },
  ],
  depth: [
    { level: 0, label: "Home", count: 1 },
    { level: 1, label: "1", count: 12 },
    { level: 2, label: "2", count: 248 },
    { level: 3, label: "3", count: 1142 },
    { level: 4, label: "4", count: 380 },
    { level: 5, label: "5+", count: 59 },
  ],
  linkOpportunities: [
    {
      source: "/blog/jwt-security",
      target: "/tools/jwt-generator",
      anchor: "JWT secret generator",
      reason: ["High semantic relevance", "Target has low internal authority", "Source already ranks for related queries"],
      score: 94,
    },
    {
      source: "/blog/seo-guide",
      target: "/tools/key-generator",
      anchor: "API key generator",
      reason: ["Topical match", "Target is orphaned", "Source carries high authority"],
      score: 88,
    },
    {
      source: "/docs/api",
      target: "/products/pro-suite",
      anchor: "Pro Suite",
      reason: ["Commercial intent alignment", "Target under-linked", "Developer audience overlap"],
      score: 81,
    },
  ],
  issues: [
    {
      id: "canonical-conflict",
      title: "Canonical Conflict",
      category: "High Impact",
      count: 17,
      summary: "Google is receiving conflicting canonical signals across three route families.",
      evidence: [
        { label: "Declared canonical", value: "/products/widget", tone: "muted" },
        { label: "Redirect destination", value: "/product/widget", tone: "warning" },
        { label: "Sitemap URL", value: "/products/widget", tone: "muted" },
      ],
      ai: "These URLs likely represent the same page. The redirect destination differs from the declared canonical, forcing Google to resolve the duplicate — wasting crawl budget and diluting ranking signals.",
    },
    {
      id: "orphan-pages",
      title: "Orphan Pages",
      category: "Critical",
      count: 42,
      summary: "42 pages receive zero internal links and are unreachable from the site graph.",
      evidence: [
        { label: "Orphan count", value: "42", tone: "critical" },
        { label: "In link equity", value: "0%", tone: "critical" },
        { label: "Indexed", value: "11 / 42", tone: "warning" },
      ],
      ai: "Orphan pages are invisible to crawlers following internal links. 31 of these pages have unique content worth preserving — re-link them from topical hubs.",
    },
    {
      id: "thin-content",
      title: "Thin Content",
      category: "Opportunity",
      count: 126,
      summary: "126 pages have fewer than 300 words of unique content.",
      evidence: [
        { label: "Avg word count", value: "184", tone: "warning" },
        { label: "Below threshold", value: "126", tone: "warning" },
        { label: "With duplicate", value: "38", tone: "critical" },
      ],
      ai: "Thin pages rarely rank. Consolidate near-duplicate pages and expand the rest with original research, examples, and internal links to authority pages.",
    },
    {
      id: "missing-h1",
      title: "Missing H1",
      category: "Notice",
      count: 8,
      summary: "8 pages lack a primary heading.",
      evidence: [
        { label: "Affected", value: "8", tone: "muted" },
        { label: "Templates", value: "2", tone: "muted" },
      ],
      ai: "Two templates render without an H1. A one-line template fix resolves all 8 pages at once.",
    },
  ],
  aiInsights: [
    {
      kind: "High Impact",
      title: "Internal authority is concentrated in informational content.",
      body: "38 commercial pages receive less than 4% of total internal link equity. Rebalancing links from blog hubs to product pages is the single highest-impact structural fix.",
      impact: "High",
      confidence: 92,
    },
    {
      kind: "Opportunity",
      title: "12 articles strongly match your API Key Generator but do not link to it.",
      body: "Semantic similarity between these articles and the tool page exceeds 0.81. Adding contextual links could transfer meaningful authority.",
      impact: "Medium",
      confidence: 86,
    },
    {
      kind: "Pattern Detected",
      title: "Canonical signals are inconsistent across three route families.",
      body: "The /products, /product, and /products/* families declare conflicting canonicals. A routing-level fix will resolve 17 pages simultaneously.",
      impact: "High",
      confidence: 88,
    },
  ],
  pages: [
    { path: "/tools/jwt-generator", status: 200, indexable: true, title: "JWT Secret Generator – Secure Random Keys", depth: 2, links: 42, words: 1284, score: 91 },
    { path: "/blog/seo-guide", status: 200, indexable: true, title: "The Complete SEO Guide for 2026", depth: 2, links: 87, words: 4120, score: 88 },
    { path: "/products/widget", status: 200, indexable: true, title: "Widget — Powerful Automation", depth: 2, links: 14, words: 980, score: 72 },
    { path: "/products/pro", status: 301, indexable: false, title: "Pro (redirected)", depth: 2, links: 6, words: 0, score: 0 },
    { path: "/tools/key-generator", status: 404, indexable: false, title: "Not Found", depth: 2, links: 0, words: 0, score: 0 },
    { path: "/blog/jwt-security", status: 200, indexable: true, title: "JWT Security Best Practices", depth: 2, links: 64, words: 2890, score: 85 },
    { path: "/docs/api", status: 200, indexable: true, title: "API Reference — v3", depth: 2, links: 51, words: 6240, score: 83 },
    { path: "/pricing", status: 200, indexable: true, title: "Pricing — Simple, Transparent", depth: 1, links: 38, words: 740, score: 79 },
    { path: "/blog/cwv", status: 200, indexable: true, title: "Core Web Vitals Explained", depth: 2, links: 29, words: 1980, score: 81 },
    { path: "/products/gadget", status: 200, indexable: true, title: "Gadget — Lightweight & Fast", depth: 2, links: 11, words: 860, score: 74 },
  ],
};

export const statusTone = (code) => {
  if (code >= 500) return "critical";
  if (code >= 400) return "critical";
  if (code >= 300) return "warning";
  return "success";
};

// Interactive node-link model for the Architecture module.
export const siteGraph = {
  clusters: [
    { id: "core", label: "Core", color: "var(--accent-brand)" },
    { id: "products", label: "Products", color: "hsl(var(--chart-2))" },
    { id: "blog", label: "Blog", color: "var(--info)" },
    { id: "tools", label: "Tools", color: "var(--success)" },
    { id: "docs", label: "Docs", color: "var(--warning)" },
    { id: "commercial", label: "Commercial", color: "hsl(var(--chart-5))" },
    { id: "orphan", label: "Orphans", color: "var(--critical)" },
  ],
  nodes: [
    { id: "home", path: "/", label: "Home", cluster: "core", status: 200, inlinks: 58, score: 94 },
    { id: "products", path: "/products", label: "Products", cluster: "products", status: 200, inlinks: 34, score: 82 },
    { id: "widget", path: "/products/widget", label: "Widget", cluster: "products", status: 200, inlinks: 16, score: 72 },
    { id: "gadget", path: "/products/gadget", label: "Gadget", cluster: "products", status: 200, inlinks: 11, score: 74 },
    { id: "pro-suite", path: "/products/pro-suite", label: "Pro Suite", cluster: "products", status: 200, inlinks: 12, score: 79 },
    { id: "pro-redirect", path: "/products/pro", label: "Pro → 301", cluster: "products", status: 301, inlinks: 3, score: 0 },
    { id: "blog", path: "/blog", label: "Blog", cluster: "blog", status: 200, inlinks: 41, score: 86 },
    { id: "seo-guide", path: "/blog/seo-guide", label: "SEO Guide", cluster: "blog", status: 200, inlinks: 87, score: 88 },
    { id: "jwt-security", path: "/blog/jwt-security", label: "JWT Security", cluster: "blog", status: 200, inlinks: 64, score: 85 },
    { id: "cwv", path: "/blog/cwv", label: "Core Web Vitals", cluster: "blog", status: 200, inlinks: 29, score: 81 },
    { id: "internal-links", path: "/blog/internal-links", label: "Internal Linking", cluster: "blog", status: 200, inlinks: 22, score: 77 },
    { id: "tools", path: "/tools", label: "Tools", cluster: "tools", status: 200, inlinks: 26, score: 80 },
    { id: "jwt-generator", path: "/tools/jwt-generator", label: "JWT Generator", cluster: "tools", status: 200, inlinks: 42, score: 91 },
    { id: "key-generator", path: "/tools/key-generator", label: "Key Gen", cluster: "tools", status: 404, inlinks: 0, score: 0, orphan: true },
    { id: "docs", path: "/docs", label: "Docs", cluster: "docs", status: 200, inlinks: 31, score: 84 },
    { id: "api", path: "/docs/api", label: "API Reference", cluster: "docs", status: 200, inlinks: 51, score: 83 },
    { id: "guides", path: "/docs/guides", label: "Guides", cluster: "docs", status: 200, inlinks: 12, score: 76 },
    { id: "pricing", path: "/pricing", label: "Pricing", cluster: "commercial", status: 200, inlinks: 38, score: 79 },
    { id: "about", path: "/about", label: "About", cluster: "commercial", status: 200, inlinks: 15, score: 75 },
    { id: "changelog", path: "/changelog", label: "Changelog", cluster: "orphan", status: 200, inlinks: 0, score: 55, orphan: true },
    { id: "careers", path: "/careers", label: "Careers", cluster: "orphan", status: 200, inlinks: 0, score: 41, orphan: true },
    { id: "privacy", path: "/legal/privacy", label: "Privacy", cluster: "orphan", status: 200, inlinks: 0, score: 48, orphan: true },
    { id: "terms", path: "/legal/terms", label: "Terms", cluster: "orphan", status: 200, inlinks: 0, score: 46, orphan: true },
  ],
  edges: [
    { source: "home", target: "products" }, { source: "home", target: "blog" },
    { source: "home", target: "tools" }, { source: "home", target: "docs" },
    { source: "home", target: "pricing" }, { source: "home", target: "about" },
    { source: "products", target: "widget" }, { source: "products", target: "gadget" },
    { source: "products", target: "pro-redirect" }, { source: "products", target: "pro-suite" },
    { source: "blog", target: "seo-guide" }, { source: "blog", target: "jwt-security" },
    { source: "blog", target: "cwv" }, { source: "blog", target: "internal-links" },
    { source: "tools", target: "jwt-generator" }, { source: "tools", target: "key-generator" },
    { source: "docs", target: "api" }, { source: "docs", target: "guides" },
    { source: "seo-guide", target: "jwt-security" }, { source: "jwt-security", target: "jwt-generator" },
    { source: "cwv", target: "widget" }, { source: "internal-links", target: "seo-guide" },
    { source: "api", target: "internal-links" }, { source: "guides", target: "cwv" },
    { source: "pricing", target: "pro-suite" }, { source: "about", target: "pricing" },
    { source: "seo-guide", target: "api" }, { source: "jwt-security", target: "key-generator" },
  ],
};

// Content Intelligence module data — entities, cannibalization, gaps.
export const contentIntel = {
  entities: [
    { name: "JWT", salience: 94, mentions: 312 },
    { name: "API keys", salience: 81, mentions: 187 },
    { name: "Automation", salience: 76, mentions: 164 },
    { name: "Core Web Vitals", salience: 68, mentions: 121 },
    { name: "Canonicalization", salience: 62, mentions: 98 },
    { name: "Internal linking", salience: 57, mentions: 84 },
    { name: "Schema markup", salience: 49, mentions: 67 },
    { name: "Redirects", salience: 44, mentions: 51 },
    { name: "Crawl budget", salience: 37, mentions: 39 },
    { name: "Indexing", salience: 31, mentions: 28 },
  ],
  clusters: [
    {
      id: "jwt-cluster",
      query: "jwt generator",
      intent: "Transactional",
      pages: [
        { path: "/tools/jwt-generator", score: 91, overlap: 100 },
        { path: "/blog/jwt-security", score: 85, overlap: 62 },
        { path: "/docs/guides", score: 76, overlap: 38 },
      ],
      ai: "Three pages compete for the same intent. Keep the tool page as the transactional target and re-scope the article toward security best practices with a single contextual link to the tool.",
    },
    {
      id: "seo-cluster",
      query: "seo guide",
      intent: "Informational",
      pages: [
        { path: "/blog/seo-guide", score: 88, overlap: 100 },
        { path: "/blog/cwv", score: 81, overlap: 41 },
        { path: "/docs/guides", score: 76, overlap: 35 },
      ],
      ai: "Partial overlap only — the CWV article is a legitimate sub-topic. Consolidate the docs guide into the main guide and redirect to protect the ranking URL.",
    },
    {
      id: "api-cluster",
      query: "api reference",
      intent: "Navigational",
      pages: [
        { path: "/docs/api", score: 83, overlap: 100 },
        { path: "/blog/seo-guide", score: 88, overlap: 24 },
      ],
      ai: "Low overlap — signals are healthy. Monitor: if the blog article starts ranking for API queries, re-scope the section that overlaps.",
    },
  ],
  gaps: [
    { topic: "OAuth 2.0 flow", intent: "Informational", demand: 78, difficulty: 42, ai: "Your JWT cluster already carries authority — an OAuth companion article would inherit topical relevance from day one." },
    { topic: "Rate limiting patterns", intent: "Informational", demand: 64, difficulty: 31, ai: "Zero coverage today; adjacent tool pages can pass immediate internal equity." },
    { topic: "Webhook security", intent: "Informational", demand: 58, difficulty: 27, ai: "Rising query volume with weak competition. Strong fit for the security hub." },
    { topic: "Automation pricing comparison", intent: "Commercial", demand: 51, difficulty: 66, ai: "High demand but competitive. Publish only with original data or a comparison widget." },
  ],
};

// Performance module data — Core Web Vitals, slow routes, resource weight.
export const performanceData = {
  score: 68,
  prev: 64,
  vitals: [
    { key: "lcp", label: "LCP", full: "Largest Contentful Paint", value: "2.8s", threshold: "good < 2.5s", pct: 58, status: "needs-improvement" },
    { key: "inp", label: "INP", full: "Interaction to Next Paint", value: "184ms", threshold: "good < 200ms", pct: 81, status: "good" },
    { key: "cls", label: "CLS", full: "Cumulative Layout Shift", value: "0.21", threshold: "good < 0.1", pct: 34, status: "poor" },
    { key: "ttfb", label: "TTFB", full: "Time to First Byte", value: "410ms", threshold: "good < 800ms", pct: 74, status: "good" },
  ],
  slowPages: [
    { path: "/products/widget", template: "Product", lcp: 4.9, weight: 3.1, requests: 87, score: 41 },
    { path: "/products/pro-suite", template: "Product", lcp: 4.2, weight: 2.8, requests: 81, score: 46 },
    { path: "/blog/seo-guide", template: "Article", lcp: 3.6, weight: 2.4, requests: 74, score: 52 },
    { path: "/products/gadget", template: "Product", lcp: 3.1, weight: 2.1, requests: 69, score: 55 },
    { path: "/pricing", template: "Marketing", lcp: 2.9, weight: 1.9, requests: 58, score: 61 },
    { path: "/docs/api", template: "Docs", lcp: 2.7, weight: 1.6, requests: 63, score: 66 },
  ],
  resources: [
    { type: "JavaScript", weight: 1.9, share: 41 },
    { type: "Images", weight: 1.2, share: 27 },
    { type: "Fonts", weight: 0.6, share: 14 },
    { type: "CSS", weight: 0.5, share: 12 },
    { type: "Other", weight: 0.4, share: 6 },
  ],
  ai: "The Product template drives 78% of poor LCP sessions — a shared 1.4 MB un-minified vendor bundle loads synchronously on all product routes. Splitting it and deferring the review widget would lift LCP below 2.5s on 214 pages at once.",
};

// Internal Link Intelligence module data — orphans, authority distribution, opportunities.
export const linkIntel = {
  authorityByCluster: [
    { cluster: "blog", label: "Blog", color: "var(--info)", inlinks: 243, share: 41 },
    { cluster: "docs", label: "Docs", color: "var(--warning)", inlinks: 94, share: 16 },
    { cluster: "products", label: "Products", color: "hsl(var(--chart-2))", inlinks: 76, share: 13 },
    { cluster: "tools", label: "Tools", color: "var(--success)", inlinks: 68, share: 11 },
    { cluster: "core", label: "Core", color: "var(--accent-brand)", inlinks: 58, share: 10 },
    { cluster: "commercial", label: "Commercial", color: "hsl(var(--chart-5))", inlinks: 53, share: 9 },
    { cluster: "orphan", label: "Orphans", color: "var(--critical)", inlinks: 0, share: 0 },
  ],
  orphans: [
    { path: "/changelog", score: 55, status: 200, suggestedHub: "/docs", hubScore: 84, reason: "Developer audience overlap" },
    { path: "/legal/privacy", score: 48, status: 200, suggestedHub: "/about", hubScore: 75, reason: "Trust & compliance cluster" },
    { path: "/legal/terms", score: 46, status: 200, suggestedHub: "/about", hubScore: 75, reason: "Trust & compliance cluster" },
    { path: "/careers", score: 41, status: 200, suggestedHub: "/about", hubScore: 75, reason: "Company information cluster" },
    { path: "/tools/key-generator", score: 0, status: 404, suggestedHub: "/tools", hubScore: 80, reason: "Topical match — tools hub" },
  ],
  weakNodes: [
    { path: "/products/gadget", inlinks: 11, score: 74, cluster: "products", label: "Products" },
    { path: "/docs/guides", inlinks: 12, score: 76, cluster: "docs", label: "Docs" },
    { path: "/products/pro-suite", inlinks: 12, score: 79, cluster: "products", label: "Products" },
    { path: "/about", inlinks: 15, score: 75, cluster: "commercial", label: "Commercial" },
    { path: "/blog/internal-links", inlinks: 22, score: 77, cluster: "blog", label: "Blog" },
    { path: "/blog/cwv", inlinks: 29, score: 81, cluster: "blog", label: "Blog" },
  ],
  opportunities: [
    {
      source: "/blog/jwt-security",
      target: "/tools/jwt-generator",
      anchor: "JWT secret generator",
      reason: ["High semantic relevance", "Target has low internal authority", "Source already ranks for related queries"],
      score: 94,
      equity: "High",
    },
    {
      source: "/blog/seo-guide",
      target: "/tools/key-generator",
      anchor: "API key generator",
      reason: ["Topical match", "Target is orphaned", "Source carries high authority"],
      score: 88,
      equity: "High",
    },
    {
      source: "/docs/api",
      target: "/products/pro-suite",
      anchor: "Pro Suite",
      reason: ["Commercial intent alignment", "Target under-linked", "Developer audience overlap"],
      score: 81,
      equity: "Medium",
    },
    {
      source: "/blog/cwv",
      target: "/products/widget",
      anchor: "Widget performance",
      reason: ["Contextual relevance — CWV article mentions slow pages", "Target needs authority boost"],
      score: 76,
      equity: "Medium",
    },
    {
      source: "/docs/guides",
      target: "/changelog",
      anchor: "Recent updates",
      reason: ["Orphan target", "Developer audience overlap", "Source has moderate authority"],
      score: 72,
      equity: "Low",
    },
  ],
  ai: "Internal authority is heavily concentrated in the blog cluster (41% of all internal link equity), while commercial pages receive only 9%. Rebalancing links from blog hubs to product pages would improve rankings for 38 commercial pages simultaneously. Additionally, 5 orphan pages with unique content should be re-linked from their topical hubs.",
};

// AI Insights module data — executive brief + prioritized intelligence feed.
export const aiInsightsData = {
  brief: "Your site is technically healthy but three structural problems limit organic visibility. The highest-impact opportunity is not content volume — it is internal authority distribution. Blog pages hold 41% of link equity while commercial pages receive only 9%. Fixing this imbalance, resolving canonical conflicts, and re-linking 42 orphan pages would lift crawl efficiency and ranking signals across 1,800+ pages.",
  stats: { total: 8, highImpact: 3, opportunities: 3, patterns: 2, avgConfidence: 87 },
  insights: [
    {
      kind: "High Impact",
      title: "Internal authority is concentrated in informational content.",
      body: "38 commercial pages receive less than 4% of total internal link equity. Rebalancing links from blog hubs to product pages is the single highest-impact structural fix.",
      impact: "High",
      confidence: 92,
      affected: "38 pages",
      category: "architecture",
    },
    {
      kind: "High Impact",
      title: "42 orphan pages are invisible to crawlers following internal links.",
      body: "31 of these pages have unique content worth preserving. Re-linking them from topical hubs would recover an estimated 2,400 monthly organic visits.",
      impact: "High",
      confidence: 84,
      affected: "42 pages",
      category: "architecture",
    },
    {
      kind: "High Impact",
      title: "Product template drives 78% of poor LCP sessions.",
      body: "A shared 1.4 MB un-minified vendor bundle loads synchronously on all product routes. Splitting it would lift LCP below 2.5s on 214 pages at once.",
      impact: "High",
      confidence: 91,
      affected: "214 pages",
      category: "performance",
    },
    {
      kind: "Opportunity",
      title: "12 articles strongly match your API Key Generator but do not link to it.",
      body: "Semantic similarity between these articles and the tool page exceeds 0.81. Adding contextual links could transfer meaningful authority.",
      impact: "Medium",
      confidence: 86,
      affected: "12 pages",
      category: "links",
    },
    {
      kind: "Opportunity",
      title: "Three pages compete for the same 'JWT generator' intent.",
      body: "Cannibalization is splitting ranking signals. Consolidating to the tool page and re-scoping the article toward security best practices would unify authority.",
      impact: "Medium",
      confidence: 79,
      affected: "3 pages",
      category: "content",
    },
    {
      kind: "Opportunity",
      title: "4 high-demand topics have zero coverage.",
      body: "OAuth 2.0 flow, rate limiting patterns, webhook security, and automation pricing comparison show rising query volume with weak competition. Your JWT cluster can pass immediate topical authority.",
      impact: "Medium",
      confidence: 73,
      affected: "4 topics",
      category: "content",
    },
    {
      kind: "Pattern Detected",
      title: "Canonical signals are inconsistent across three route families.",
      body: "The /products, /product, and /products/* families declare conflicting canonicals. A routing-level fix will resolve 17 pages simultaneously.",
      impact: "High",
      confidence: 88,
      affected: "17 pages",
      category: "indexability",
    },
    {
      kind: "Pattern Detected",
      title: "8 broken internal links span 4 templates.",
      body: "Two of these links point to deprecated pages returning 404. Fixing the template references will resolve all 8 instances at once.",
      impact: "Low",
      confidence: 95,
      affected: "8 links",
      category: "crawling",
    },
  ],
};