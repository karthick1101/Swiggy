import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../utils/cartSlice";
import ItemList from "./ItemList";

const Cart = () => {
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold m-4">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          className="p-2 m-4 bg-black text-white rounded-xl"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        {cartItems.length === 0 && (
          <h1 className="font-bold text-4xl m-4">Cart is Empty!!! Please Look For More</h1>
        )}
        <ItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
