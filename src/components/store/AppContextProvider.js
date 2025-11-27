import React, { useEffect } from 'react'
import { useState } from "react";
import productData from "../../data/products.json";
import AppContext from './appcontext'
import { set } from 'mongoose';

const AppContextProvider = ({children}) => {
   
  const [cartItems, setCartItems] = useState([]);
   const [products, setProducts] = useState([]);
   const [showCart, setShowCart] = useState(false);
   const [showAddProduct, setShowAddProduct] = useState(false);
   const [loading, setLoading] = useState(false);
 
 useEffect(()=>{
        const getProductsData=async()=>{
            try{
                setLoading(true);
                const response = await fetch("https://ecommerce-app-practise-default-rtdb.firebaseio.com/products.json");
                if(!response.ok){
                    throw new Error("Failed to fetch products data");
                }
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            }
            catch(err){
                console.error(err.message);
            }
        }
        getProductsData();
    },[])
   const openCart = () => setShowCart(true);
   const closeCart = () => setShowCart(false);
 
   const openAddProduct = () => setShowAddProduct(true);
   const closeAddProduct = () => setShowAddProduct(false);
 
   const handleAddToCart = (productId, productName, productImg) => {
     const productInCartIndex = cartItems.findIndex(
       (item) => item.id === productId
     );
     if (productInCartIndex === -1) {
       setCartItems((prev) => [
         ...prev,
         { id: productId, name: productName, image: productImg, quantity: 1 },
       ]);
     } else {
       const newCartItems = [...cartItems];
       newCartItems[productInCartIndex].quantity += 1;
       setCartItems(newCartItems);
     }
   };
 
   const handleIncreaseQuantity = (productId) => {
     const productIndex = cartItems.findIndex((item) => item.id === productId);
     if (productIndex === -1) return;
     const newCartItems = [...cartItems];
     newCartItems[productIndex].quantity += 1;
     setCartItems(newCartItems);
   };
 
   const handleDecreaseQuantity = (productId) => {
     const productIndex = cartItems.findIndex((item) => item.id === productId);
     if (productIndex === -1) return;
     let newCartItems = [...cartItems];
     if (newCartItems[productIndex].quantity === 1) {
       newCartItems = newCartItems.filter((item) => item.id !== productId);
     } else {
       newCartItems[productIndex].quantity -= 1;
     }
     setCartItems(newCartItems);
   };
 
   const handleAddProduct = (productName) => {
     setProducts((prev) => [
       ...prev,
       { id: prev.length + 1, name: productName, image: "default_product.png" },
     ]);
     closeAddProduct();
   };
   const appcontextValue = {
    cartItems,
    products,
    showCart,
    loading,
    showAddProduct,
    openCart,  
    closeCart,
    openAddProduct,
    closeAddProduct,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleAddProduct
   }  
    return (
    <AppContext.Provider value={appcontextValue}>
        {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider