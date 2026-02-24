import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { remove, updateQuantity } from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state);
  const quantity = item.quantity ?? 1;

  const removefromcart = () => {
    dispatch(remove(item.id));
    toast.success("Item removed from cart");
  };

  const handleQtyChange = (delta) => {
    const newQty = Math.max(0, quantity + delta);
    if (newQty === 0) {
      dispatch(remove(item.id));
      toast.success("Item removed from cart");
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQty }));
    }
  };

  const subtotal = (item.price * quantity).toFixed(2);

  return (
    <div className={theme ? "bg-white w-full md:w-11/12 mb-5 pb-4 rounded-lg pt-2" : "w-full md:w-11/12 mb-5 pb-4 pt-2"}>
      <div className="flex flex-col pr-6 md:pr-0 md:flex-row space-x-16 items-center justify-center">
        <div className="max-h-30 min-h-8 w-1/4">
          <img className="h-full max-h-24 object-contain" src={item.image} alt="item" />
        </div>
        <div className="flex flex-col md:w-1/2 mt-4 flex-1">
          <h1 className="text-lg font-semibold text-gray-700 mb-2">{item.title}</h1>
          <p className="text-sm text-gray-600">{item.description?.substr(0, 180)}...</p>
          <div className="flex flex-row justify-between mt-5 items-center flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQtyChange(-1)}
                className="w-8 h-8 rounded border border-gray-400 hover:bg-gray-100 font-medium"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => handleQtyChange(1)}
                className="w-8 h-8 rounded border border-gray-400 hover:bg-gray-100 font-medium"
              >
                +
              </button>
            </div>
            <p className="text-md text-green-600 font-bold">$ {subtotal}</p>
            <div
              className="cursor-pointer border rounded-full p-2 bg-red-300 hover:text-white hover:bg-red-500 transition duration-300 ease-in-out"
              onClick={removefromcart}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && removefromcart()}
              aria-label="Remove item"
            >
              <MdDelete className="text-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
