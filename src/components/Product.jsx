import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";

const Product = ({ post }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const qty = cart.find((p) => p.id === post.id)?.quantity ?? 0;

  const addtocart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(add(post));
    toast.success("Item added to cart");
  };

  const removefromcart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(remove(post.id));
    toast.success("Item removed from cart");
  };

  return (
    <Link
      to={`/product/${post.id}`}
      className="flex flex-col bg-white items-center w-56 h-[22rem] hover:scale-105 hover:shadow-[rgba(0,_0,_0,0.5)_0px_30px_90px] transition duration-300 ease-in-out gap-2 rounded-xl mt-10 p-4 pb-4 ml-4 border shadow-[0_3px_10px_rgb(0,0,0,0.3)] overflow-hidden"
    >
      <div className="w-full h-10 shrink-0 overflow-hidden">
        <p className="text-gray-700 text-sm leading-tight font-semibold text-left line-clamp-2">{post.title.split(",").at(0)}</p>
      </div>
      <div className="w-full h-9 shrink-0 overflow-hidden">
        <p className="text-[10px] text-gray-500 line-clamp-2">{post.description.substr(0, 80)}...</p>
      </div>
      <div className="h-40 w-40 shrink-0 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        <img src={post.image} alt="product" className="max-h-full max-w-full object-contain" />
      </div>
      <div className="flex gap-1 items-center text-sm">
        <span>{post.rating.rate}</span>
        <AiFillStar />
      </div>
      <div className="flex flex-row items-center justify-between w-full gap-2 mt-auto">
        <p className="text-md text-green-600 font-bold shrink-0">${post.price}</p>
        {qty > 0 ? (
          <button
            onClick={removefromcart}
            className="rounded-2xl px-3 py-2 shrink-0 whitespace-nowrap uppercase border border-gray-500 text-xs font-semibold hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={addtocart}
            className="rounded-2xl px-3 py-2 shrink-0 whitespace-nowrap uppercase border border-gray-500 text-xs font-semibold hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out"
          >
            Add to cart
          </button>
        )}
      </div>
    </Link>
  );
};

export default Product;