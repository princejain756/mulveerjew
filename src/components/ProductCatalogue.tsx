/* Product catalogue with basic filters for type, purity and price */
"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";

interface ProductCatalogueProps {
  initialProducts: Product[];
}

const ProductCatalogue = ({ initialProducts }: ProductCatalogueProps) => {
  const [material, setMaterial] = useState<string>("all");
  const [purity, setPurity] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">(
    "newest",
  );

  const materials = useMemo(
    () =>
      Array.from(
        new Set(
          initialProducts
            .map((p) => p.material)
            .filter((m): m is string => !!m && m.trim().length > 0),
        ),
      ),
    [initialProducts],
  );

  const purities = useMemo(
    () =>
      Array.from(
        new Set(
          initialProducts
            .map((p) => p.purity)
            .filter((v): v is string => !!v && v.trim().length > 0),
        ),
      ),
    [initialProducts],
  );

  const maxAvailablePrice = useMemo(
    () =>
      initialProducts.reduce(
        (max, p) => (p.price > max ? p.price : max),
        0,
      ),
    [initialProducts],
  );

  const filteredProducts = useMemo(() => {
    let items = [...initialProducts];

    if (material !== "all") {
      items = items.filter(
        (p) => p.material && p.material.toLowerCase() === material.toLowerCase(),
      );
    }

    if (purity !== "all") {
      items = items.filter(
        (p) => p.purity && p.purity.toLowerCase() === purity.toLowerCase(),
      );
    }

    if (maxPrice && maxPrice > 0) {
      items = items.filter((p) => p.price <= maxPrice);
    }

    items.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.id - a.id; // newest first by id
    });

    return items;
  }, [initialProducts, material, purity, maxPrice, sort]);

  return (
    <section className="bg-background py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Product Catalogue
          </p>
          <h1
            className="text-3xl font-semibold text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Discover Our Collections
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Browse a curated selection of gold, silver and other jewellery from
            Mulveer. Use filters to refine by metal type, purity and price range.
          </p>
        </header>

        {/* Filters */}
        <div className="mb-6 grid gap-4 rounded-lg border border-border bg-card p-4 text-sm md:grid-cols-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-medium text-foreground">Metal Type</label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="h-9 rounded border border-input bg-background px-2 text-sm outline-none focus:border-[#d4af37]"
            >
              <option value="all">All Metals</option>
              {materials.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-medium text-foreground">Purity / Carat</label>
            <select
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
              className="h-9 rounded border border-input bg-background px-2 text-sm outline-none focus:border-[#d4af37]"
            >
              <option value="all">All Purities</option>
              {purities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-medium text-foreground">
              Max Price (₹)
            </label>
            <input
              type="number"
              min={0}
              max={maxAvailablePrice || undefined}
              value={maxPrice ?? ""}
              onChange={(e) =>
                setMaxPrice(
                  e.target.value ? Number.parseFloat(e.target.value) : undefined,
                )
              }
              className="h-9 rounded border border-input bg-background px-2 text-sm outline-none focus:border-[#d4af37]"
              placeholder={
                maxAvailablePrice
                  ? `Up to ₹${maxAvailablePrice.toLocaleString("en-IN")}`
                  : "Enter amount"
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-medium text-foreground">Sort By</label>
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as "newest" | "price-asc" | "price-desc")
              }
              className="h-9 rounded border border-input bg-background px-2 text-sm outline-none focus:border-[#d4af37]"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length === 0 ? (
          <p className="py-10 text-sm text-muted-foreground">
            No products match the selected filters. Try widening your selection.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex h-full flex-col justify-between border border-border bg-card p-4 text-sm shadow-sm"
              >
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {product.material || "Jewellery"}
                  </p>
                  <h2 className="text-base font-semibold text-foreground">
                    {product.name}
                  </h2>
                  {product.description && (
                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {product.description}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                    {product.purity && (
                      <span className="rounded-full border border-border px-3 py-1">
                        Purity: {product.purity}
                      </span>
                    )}
                    {product.weight && (
                      <span className="rounded-full border border-border px-3 py-1">
                        Approx. {product.weight} g
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    {product.discount_price && (
                      <p className="text-xs text-muted-foreground line-through">
                        ₹{product.discount_price.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Visit showroom or enquire to purchase.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalogue;

