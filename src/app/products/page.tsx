import ProductCatalogue from "@/components/ProductCatalogue";

export const metadata = {
  title: "Mulveer Jewellers Collections – Gold, Silver & Diamond Jewellery",
  description:
    "Browse curated gold, silver and diamond jewellery collections from Mulveer Jewellers, Belagavi. Filter by metal, purity and price range.",
};

export default function ProductsPage() {
  return <ProductCatalogue initialProducts={[]} />;
}

