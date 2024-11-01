import React, { useState } from "react";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.name === product.name);

    if (
      (product.name === "Papel Higiénico" ||
        product.name === "Alcohol en Gel") &&
      existingProduct &&
      existingProduct.quantity >= 5
    ) {
      alert(
        "Lo sentimos. No es posible comprar más unidades. Otras familias también necesitan abastecerse."
      );
      return;
    }

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct.quantity === 1) {
      setCart(cart.filter((item) => item.name !== product.name));
    } else {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <div className="container">
      <ProductList addToCart={addToCart} />
      <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
};

export default App;
