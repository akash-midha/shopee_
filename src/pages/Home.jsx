import React, { useEffect, useState, useMemo } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { useSelector } from "react-redux";

const API_URL = "https://fakestoreapi.com/products";
const CATEGORIES_URL = "https://fakestoreapi.com/products/categories";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { theme } = useSelector((state) => state);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(API_URL),
          fetch(CATEGORIES_URL),
        ]);
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        setProducts(Array.isArray(productsData) ? productsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (e) {
        console.error("Error fetching data", e);
        setProducts([]);
        setCategories([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = !category || p.category === category;
      const matchSearch =
        !search ||
        (p.title && p.title.toLowerCase().includes(search.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [products, category, search]);

  return (
    <div className={theme ? "bg-slate-600" : "bg-white"}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="sticky top-0 z-10 py-4 px-4 max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-stretch sm:items-center bg-inherit border-b border-gray-200/50">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`flex-1 min-w-0 px-4 py-2 rounded-lg border ${theme ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400" : "bg-white border-gray-300 text-gray-900"}`}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${theme ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2 px-4 mx-auto space-y-10 space-x-5 min-h-[80vh] max-w-6xl">
              {filteredProducts.map((post) => (
                <Product key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center mt-[20%] text-xl">
              <span className={theme ? "text-slate-200" : "text-slate-800"}>
                {products.length === 0 ? "No Data Found" : "No products match your search."}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
