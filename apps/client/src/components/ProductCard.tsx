"use client";

import { ProductType } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const { addToCart } = useCartStore();

  const handleProductTypeChange = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({ ...prev, [type]: value }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });
    toast.success("Product added to cart!");
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-2/3">
          <Image
            src={product.images?.[productTypes.color] || ""}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      {/* PRODUCT DETAIL */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-lg font-medium">{product.name}</h1>
        <p className="text-gray-600 text-sm">{product.shortDescription}</p>
        {/* PRODUCT TYPES */}
        <div className="flex items-center gap-4 text-xs"></div>
        {/* SIZES */}
        <div className="flex flex-col gap-1 w-1/4">
          <span className="text-gray-500">Size</span>
          <select
            name="size"
            id="size"
            className="ring ring-gray-300 rounded-ms px-2 py-1"
            onChange={(e) =>
              handleProductTypeChange({ type: "size", value: e.target.value })
            }
          >
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        {/* COLORS */}
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Color</span>
          <div className="flex items-center gap-2">
            {product.colors.map((color) => (
              <div
                key={color}
                className={`cursor-pointer ring-1 ${
                  productTypes.color === color
                    ? "ring-gray-600"
                    : "ring-gray-100"
                } rounded-full p-[1.2px]`}
                onClick={() =>
                  handleProductTypeChange({ type: "color", value: color })
                }
              >
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* PRICE AND ADD TO CART BUTTON*/}
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="ring-1 ring-gray-200 text-black text-sm px-4 py-2 rounded-md shadow-lg hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer flex items-center gap-4"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
