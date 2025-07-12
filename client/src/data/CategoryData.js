const categories = [
  {
    title: "Womens Wear",
    id: 1,
    image: `${process.env.PUBLIC_URL}/assets/womens-wear.jpeg`,
  },
  {
    title: "Mens Wear",
    id: 2,
    image: `${process.env.PUBLIC_URL}/assets/mens-wear.jpeg`,
  },
  {
    title: "Electronics",
    id: 3,
    image: `${process.env.PUBLIC_URL}/assets/electronics.jpeg`,
  }
];

const getCategoryData = () => {
  return categories;
};

export default getCategoryData;