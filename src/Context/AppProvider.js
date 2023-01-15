import { createContext, useEffect, useReducer } from "react";
import cartItem from "../Components/data";
import reducer from "../Components/reducer";

const AppContext = createContext();
const url = "https://course-api.com/react-useReducer-cart-project";

const AppProvider = ({ children }) => {
  const initialState = {
    loading: false,
    cart: cartItem,
    amount: 0,
    total: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    return dispatch({ type: "CLEAR_CART" });
  };

  const removeSingle = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };

  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{ ...state, clearCart, removeSingle, increase, decrease }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
