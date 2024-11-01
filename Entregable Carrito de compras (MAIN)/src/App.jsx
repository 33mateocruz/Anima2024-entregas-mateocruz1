import React, { useState } from "react";
import ListaProducto from "./components/ListaProducto";
import Carrito from "./components/Carrito";

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const updatedCart = cart.map((item) =>
      item.name === product.name
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    if (
      product.name === "Papel Higiénico" ||
      product.name === "Alcohol en Gel"
    ) {
      const item = cart.find((item) => item.name === product.name);
      if (item && item.quantity >= 5) {
        alert(
          "Lo sentimos. No es posible comprar más unidades. Otras familias también necesitan abastecerse"
        );
        return;
      }
    }

    setCart((prevCart) =>
      prevCart.some((item) => item.name === product.name)
        ? updatedCart
        : [...prevCart, { ...product, quantity: 1 }]
    );
  };

  const removeFromCart = (product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="container">
      <ListaProducto addToCart={addToCart} />
      <Carrito cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
};

export default App;
