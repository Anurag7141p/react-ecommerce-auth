import { useEffect, useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalStorageData = () => {
  let localCartData = JSON.parse(localStorage.getItem("cartItem"));
  
  if (localCartData.length === 0) {
    return [];
  } else {
    return localCartData;
  }
};

const initialState = {
  cart: getLocalStorageData(),
  totalItem: "",
  totalPrice: "",
  shippingFee: 50000,
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ADD TO CART

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // REMOVE ITEM

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // CLEAR CART

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // INCREASE AND DECREASE CART PRODUCT COUNT

  const setIncrease = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  // TO ADD DATA IN LOCALSTORAGE

  useEffect(() => {
    // dispatch({type:"CART-TOTAL-ITEM"})
    // dispatch({type:"CART-TOTAL-AMOUNT"})
    dispatch({type:"CART_ITEM_PRICE_TOTAL"})
    localStorage.setItem("cartItem", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useGlobalCartContext = () => {
  return useContext(CartContext);
};

export { CartContext, CartContextProvider, useGlobalCartContext };
