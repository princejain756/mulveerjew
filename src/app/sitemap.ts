import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogPosts";
import { absoluteUrl } from "@/lib/seo";

const staticPaths = [
  "/",
  "/collections",
  "/products",
  "/custom-designs",
  "/about",
  "/blog",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/refund-policy",
  "/shipping-policy",
  "/policies/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changefreq: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const posts: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt ? new Date(post.updatedAt) : lastModified,
    changefreq: "weekly",
    priority: 0.7,
  }));

  return [...pages, ...posts];
}
