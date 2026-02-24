import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state);
  const { cart } = useSelector((state) => state);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        setProduct(null);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  const inCart = cart.some((p) => p.id === product?.id);
  const cartQty = cart.find((p) => p.id === product?.id)?.quantity ?? 0;

  const addToCart = () => {
    dispatch(add(product));
    toast.success("Item added to cart");
  };

  if (loading) {
    return (
      <div className={theme ? "bg-slate-600 min-h-screen flex items-center justify-center" : "bg-white min-h-screen flex items-center justify-center"}>
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={theme ? "bg-slate-600 min-h-screen flex flex-col items-center justify-center gap-4" : "bg-white min-h-screen flex flex-col items-center justify-center gap-4"}>
        <p className={theme ? "text-slate-200" : "text-gray-700"}>Product not found.</p>
        <Link to="/" className="text-green-600 hover:underline flex items-center gap-2">
          <FiArrowLeft /> Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className={theme ? "bg-slate-600 min-h-screen py-8" : "bg-gray-50 min-h-screen py-8"}>
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-6 ${theme ? "text-slate-200 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
        >
          <FiArrowLeft /> Back
        </button>

        <div className={`flex flex-col md:flex-row gap-8 p-6 rounded-2xl ${theme ? "bg-slate-700" : "bg-white"} shadow-lg`}>
          <div className="md:w-1/2 flex justify-center items-center bg-white rounded-xl overflow-hidden p-4 min-h-[320px]">
            <img src={product.image} alt={product.title} className="max-h-80 w-full object-contain" />
          </div>

          <div className="md:w-1/2 flex flex-col">
            <span className={`text-sm font-medium uppercase tracking-wide ${theme ? "text-green-400" : "text-green-600"}`}>
              {product.category}
            </span>
            <h1 className={`text-2xl md:text-3xl font-bold mt-2 ${theme ? "text-white" : "text-gray-900"}`}>
              {product.title}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-1 text-amber-500">
                <AiFillStar /> {product.rating?.rate}
              </span>
              <span className={theme ? "text-slate-400" : "text-gray-500"}>
                ({product.rating?.count} reviews)
              </span>
            </div>
            <p className={`mt-4 text-lg ${theme ? "text-slate-300" : "text-gray-600"}`}>
              {product.description}
            </p>
            <p className={`mt-6 text-3xl font-bold ${theme ? "text-green-400" : "text-green-600"}`}>
              ${product.price}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={addToCart}
                className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              >
                Add to cart {cartQty > 0 && `(${cartQty})`}
              </button>
              <Link
                to="/cart"
                className="px-6 py-3 rounded-xl border-2 border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transition"
              >
                View cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
