import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import "./ProductList.css";
import CartItem from "./CartItem";

const plantsArray = [
  {
    category: "Indoor Plants",
    plants: [
      {
        name: "Snake Plant",
        image:
          "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=500&q=80",
        description:
          "A low-maintenance indoor plant that improves air quality.",
        cost: "$25",
      },
      {
        name: "Peace Lily",
        image:
          "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=500&q=80",
        description:
          "An elegant flowering plant that thrives indoors.",
        cost: "$30",
      },
      {
        name: "Spider Plant",
        image:
          "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=500&q=80",
        description:
          "A popular and easy-to-grow indoor houseplant.",
        cost: "$20",
      },
      {
        name: "ZZ Plant",
        image:
          "https://images.unsplash.com/photo-1632207691144-6c7e5c5c6a7c?auto=format&fit=crop&w=500&q=80",
        description:
          "A hardy plant that requires very little maintenance.",
        cost: "$28",
      },
      {
        name: "Monstera",
        image:
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80",
        description:
          "A tropical plant known for its large split leaves.",
        cost: "$40",
      },
      {
        name: "Rubber Plant",
        image:
          "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=500&q=80",
        description:
          "A beautiful indoor plant with glossy green leaves.",
        cost: "$35",
      },
    ],
  },

  {
    category: "Succulents",
    plants: [
      {
        name: "Aloe Vera",
        image:
          "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80",
        description:
          "A useful succulent known for its soothing gel.",
        cost: "$18",
      },
      {
        name: "Echeveria",
        image:
          "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=80",
        description:
          "A colorful rosette-shaped succulent.",
        cost: "$15",
      },
      {
        name: "Jade Plant",
        image:
          "https://images.unsplash.com/photo-1596547609652-9cf5d8f9b3b1?auto=format&fit=crop&w=500&q=80",
        description:
          "A long-living succulent with thick oval leaves.",
        cost: "$22",
      },
      {
        name: "Haworthia",
        image:
          "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80",
        description:
          "A compact succulent perfect for desks and shelves.",
        cost: "$16",
      },
      {
        name: "String of Pearls",
        image:
          "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=500&q=80",
        description:
          "A trailing succulent with bead-like leaves.",
        cost: "$24",
      },
      {
        name: "Zebra Haworthia",
        image:
          "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=500&q=80",
        description:
          "A small succulent with distinctive striped leaves.",
        cost: "$19",
      },
    ],
  },

  {
    category: "Flowering Plants",
    plants: [
      {
        name: "Rose Plant",
        image:
          "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=500&q=80",
        description:
          "A classic flowering plant producing beautiful roses.",
        cost: "$32",
      },
      {
        name: "Orchid",
        image:
          "https://images.unsplash.com/photo-1566907225470-0f5c7d7c2f6c?auto=format&fit=crop&w=500&q=80",
        description:
          "An elegant flowering plant with exotic blooms.",
        cost: "$45",
      },
      {
        name: "African Violet",
        image:
          "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?auto=format&fit=crop&w=500&q=80",
        description:
          "A compact flowering plant ideal for indoor spaces.",
        cost: "$20",
      },
      {
        name: "Anthurium",
        image:
          "https://images.unsplash.com/photo-1597305873844-35b6d1e0b6b3?auto=format&fit=crop&w=500&q=80",
        description:
          "A tropical plant with bright heart-shaped flowers.",
        cost: "$38",
      },
      {
        name: "Begonia",
        image:
          "https://images.unsplash.com/photo-1597848212624-e19c4e6d3a1f?auto=format&fit=crop&w=500&q=80",
        description:
          "A colorful flowering plant suitable for indoor gardens.",
        cost: "$27",
      },
      {
        name: "Chrysanthemum",
        image:
          "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80",
        description:
          "A cheerful flowering plant available in many colors.",
        cost: "$29",
      },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();

  // Redux cart items
  const cartItems = useSelector((state) => state.cart.items);

  // Track which products have already been added
  const [addedToCart, setAddedToCart] = useState({});

  // Control whether the cart page is displayed
  const [showCart, setShowCart] = useState(false);

  // Add product to Redux cart
  const handleAddToCart = (product) => {
    dispatch(addItem(product));

    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  // Calculate total number of items in cart
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Open cart
  const handleCartClick = () => {
    setShowCart(true);
  };

  // Return to product listing
  const handleContinueShopping = () => {
    setShowCart(false);
  };

  // Home button
  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      setShowCart(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h2>Paradise Nursery</h2>
        </div>

        <div className="navbar-right">
          <button
            className="nav-button"
            onClick={handleHomeClick}
          >
            Home
          </button>

          <button
            className="nav-button"
            onClick={() => setShowCart(false)}
          >
            Plants
          </button>

          <button
            className="cart-button"
            onClick={handleCartClick}
          >
            🛒 Cart ({cartCount})
          </button>
        </div>
      </nav>

      {/* Product Listing / Cart */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div className="category-section" key={index}>
              <h1 className="category-title">
                {category.category}
              </h1>

              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div
                    className="product-card"
                    key={plantIndex}
                  >
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                    />

                    <div className="product-title">
                      {plant.name}
                    </div>

                    <div className="product-description">
                      {plant.description}
                    </div>

                    <div className="product-cost">
                      {plant.cost}
                    </div>

                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name]
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem
          onContinueShopping={handleContinueShopping}
        />
      )}
    </div>
  );
}

export default ProductList;