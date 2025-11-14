"use client";

import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url?: string;
};

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.products || []);
        } else {
          setError("Failed to search products");
        }
      } catch (err) {
        console.error(err);
        setError("Error searching products");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(searchProducts, 300);
    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-20">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-2xl">
        {/* Search Input */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <Search className="text-gray-400" size={20} />
            <input
              autoFocus
              type="text"
              placeholder="Search for products, designs, collections..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none text-lg"
            />
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim() === "" ? (
            <div className="p-8 text-center text-gray-500">
              <p>Start typing to search for products</p>
            </div>
          ) : loading ? (
            <div className="p-8 text-center text-gray-500">
              <p>Searching...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              <p>{error}</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No products found for "{query}"</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products?id=${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                  >
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <p className="font-semibold text-gray-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
