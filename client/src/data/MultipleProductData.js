export const products = {
  "Womens Wear": [
    {
    id: 1,
    name: "Dresses",
    price: 699,
    image: "/assets/product-3.jpeg",
    description: "Chic and trendy dresses perfect for all occasions."
    },
    {
    id: 2,
    name: "Trousers",
    price: 549,
    image: "/assets/product-2.jpeg",
    description: "Comfortable and stylish trousers for everyday use."
    },
    {
      id: 3,
      name: "Stylish Sandals",
      price: 1000,
      image: "/assets/Stylish-Sandals.jpeg",
      description: "A stylish sandals for college wear ",
      category: "Women-Footwear"
    },
    {
    id: 4,
    name: "Formal Skirts",
    price: 499,
    image: "/assets/product-1.jpeg",
    description: "Elegant formal skirts for office and formal occasions."
    },
    {
      id: 5,
      name: "Elegant Heels",
      price: 1500,
      image: "/assets/Elegant-Heels.jpeg",
      description: "Elegant heels for special occasions.",
      category: "Women-Footwear"
    },
    {
    id: 6,
    name: "Jeans",
    price: 659,
    image: "/assets/product-4.jpeg",
    description: "Durable and modern fit jeans for daily wear."
    },
    {
      id: 7,
      name: "Casual Sneakers",
      price: 1200,
      image: "/assets/Casual-Sneakers.jpeg",
      description: "Comfortable sneakers for everyday wear.",
      category: "Women-Footwear"
    },
  ],
  "Mens Wear":[
    {
    id: 8,
    name: "Men's Denim Jackets",
    price: 550,
    image: "/assets/product-5.jpeg",
    description: "Stylish denim jackets for men."
  },
  {
    id: 9,
    name: "Men's Tshirts",
    price: 299,
    image: "/assets/product-6.jpeg",
    description: "Comfortable t-shirts for casual wear."
  },
  {
    id: 10,
    name: "Men's Suit",
    price: 2999,
    image: "/assets/product-7.jpeg",
    description: "Premium suits for formal events and office."
  },
  {
    id: 11,
    name: "Men's Shirt",
    price: 499,
    image: "/assets/product-8.jpeg",
    description: "Classic shirts for business and casual wear."
  },
  ],
  "Electronics": [
    {
      id: 12,
      name: "Smart Phone",
      price: 30000,
      image: "/assets/Smart-Phone.jpeg",
      description: "Latest smartphone with advanced features.",
      category: "Electronics"
    },
    {
      id: 12,
      name: "Laptop",
      price: 60000,
      image: "/assets/Laptop.jpeg",
      description: "High-performance laptop for work and play.",
      category: "Electronics"
    },
    {
      id: 13,
      name: "Smart Watch",
      price: 5000,
      image: "/assets/Smart-Watch.jpeg",
      description: "Stylish smartwatch with health tracking.",
      category: "Electronics"
    },
    {
      id: 14,
      name: "Mobile Phone",
      price: 20000,
      image: "/assets/Mobile-Phone.jpeg",
      description: "Latest mobile phone with cutting-edge technology.",
      category:"Mobile"
    },
    {
      id: 15,
      name: "Tablet",
      price: 25000,
      image: "/assets/Tablet.jpeg",
      description: "Portable tablet for entertainment and productivity.",
      category:"Mobile"
    },
    {
      id: 16,
      name: "Smart Speaker",
      price: 3000,
      image: "/assets/Smart-Speaker.jpeg",
      description: "Smart speaker with voice assistant.",
      category:"Mobile"
    },
  ],
};

export const getProductsFromCategory = (category) =>
  products[category] || [];

export const getProductById = (category, id) => {
  const cat = products[category];
  return cat?.find((p) => p.id === Number(id));
};

export default getProductsFromCategory;
