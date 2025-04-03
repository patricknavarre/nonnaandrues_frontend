import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { updateCartItem, removeFromCart } from "../features/cart/cartSlice";

const CartPage = () => {
  const { items, loading, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate cart totals
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  // Handle quantity change
  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateCartItem({ id, quantity }));
    }
  };

  // Handle remove item
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold text-southern-brown mb-8">
        Your Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart
            className="mx-auto mb-4 text-southern-brown/50"
            size={64}
          />
          <h2 className="text-2xl font-heading text-southern-brown mb-4">
            Your cart is empty
          </h2>
          <p className="mb-8 text-gray-600">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/products"
            className="btn btn-primary inline-flex items-center"
          >
            Continue Shopping
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-southern p-6 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-southern-beige">
                    <th className="text-left py-4">Product</th>
                    <th className="text-center py-4">Quantity</th>
                    <th className="text-right py-4">Price</th>
                    <th className="text-right py-4">Total</th>
                    <th className="text-right py-4">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-southern-beige"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <Link to={`/products/${item.productId}`}>
                            <img
                              src={
                                item.image || "/images/product-placeholder.png"
                              }
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-sm"
                            />
                          </Link>
                          <div>
                            <Link
                              to={`/products/${item.productId}`}
                              className="font-medium text-southern-brown hover:text-southern-green"
                            >
                              {item.title}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="p-1 rounded bg-southern-beige/50 text-southern-brown"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="p-1 rounded bg-southern-beige/50 text-southern-brown"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-4 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1 rounded text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-southern p-6 shadow-sm">
              <h2 className="text-xl font-heading font-semibold text-southern-brown mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-southern-beige flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-southern-green">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <button className="btn btn-primary w-full">
                  Proceed to Checkout
                </button>
                <Link
                  to="/products"
                  className="btn btn-outline w-full flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
