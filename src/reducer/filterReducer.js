const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":

     let priceArr=action.payload.map((curEle)=>curEle.price)

     let maxPrice=Math.max(...priceArr)
     let minPrice=Math.min(...priceArr)

      return {
        ...state,
        filterProducts: [...action.payload],
        allProducts: [...action.payload],
        filters:{...state.filters,maxPrice,price:maxPrice,minPrice}
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        gridView: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        gridView: false,
      };

    case "GET_SORT_VALUE":
      // let userSortValue = document.getElementById("sort");
      // let sortValue = userSortValue.options[userSortValue.selectedIndex].value;

      return {
        ...state,
        sortingValue: action.payload,
      };

    case "SORTING_PRODUCTS":

      let newSortData;
      const {filterProducts}=state
      let tempSortProduct = [...filterProducts];

      switch (state.sortingValue) {
        case "lowest":
          newSortData = tempSortProduct.sort((a, b) => a.price - b.price);
          break;
        case "highest":
          newSortData = tempSortProduct.sort((a, b) => b.price - a.price);
          break;
        case "a-z":
          newSortData = tempSortProduct.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "z-a":
          newSortData = tempSortProduct.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          newSortData = tempSortProduct;
          break;
      }

      return {
        ...state,
        filterProducts: newSortData,
      };

    case "UPDATE_FILTERS_VALUE":
      const {name,value}=action.payload
      return{
        ...state,
        filters:{
          ...state.filters,[name]:value
        }
      }
    
    case "FILTER_PRODUCTS":
      let {allProducts}=state
      let tempFilterProduct=[...allProducts]

      const {text,category,company,color,price}=state.filters

      if(text)
      {
        tempFilterProduct=tempFilterProduct.filter((curEle)=>{
          return curEle.name.toLowerCase().includes(text)
        })
      }

      if(category!=="All")
      {
        tempFilterProduct=tempFilterProduct.filter((curEle)=>{
          return curEle.category===category
        })
      }

      if(company!=='All')
      {
        tempFilterProduct=tempFilterProduct.filter((curEle)=>{
          return curEle.company===company
        })
      }  

      if(color!=="All")
      {
         tempFilterProduct= tempFilterProduct.filter((curColor)=>{
          return curColor.colors.includes(color)
         })
      }

      if(price===0){
        tempFilterProduct=tempFilterProduct.filter((curEle)=>{
          return curEle.price===price
        })
      }
      else{
        tempFilterProduct=tempFilterProduct.filter((curEle)=>{
          return curEle.price<=price
        })

      }
     
      return{
        ...state,
        filterProducts:tempFilterProduct
      }
      
    case "CLEAR_FILTERS":
      
      return{
        ...state,
        filters:{
          ...state.filters,
          text:"",
          category:"All",
          company:"All",
          color:"All",
          maxPrice:state.filters.maxPrice,
          price:state.filters.price,
          minPrice:state.filters.minPrice
        }
      }


    default:
      return state;
  }
};

export default filterReducer;
