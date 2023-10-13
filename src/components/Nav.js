import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { CgClose, CgMenu } from "react-icons/cg";
import { useGlobalCartContext } from "../context/cartContext";
import Button from "../styles/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosArrowDown } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

const Nav = () => {
  const [menuIcon, setMenuIcon] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { totalItem } = useGlobalCartContext();

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  console.log(dropDown);
  console.log(isAuthenticated);
  console.log(user);

  return (
    <Navbar>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              PRODUCTS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              CONTACT
            </NavLink>
          </li>
          <li>
            {isAuthenticated ? (
              <div className="cart-user--profile">
                <img src={user.picture} alt={user.name} />
                <h2 className="cart-user--name">{user.name}</h2>
                <IoIosArrowDown
                  className="drop-down-arrow"
                  onClick={() => setDropDown(!dropDown)}
                />

                {dropDown ? (
                  <div className="dropDownProfile">
                    <ul className="dropDown-ul">
                      <li className="dropDown-logout">
                        <AiOutlineUser className="dropDown-logo" />{" "}
                        <span className="dropDown-text">Profile</span>
                      </li>
                      <li
                        onClick={() =>
                          logout({
                            logoutParams: { returnTo: window.location.origin },
                          })
                        }
                        className="dropDown-logout"
                      >
                        <IoLogOutOutline className="dropDown-logo" />{" "}
                        <span className="dropDown-text">Logout</span>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : (
              <li>
                <Button onClick={() => loginWithRedirect()}>Log In</Button>;
              </li>
            )}
          </li>

          <li>
            <NavLink to="/cart" className="navbar-link cart-trolley--link">
              <AiOutlineShoppingCart className="cart-trolley" />
              <span className="cart-total--item">{totalItem}</span>
            </NavLink>
          </li>
        </ul>

        {/* two button for open and close menu */}

        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </Navbar>
  );
};

const Navbar = styled.nav`
  .navbar-lists {
    display: flex;
    gap: 4.8rem;
    align-items: center;

    .navbar-link {
      &:link,
      &:visited {
        display: inline-block;
        text-decoration: none;
        font-size: 1.8rem;
        font-weight: 500;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.black};
        transition: color 0.3s linear;
      }

      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.helper};
      }
    }
  }

  .mobile-navbar-btn {
    display: none;
    background-color: transparent;
    cursor: pointer;
    border: none;
  }

  .mobile-nav-icon[name="close-outline"] {
    display: none;
  }

  .close-outline {
    display: none;
  }

  .cart-trolley--link {
    position: relative;

    .cart-trolley {
      position: relative;
      font-size: 3.2rem;
    }

    .cart-total--item {
      width: 2.4rem;
      height: 2.4rem;
      position: absolute;
      background-color: #000;
      color: #000;
      border-radius: 50%;
      display: grid;
      place-items: center;
      top: -20%;
      left: 70%;
      background-color: ${({ theme }) => theme.colors.helper};
    }
  }

  .user-login--name {
    text-transform: capitalize;
  }

  .user-logout,
  .user-login {
    font-size: 1.4rem;
    padding: 0.8rem 1.4rem;
  }

  /* .user-profile{
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    box-sizing: border-box;
    padding: 8px;
  } */

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    position: relative;

    img {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }

  .drop-down-arrow {
    width: 2rem;
    height: 2rem;
  }

  .dropDownProfile {
    position: absolute;
    top: 5rem;
    right: -0.5rem;
    width: auto;
    padding: 2rem;
    border-radius: 5px;
    background-color: white;
    border: 1px solid gray;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    .dropDown-ul {
      display: grid;
      row-gap: 2rem;
    }

    li {
      font-size: 2rem;
      font-family: "Work Sans", sans-serif;
      font-size: 1.8rem;
      font-weight: 500;
      text-transform: uppercase;
    }
    .dropDown-logo {
      width: 2.5rem;
      height: 2.5rem;
    }

    .dropDown-logout {
      display: flex;
      gap: 0.5rem;
    }

    .dropDown-text{
      margin-top: 2.5px;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .mobile-navbar-btn {
      display: inline-block;
      z-index: 9999;
      border: ${({ theme }) => theme.colors.black};

      .mobile-nav-icon {
        font-size: 4.2rem;
        color: ${({ theme }) => theme.colors.black};
      }
    }

    .active .mobile-nav-icon {
      display: none;
      font-size: 4.2rem;
      position: absolute;
      top: 30%;
      right: 10%;
      color: ${({ theme }) => theme.colors.black};
      z-index: 9999;
    }

    .active .close-outline {
      display: inline-block;
    }

    .navbar-lists {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      visibility: hidden;
      opacity: 0;
      transform: translateX(100%);
      /* transform-origin: top; */
      transition: all 0.5s linear;
    }

    .active .navbar-lists {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      z-index: 999;
      transform-origin: right;
      transition: all 1s linear;

      .navbar-link {
        font-size: 4.2rem;
      }
    }
    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 5.2rem;
      }

      .cart-total--item {
        width: 4.2rem;
        height: 4.2rem;
        font-size: 2rem;
      }
    }

    .user-logout,
    .user-login {
      font-size: 2.2rem;
      padding: 0.8rem 1.4rem;
    }
  }
`;

export default Nav;
