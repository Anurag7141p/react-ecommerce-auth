import React from "react";
import styled from "styled-components";
import { useGlobalFilterContext } from "../context/filterContext";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../helpers/FormatPrice";
import Button from '../styles/Button'

const FilterSection = () => {
  const {
    filters: { text, category,color, price, maxPrice, minPrice },
    updateFilterValue,
    allProducts,
    clearFilters
  } = useGlobalFilterContext();

  // TO GET UNIQUE DATA FOR EACH FIELDS

  const getUniqueData = (data, attr) => {
    let newVal = data.map((curEle) => {
      return curEle[attr];
    });

    if (attr === "colors") {
      newVal = newVal.flat();
      return (newVal = ["All", ...new Set(newVal)]);
    } else {
      return (newVal = ["All", ...new Set(newVal)]);
    }
  };

  // INDUVIDUAL DATA OF EACH ITEM IN AN ARRAY FORMAT

  const categoryOnlyData = getUniqueData(allProducts, "category");
  const companyData = getUniqueData(allProducts, "company");
  const colorsData = getUniqueData(allProducts, "colors");




  return (
    <Wrapper>
      {/* SEARCH */}
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            value={text}
            placeholder="SEARCH"
            onChange={(e) => updateFilterValue(e)}
          />
        </form>
      </div>

      {/* CATEGORY */}
      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryOnlyData.map((curEle, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curEle}
                className={curEle === category ? "active" : ""}
                onClick={updateFilterValue}
              >
                {curEle}
              </button>
            );
          })}
        </div>
      </div>

      {/* COMPANY */}
      <div className="filter-company">
        <h3>Company</h3>
        <form action="#">
          <select
            name="company"
            id="company"
            className="filter-company--select"
            onClick={updateFilterValue}
          >
            {companyData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="company">
                  {curElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      {/* COLORS */}
      <div className="filter-colors colors">
        <h3>colors</h3>
        <div className="filter-color-style">
          {colorsData.map((curColor, index) => {
            if (curColor === "All") {
              return (
                <button
                  key={index}
                  type="button"
                  name="color"
                  value={curColor}
                  className="color-all--style"
                  onClick={updateFilterValue}
                >
                  All
                </button>
              );
            } else {
              return (
                <button
                  key={index}
                  type="button"
                  name="color"
                  value={curColor}
                  className={
                    curColor === color ? "btnStyle active" : "btnStyle"
                  }
                  style={{ backgroundColor: `${curColor}` }}
                  onClick={updateFilterValue}
                >
                  {color === curColor ? (
                    <FaCheck className="checkStyle" />
                  ) : null}
                </button>
              );
            }
          })}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div className="filter-price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={price} />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price}
            name="price"
            onChange={updateFilterValue}
          />
        </p>
      </div>

      <div className="filter-clear">
        <h3>Clear Filters</h3>
        <Button className="btn" onClick={clearFilters}>Clear Filter</Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter-price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
