/**
 * Prerender Script for Static Site Generation
 *
 * Generates static HTML for all routes including dynamic blog posts and city landing pages.
 * Run with: node prerender.js (after building the project)
 */

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

async function getCidadeSlugs() {
  const cidadesPath = path.resolve(__dirname, "src/data/cidadesData.ts");
  const content = fs.readFileSync(cidadesPath, "utf-8");
  const slugMatches = content.matchAll(/slug:\s*["']([^"']+)["']/g);
  return [...slugMatches].map((match) => match[1]);
}

async function prerender() {
  console.log("🚀 Starting prerender process...\n");

  // Static routes
  const staticRoutes = ["/", "/blog", "/corporativo", "/blog/guia-contratar-banda-casamento-ao-vivo"];

  // Dynamic routes
  const blogSlugs = await getBlogSlugs();
  const blogRoutes = blogSlugs.map((slug) => `/blog/${slug}`);

  const cidadeSlugs = await getCidadeSlugs();
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

      let finalHtml = template
        .replace("<!--ssr-outlet-->", html)
        .replace("</head>", `${head}</head>`);

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
