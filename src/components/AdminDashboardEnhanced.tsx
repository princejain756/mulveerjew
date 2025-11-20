'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Plus, Edit, Trash2, DollarSign, Package, ShoppingCart, TrendingUp, Loader2 } from 'lucide-react';

const MATERIAL_OPTIONS = [
  'Gold',
  'Silver',
  'Diamond',
  'Platinum',
  'Silver Plated',
  'Metal',
  'Gemstone',
  'Accessories',
];

const PURITY_OPTIONS = [
  '24K',
  '22K',
  '21K',
  '20K',
  '18K',
  '14K',
  'Pure',
  'Sterling 925',
  'N/A',
];

interface GoldRate {
  rate22k: number | null;
  rate18k: number | null;
  silverRate: number | null;
  updatedAt: string | null;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  category_id?: number;
  category_name?: string;
  stock_quantity: number;
  weight?: number;
  purity?: string;
  material?: string;
  images?: string[];
  is_active: boolean;
}

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface Analytics {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  averageOrderValue: number;
}

interface Order {
  id: number;
  order_number: string;
  final_amount: number;
  status: string;
  payment_method: string;
  ordered_at: Date;
}

export default function AdminDashboardEnhanced() {
  const { user, accessToken, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('analytics');
  const [products, setProducts] = useState<Product[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [goldRate, setGoldRate] = useState<GoldRate | null>(null);
  const [goldRate22kInput, setGoldRate22kInput] = useState('');
  const [goldRate18kInput, setGoldRate18kInput] = useState('');
  const [silverRateInput, setSilverRateInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount_price: '',
    category_id: '',
    stock_quantity: '',
    weight: '',
    purity: '',
    material: '',
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [manualImageUrl, setManualImageUrl] = useState('');
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryError, setNewCategoryError] = useState('');

  // Check admin access
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }

    if (user && user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router, isLoading]);

  // Fetch all data
  useEffect(() => {
    if (!accessToken || !user || user.role !== 'admin') return;
    fetchAllData();
  }, [accessToken, user]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
      };

      // Fetch products
      const productsRes = await fetch('/api/products?limit=100', { headers });
      const productsData = await productsRes.json();
      const normalizedProducts: Product[] = (productsData.products || []).map(
        (p: any) => {
          let parsedImages: string[] = [];
          if (Array.isArray(p.images)) {
            parsedImages = p.images;
          } else if (typeof p.images === 'string') {
            try {
              parsedImages = JSON.parse(p.images);
            } catch {
              parsedImages = [];
            }
          }

          return {
            ...p,
            images: parsedImages,
          };
        }
      );
      setProducts(normalizedProducts);

      // Fetch analytics
      const analyticsRes = await fetch('/api/admin/analytics', { headers });
      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
      }

      // Fetch orders
      const ordersRes = await fetch('/api/admin/orders', { headers });
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders || []);
      }

      // Fetch gold rate
      const goldRateRes = await fetch('/api/admin/gold-rate', { headers });
      if (goldRateRes.ok) {
        const goldRateData = await goldRateRes.json();
        setGoldRate(goldRateData);
        if (goldRateData) {
          setGoldRate22kInput(
            goldRateData.rate22k !== null && goldRateData.rate22k !== undefined
              ? String(goldRateData.rate22k)
              : '',
          );
          setGoldRate18kInput(
            goldRateData.rate18k !== null && goldRateData.rate18k !== undefined
              ? String(goldRateData.rate18k)
              : '',
          );
          setSilverRateInput(
            goldRateData.silverRate !== null && goldRateData.silverRate !== undefined
              ? String(goldRateData.silverRate)
              : '',
          );
        }
      }
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    setCategoriesError('');
    try {
      const res = await fetch('/api/categories');
      if (!res.ok) {
        throw new Error('Failed to load categories');
      }
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      setCategoriesError(
        err instanceof Error ? err.message : 'Failed to load categories'
      );
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    if (!accessToken) {
      setNewCategoryError('You must be logged in as admin to create categories.');
      return;
    }

    const name = newCategoryName.trim();
    if (!name) {
      setNewCategoryError('Category name is required.');
      return;
    }

    setNewCategoryError('');
    setIsCreatingCategory(true);
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
          description: newCategoryDescription.trim() || null,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create category');
      }

      setNewCategoryName('');
      setNewCategoryDescription('');
      setSuccess('Category created successfully');
      await fetchCategories();

      if (data.category?.id) {
        setFormData((prev) => ({
          ...prev,
          category_id: String(data.category.id),
        }));
      }
    } catch (err) {
      setNewCategoryError(
        err instanceof Error ? err.message : 'Failed to create category',
      );
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const resetProductForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      discount_price: '',
      category_id: '',
      stock_quantity: '',
      weight: '',
      purity: '',
      material: '',
    });
    setImageUrls([]);
    setEditingProduct(null);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        discount_price: formData.discount_price
          ? parseFloat(formData.discount_price)
          : null,
        category_id: formData.category_id
          ? parseInt(formData.category_id)
          : null,
        stock_quantity: parseInt(formData.stock_quantity),
        weight: formData.weight ? parseFloat(formData.weight) : null,
        purity: formData.purity || null,
        material: formData.material || null,
        images: imageUrls,
      };

      const isEditing = !!editingProduct;
      const url = isEditing
        ? `/api/products/${editingProduct.id}`
        : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add product');
      }

      setSuccess(isEditing ? 'Product updated successfully' : 'Product added successfully');
      resetProductForm();
      setIsProductDialogOpen(false);
      fetchAllData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: String(product.price),
      discount_price: product.discount_price ? String(product.discount_price) : '',
      category_id: product.category_id ? String(product.category_id) : '',
      stock_quantity: String(product.stock_quantity),
      weight: product.weight ? String(product.weight) : '',
      purity: product.purity || '',
      material: product.material || '',
    });
    setImageUrls(product.images || []);
    setIsProductDialogOpen(true);
  };

  const handleImageFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!accessToken) return;
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImages(true);
    try {
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const data = new FormData();
        data.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: data,
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || 'Failed to upload image');
        }

        const json = await res.json();
        if (json.url) {
          uploadedUrls.push(json.url);
        }
      }

      if (uploadedUrls.length) {
        setImageUrls((prev) => [...prev, ...uploadedUrls]);
      }
    } catch (err) {
      console.error('Image upload failed', err);
      setError(
        err instanceof Error ? err.message : 'Failed to upload images'
      );
    } finally {
      setIsUploadingImages(false);
      event.target.value = '';
    }
  };

  const handleManualImageAdd = () => {
    const trimmed = manualImageUrl.trim();
    if (!trimmed) return;
    setImageUrls((prev) =>
      prev.includes(trimmed) ? prev : [...prev, trimmed]
    );
    setManualImageUrl('');
  };

  const handleRemoveImage = (url: string) => {
    setImageUrls((prev) => prev.filter((img) => img !== url));
  };

  const handleGoldRateSave = async () => {
    if (!accessToken) return;
    const value22 =
      goldRate22kInput.trim() === '' ? null : Number(goldRate22kInput);
    const value18 =
      goldRate18kInput.trim() === '' ? null : Number(goldRate18kInput);
    const valueSilver =
      silverRateInput.trim() === '' ? null : Number(silverRateInput);

    const valid22 =
      value22 === null || (Number.isFinite(value22) && value22 > 0);
    const valid18 =
      value18 === null || (Number.isFinite(value18) && value18 > 0);
    const validSilver =
      valueSilver === null || (Number.isFinite(valueSilver) && valueSilver > 0);

    if (!valid22 || !valid18 || !validSilver) {
      setError('Please enter valid positive numbers for the rates.');
      return;
    }

    if (value22 === null && value18 === null && valueSilver === null) {
      setError('Please enter at least one rate (22K Gold, 18K Gold, or Silver).');
      return;
    }

    try {
      setError('');
      setSuccess('');

      const response = await fetch('/api/admin/gold-rate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rate22k: value22,
          rate18k: value18,
          silverRate: valueSilver,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update rates');
      }

      setSuccess('Daily rates updated successfully');
      await fetchAllData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update rates');
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete');
      setSuccess('Product deleted');
      fetchAllData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{analytics?.totalRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">All time earnings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">Total orders received</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{analytics?.averageOrderValue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Average per order</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{analytics?.completedOrders}</div>
                  <p className="text-xs text-muted-foreground">Successfully delivered</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{analytics?.pendingOrders}</div>
                  <p className="text-xs text-muted-foreground">Awaiting processing</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cancelled Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{analytics?.cancelledOrders}</div>
                  <p className="text-xs text-muted-foreground">Cancelled orders</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Dialog
              open={isProductDialogOpen}
              onOpenChange={(open) => {
                setIsProductDialogOpen(open);
                if (!open) {
                  resetProductForm();
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    resetProductForm();
                    setIsProductDialogOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description *</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      placeholder="Product description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Price *</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                        placeholder="Price"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Discount Price</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.discount_price}
                        onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      className="h-9 w-full rounded border border-input bg-background px-2 text-sm outline-none focus:border-[#d4af37]"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="mt-1">
                      <button
                        type="button"
                        onClick={fetchCategories}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Refresh categories
                      </button>
                    </div>
                    {categoriesLoading && (
                      <p className="mt-1 text-xs text-muted-foreground">Loading categories...</p>
                    )}
                    {!categoriesLoading && categories.length === 0 && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        No categories yet. Create them in the database to enable filtering.
                      </p>
                    )}
                    {categoriesError && (
                      <p className="mt-1 text-xs text-destructive">{categoriesError}</p>
                    )}
                    <div className="mt-3 rounded border border-dashed border-border p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Quick Category Creator
                      </p>
                      <p className="mb-2 text-xs text-muted-foreground">
                        Need a new category for filtering? Add it right here.
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <Input
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          placeholder="Category name"
                        />
                        <Input
                          value={newCategoryDescription}
                          onChange={(e) => setNewCategoryDescription(e.target.value)}
                          placeholder="Optional description"
                        />
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleCreateCategory}
                          disabled={isCreatingCategory}
                        >
                          {isCreatingCategory ? 'Saving...' : 'Save Category'}
                        </Button>
                        {newCategoryError && (
                          <p className="text-xs text-destructive">{newCategoryError}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Stock Quantity *</label>
                    <Input
                      type="number"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                      required
                      placeholder="Stock quantity"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Material</label>
                      <Input
                        list="material-options"
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                        placeholder="e.g., Gold, Silver"
                      />
                      <datalist id="material-options">
                        {MATERIAL_OPTIONS.map((option) => (
                          <option key={option} value={option} />
                        ))}
                      </datalist>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Choose from suggestions or enter a custom metal type.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Purity</label>
                      <Input
                        list="purity-options"
                        value={formData.purity}
                        onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
                        placeholder="e.g., 24K, Pure"
                      />
                      <datalist id="purity-options">
                        {PURITY_OPTIONS.map((option) => (
                          <option key={option} value={option} />
                        ))}
                      </datalist>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Select a purity/carate or type a custom value.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium">Images</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageFileChange}
                      className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-xs file:font-semibold file:text-secondary-foreground hover:file:bg-secondary/80"
                    />
                    <p className="text-xs text-muted-foreground">
                      You can upload one or more images, or paste direct image
                      URLs below.
                    </p>
                    <div className="flex gap-2">
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={manualImageUrl}
                        onChange={(e) => setManualImageUrl(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleManualImageAdd}
                      >
                        Add URL
                      </Button>
                    </div>
                    {isUploadingImages && (
                      <p className="text-xs text-muted-foreground">
                        Uploading images...
                      </p>
                    )}
                    {imageUrls.length > 0 && (
                      <div className="mt-2 grid grid-cols-3 gap-3">
                        {imageUrls.map((url) => (
                          <div
                            key={url}
                            className="relative rounded border border-border p-1"
                          >
                            <div className="aspect-square w-full overflow-hidden rounded bg-muted">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={url}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              className="absolute right-1 top-1 rounded bg-background/80 px-1 text-xs text-destructive hover:bg-background"
                              onClick={() => handleRemoveImage(url)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button type="submit" className="w-full">
                    {editingProduct ? 'Save Changes' : 'Add Product'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Card>
              <CardHeader>
                <CardTitle>Products ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Material</TableHead>
                        <TableHead>Images</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>₹{product.price}</TableCell>
                          <TableCell>{product.category_name || '—'}</TableCell>
                          <TableCell>{product.stock_quantity}</TableCell>
                          <TableCell>{product.material || '-'}</TableCell>
                          <TableCell>
                            {product.images && product.images.length > 0
                              ? `${product.images.length} image${product.images.length > 1 ? 's' : ''}`
                              : '—'}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 10).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.order_number}</TableCell>
                          <TableCell>₹{order.final_amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={order.status === 'delivered' ? 'default' : 'outline'}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.payment_method}</TableCell>
                          <TableCell>{new Date(order.ordered_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Rate Board</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Keep the bullion board synced with showroom pricing. These three values
                  power the ticker, header chip, and the customer-facing gold rate popup.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-[#f5dab6] bg-gradient-to-br from-[#fff7e6] via-[#ffe7c9] to-[#fedfa8] p-5 shadow-inner">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c47b00]">
                      Flagship
                    </p>
                    <h4 className="mt-1 text-2xl font-bold text-[#2c1307]">22K Gold</h4>
                    <p className="mb-3 text-xs text-[#6f4c32]">Primary daily rate</p>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={goldRate22kInput}
                      onChange={(e) => setGoldRate22kInput(e.target.value)}
                      placeholder="e.g., 6525"
                      className="border-none bg-white/90 text-lg font-semibold text-[#2c1307]"
                    />
                    <p className="mt-1 text-[11px] text-[#8c5f2d]">₹ / gram</p>
                  </div>
                  <div className="rounded-2xl border border-[#f0d8ef] bg-gradient-to-br from-[#fdf3ff] via-[#f4e6ff] to-[#ecd9ff] p-5 shadow-inner">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#7d3bb7]">
                      Couture
                    </p>
                    <h4 className="mt-1 text-2xl font-bold text-[#2d1038]">18K Gold</h4>
                    <p className="mb-3 text-xs text-[#5a4064]">For designer pieces</p>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={goldRate18kInput}
                      onChange={(e) => setGoldRate18kInput(e.target.value)}
                      placeholder="e.g., 5350"
                      className="border-none bg-white/90 text-lg font-semibold text-[#2d1038]"
                    />
                    <p className="mt-1 text-[11px] text-[#7a4a8f]">₹ / gram</p>
                  </div>
                  <div className="rounded-2xl border border-[#d5e2f4] bg-gradient-to-br from-[#f7fbff] via-[#edf5ff] to-[#e0efff] p-5 shadow-inner">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2a5f94]">
                      Sterling
                    </p>
                    <h4 className="mt-1 text-2xl font-bold text-[#1a2f46]">Silver</h4>
                    <p className="mb-3 text-xs text-[#50627a]">Investment grade</p>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={silverRateInput}
                      onChange={(e) => setSilverRateInput(e.target.value)}
                      placeholder="e.g., 87"
                      className="border-none bg-white/90 text-lg font-semibold text-[#1a2f46]"
                    />
                    <p className="mt-1 text-[11px] text-[#3e5673]">₹ / gram</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button type="button" onClick={handleGoldRateSave}>
                    Save Daily Rates
                  </Button>
                  {goldRate && goldRate.updatedAt && (
                    <span className="text-xs text-muted-foreground">
                      Synced{' '}
                      {new Date(goldRate.updatedAt).toLocaleString('en-IN', {
                        hour12: true,
                      })}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
