"use client";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductForm {
  slug: string;
  name: string;
  price: string;
  boxPrice: string;
  purity: string;
  category: string;
  categoryLabel: string;
  description: string;
  lot: string;
  image?: string;
}

const categoryOptions = [
  { value: "recovery", label: "Recovery & Repair", categoryLabel: "Recovery" },
  { value: "performance", label: "Performance Enhancement", categoryLabel: "Performance" },
  { value: "anti-aging", label: "Anti-Aging", categoryLabel: "Anti-Aging" },
  { value: "weight-loss", label: "Weight Loss", categoryLabel: "Weight Loss" },
  { value: "cognitive", label: "Cognitive Enhancement", categoryLabel: "Cognitive" },
  { value: "immune", label: "Immune Support", categoryLabel: "Immune" },
];

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [form, setForm] = useState<ProductForm>({
    slug: "",
    name: "",
    price: "",
    boxPrice: "",
    purity: "99%+",
    category: "recovery",
    categoryLabel: "Recovery",
    description: "",
    lot: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "slug" && !prev.categoryLabel ? { categoryLabel: value.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") } : {}),
    }));

    // Auto-generate slug from name
    if (name === "name") {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      setForm((prev) => ({ ...prev, name: value, slug: prev.slug === "" ? slug : prev.slug }));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    const selected = categoryOptions.find((c) => c.value === category);
    setForm({
      ...form,
      category,
      categoryLabel: selected?.categoryLabel || category,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", form.slug || "temp");

    try {
      setLoading(true);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setUploadedImage(data.url);
        setForm({ ...form, image: data.url });
      } else {
        setError("Failed to upload image");
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Convert numeric fields
      const payload = {
        ...form,
        price: parseFloat(form.price) || 0,
        boxPrice: parseFloat(form.boxPrice) || 0,
        image: uploadedImage || form.image,
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess("Product created successfully! Redirecting...");
        setTimeout(() => router.push("/admin/products"), 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create product");
      }
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Product</h1>
        <p className="text-[#888]">Add a new research compound to your catalogue</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-400 text-sm">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Card */}
        <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
          <h2 className="text-lg font-bold text-white mb-4">Product Image</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-40 h-40 bg-[#0f0f0f] rounded-lg border-2 border-dashed border-[#222] flex items-center justify-center overflow-hidden flex-shrink-0">
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" width={160} height={160} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-[#888]">
                  <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-xs">No image selected</p>
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm text-[#888] mb-2">Upload Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-[#ccc] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#00d4aa] file:text-black hover:file:bg-[#00b894] cursor-pointer"
              />
              <p className="text-xs text-[#666] mt-2">
                Recommended: Square images (500x500px or larger). JPG, PNG, or WebP format. Max 5MB.
              </p>
            </div>
          </div>
        </div>

        {/* Basic Information Card */}
        <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
          <h2 className="text-lg font-bold text-white mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#888] mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                  placeholder="e.g., GHK-Cu Copper Peptide"
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">URL Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                  placeholder="ghk-cu-copper-peptide"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#888] mb-2">Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                required
                className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition resize-none"
                placeholder="Provide a detailed description of this research compound, including its properties, potential benefits, and any relevant scientific context..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-[#888] mb-2">Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleCategoryChange}
                  required
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">Purity *</label>
                <input
                  type="text"
                  name="purity"
                  value={form.purity}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                  placeholder="e.g., 99.5%+"
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">Lot Number</label>
                <input
                  type="text"
                  name="lot"
                  value={form.lot}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                  placeholder="e.g., GHK-2024-BATCH-001"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-[#141414] rounded-xl p-6 border border-[#222]">
          <h2 className="text-lg font-bold text-white mb-4">Pricing (GBP)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#888] mb-2">Price per Vial *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888] text-sm">GBP</span>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-10 py-3 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-2">Box Price (Optional)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888] text-sm">GBP</span>
                <input
                  type="number"
                  name="boxPrice"
                  value={form.boxPrice}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg px-10 py-3 text-white text-sm focus:outline-none focus:border-[#00d4aa] transition"
                  placeholder="0.00"
                />
              </div>
              <p className="text-xs text-[#666] mt-1">Price for bulk/box purchase (e.g., 10 vials)</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-4 bg-[#00d4aa] text-black font-bold rounded-lg hover:bg-[#00b894] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Product..." : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="flex-1 px-6 py-4 bg-[#1a1a1a] border border-[#222] text-[#ccc] font-bold rounded-lg hover:border-[#00d4aa] hover:text-[#00d4aa] transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
