import { createContext, useContext, useEffect, useReducer } from "react";
import { useGlobalContext } from "./productContext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filterProducts: [],
  allProducts: [],
  gridView: true,
  sortingValue: "lowest",
  filters:{
    text:"",
    category:"All",
    company:"All",
    color:"All",
    maxPrice:0,
    price:0,
    minPrice:0
  },
};

const FilterContextProvider = ({ children }) => {
  const { products } = useGlobalContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  // TO SET THE GRID VIEW

  const setGridView = () => {
    dispatch({
      type: "SET_GRID_VIEW",
    });
  };

  // TO SET THE LIST VIEW

  const setListView = () => {
    dispatch({
      type: "SET_LIST_VIEW",
    });
  };

  // SORTING FUNCTION

  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({
      type: "GET_SORT_VALUE",
      payload: userValue,
    });
  };

  // UPDATE FILTER VALUES
  const updateFilterValue=(e)=>{
    let name=e.target.name
    let value=e.target.value
    return dispatch({type:"UPDATE_FILTERS_VALUE",payload:{name,value}})
  }

  // CLEAR FILTERS

  const clearFilters=()=>{
    dispatch({type:"CLEAR_FILTERS"})

  }

  

  // TO SORT THE PRODUCT
  useEffect(() => {
    dispatch({type:"FILTER_PRODUCTS"})
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, state.sortingValue,state.filters]);


  useEffect(() => {
    dispatch({
      type: "LOAD_FILTER_PRODUCTS",
      payload: products,
    });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, sorting,updateFilterValue,clearFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useGlobalFilterContext = () => {
  return useContext(FilterContext);
};

export { FilterContextProvider, useGlobalFilterContext };
