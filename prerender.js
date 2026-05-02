import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function getBlogSlugs() {
  const blogPostsPath = path.resolve(__dirname, "src/data/blogPosts.ts");
  const content = fs.readFileSync(blogPostsPath, "utf-8");
  const slugMatches = content.matchAll(/slug:\s*["']([^"']+)["']/g);
  return [...slugMatches].map((match) => match[1]);
}

async function getCidadesData() {
  const cidadesPath = path.resolve(__dirname, "src/data/cidadesData.ts");
  const content = fs.readFileSync(cidadesPath, "utf-8");
  const slugMatches = content.matchAll(/slug:\s*["']([^"']+)["']/g);
  const slugs = [...slugMatches].map((match) => match[1]);

  // Extract FAQ data for each city
  const cidadesMap = {};
  const cidadeBlocks = content.matchAll(
    /\{[\s\S]*?cidade:\s*["']([^"']+)["'][\s\S]*?slug:\s*["']([^"']+)["'][\s\S]*?faq:\s*\{([\s\S]*?)\},?\s*\}/g,
  );

  for (const block of cidadeBlocks) {
    const faqBlock = block[3];
    const p1 = faqBlock.match(/p1:\s*["']([^"']+)["']/)?.[1] || "";
    const r1 = faqBlock.match(/r1:\s*["']([^"']+)["']/)?.[1] || "";
    const p2 = faqBlock.match(/p2:\s*["']([^"']+)["']/)?.[1] || "";
    const r2 = faqBlock.match(/r2:\s*["']([^"']+)["']/)?.[1] || "";
    const p3 = faqBlock.match(/p3:\s*["']([^"']+)["']/)?.[1] || "";
    const r3 = faqBlock.match(/r3:\s*["']([^"']+)["']/)?.[1] || "";
    cidadesMap[block[2]] = { p1, r1, p2, r2, p3, r3 };
  }

  return { slugs, cidadesMap };
}

function buildFaqSchema(slug, cidadesMap) {
  const faq = cidadesMap[slug];
  if (!faq || !faq.p1) return "";

  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: faq.p1, acceptedAnswer: { "@type": "Answer", text: faq.r1 } },
      { "@type": "Question", name: faq.p2, acceptedAnswer: { "@type": "Answer", text: faq.r2 } },
      { "@type": "Question", name: faq.p3, acceptedAnswer: { "@type": "Answer", text: faq.r3 } },
    ],
  })}</script>`;
}

async function prerender() {
  console.log("🚀 Starting prerender process...\n");

  const staticRoutes = ["/", "/blog", "/corporativo"];
  const blogSlugs = await getBlogSlugs();
  const blogRoutes = blogSlugs.map((slug) => `/blog/${slug}`);
  const { slugs: cidadeSlugs, cidadesMap } = await getCidadesData();
  const cidadeRoutes = cidadeSlugs.map((slug) => `/cidade/${slug}`);
  const allRoutes = [...staticRoutes, ...blogRoutes, ...cidadeRoutes];

  console.log("📄 Routes to prerender:");
  allRoutes.forEach((route) => console.log(`   - ${route}`));
  console.log(`\n   Total: ${allRoutes.length} pages\n`);

  const distPath = path.resolve(__dirname, "dist");
  if (!fs.existsSync(distPath)) {
    console.error('❌ Error: dist folder not found. Run "npm run build" first.');
    process.exit(1);
  }

  const templatePath = path.resolve(distPath, "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");
  const { render } = await import("./dist/server/entry-server.js");

  let success = 0;
  let failed = 0;

  for (const route of allRoutes) {
    try {
      const { html, head } = render(route);

      // Inject FAQ schema for city pages
      let extraSchema = "";
      if (route.startsWith("/cidade/")) {
        const slug = route.replace("/cidade/", "");
        extraSchema = buildFaqSchema(slug, cidadesMap);
      }

      let finalHtml = template.replace("<!--ssr-outlet-->", html).replace("</head>", `${head}${extraSchema}</head>`);

      let outputPath;
      if (route === "/") {
        outputPath = path.resolve(distPath, "index.html");
      } else {
        const routePath = route.slice(1);
        const dirPath = path.resolve(distPath, routePath);
        fs.mkdirSync(dirPath, { recursive: true });
        outputPath = path.resolve(dirPath, "index.html");
      }

      fs.writeFileSync(outputPath, finalHtml);
      console.log(`   ✅ ${route}`);
      success++;
    } catch (error) {
      console.error(`   ❌ ${route}: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n🎉 Prerender complete! ✅ ${success} | ❌ ${failed}`);
}

prerender().catch(console.error);
