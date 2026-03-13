/**
 * Prerender Script for Static Site Generation
 *
 * This script generates static HTML files for all routes in the application,
 * including dynamically generated blog posts. It ensures that:
 * - All H1 tags are captured correctly
 * - JSON-LD structured data is preserved
 * - Meta tags from react-helmet-async are injected
 *
 * Run with: node prerender.js (after building the project)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Blog posts data - imported dynamically
async function getBlogSlugs() {
  // Read the blogPosts file and extract slugs
  const blogPostsPath = path.resolve(__dirname, "src/data/blogPosts.ts");
  const content = fs.readFileSync(blogPostsPath, "utf-8");

  // Extract slugs using regex
  const slugMatches = content.matchAll(/slug:\s*["']([^"']+)["']/g);
  const slugs = [...slugMatches].map((match) => match[1]);

  return slugs;
}

async function prerender() {
  console.log("🚀 Starting prerender process...\n");

  // Static routes
  const staticRoutes = ["/", "/blog", "/corporativo"];

  // Get dynamic blog routes
  const blogSlugs = await getBlogSlugs();
  const blogRoutes = blogSlugs.map((slug) => `/blog/${slug}`);

  // All routes to prerender
  const allRoutes = [...staticRoutes, ...blogRoutes];

  console.log("📄 Routes to prerender:");
  allRoutes.forEach((route) => console.log(`   - ${route}`));
  console.log("");

  // Check if dist folder exists
  const distPath = path.resolve(__dirname, "dist");
  if (!fs.existsSync(distPath)) {
    console.error('❌ Error: dist folder not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Read the template HTML
  const templatePath = path.resolve(distPath, "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  // Import the server entry point
  const { render } = await import("./dist/server/entry-server.js");

  for (const route of allRoutes) {
    console.log(`⚙️  Rendering ${route}...`);

    try {
      const { html, head } = render(route);

      // Replace the placeholder content and inject head tags
      let finalHtml = template.replace("<!--ssr-outlet-->", html).replace("</head>", `${head}</head>`);

      // Determine output path
      let outputPath;
      if (route === "/") {
        outputPath = path.resolve(distPath, "index.html");
      } else {
        const routePath = route.slice(1); // Remove leading slash
        const dirPath = path.resolve(distPath, routePath);
        fs.mkdirSync(dirPath, { recursive: true });
        outputPath = path.resolve(dirPath, "index.html");
      }

      fs.writeFileSync(outputPath, finalHtml);
      console.log(`   ✅ Created: ${outputPath.replace(distPath, "dist")}`);
    } catch (error) {
      console.error(`   ❌ Error rendering ${route}:`, error.message);
    }
  }

  console.log("\n🎉 Prerender complete!");
  console.log(`   Total pages: ${allRoutes.length}`);
}

prerender().catch(console.error);
