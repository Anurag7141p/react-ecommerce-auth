const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let { id, color, amount, product } = action.payload;

      let existingProduct = state.cart.find(
        (curEle) => curEle.id === id + color
      );

      if (existingProduct) {
        let updatedProduct = state.cart.map((curEle) => {
          if (curEle.id === id + color) {
            let newAmount = curEle.amount + amount;

            if (newAmount >= curEle.max) {
              newAmount = curEle.max;
            }

            return {
              ...curEle,
              amount: newAmount,
            };
          } else {
            return curEle;
          }
        });

        return {
          ...state,
          cart: updatedProduct,
        };
      } else {
        let cartProduct = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };
        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }

    case "REMOVE_ITEM":
      let updatedCart = state.cart.filter((curEle) => {
        return curEle.id !== action.payload;
      });
      return {
        ...state,
        cart: updatedCart,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    // to set increment and decrement

    case "SET_INCREMENT":
      let updatedIncreProduct = state.cart.map((curEle) => {
        if (curEle.id === action.payload) {
          let incAmount = curEle.amount + 1;

          if (incAmount >= curEle.max) {
            incAmount = curEle.max;
          }
          return {
            ...curEle,
            amount: incAmount,
          };
        } else {
          return curEle;
        }
      });

      return {
        ...state,
        cart: updatedIncreProduct,
      };

    case "SET_DECREMENT":
      let updatedDecreProduct = state.cart.map((curEle) => {
        if (curEle.id === action.payload) {
          let decAmount = curEle.amount - 1;
          if (decAmount <= 1) {
            decAmount = 1;
          }
          return {
            ...curEle,
            amount: decAmount,
          };
        } else {
          return curEle;
        }
      });
      return {
        ...state,
        cart: updatedDecreProduct,
      };

    // case "CART-TOTAL-ITEM":
    //   let totalItem = state.cart.reduce((accumulator, curEle) => {
    //     let { amount } = curEle;
    //     accumulator = accumulator + amount;
    //     return accumulator;
    //   }, 0);

    //   return {
    //     ...state,
    //     totalItem: totalItem,
    //   };

    // case "CART-TOTAL-AMOUNT":
    //   let totalPrice = state.cart.reduce((accumulator, curEle) => {
    //     let { price,amount } = curEle;
    //     accumulator = accumulator + price*amount;
    //     return accumulator;
    //   },0);

    //   return {
    //     ...state,
    //     totalAmount: totalPrice,
    //   };

    case "CART_ITEM_PRICE_TOTAL":
      let { totalItem, totalPrice } = state.cart.reduce(
        (accumulator, curEle) => {
          let { price, amount } = curEle;
          accumulator.totalItem += amount;
          accumulator.totalPrice += price * amount;

          return accumulator;
        },
        { totalItem: 0, totalPrice: 0 }
      );

      return {
        ...state,
        totalItem,
        totalPrice,
      };

    default:
      break;
  }
};

export default cartReducer;
