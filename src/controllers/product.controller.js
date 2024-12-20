// Dummy data to simulate products in the database
let products = [
  {
    id: 1,
    name: "Product A",
    description: "Description for Product A",
    price: 100,
    category: "Category 1",
  },
  {
    id: 2,
    name: "Product B",
    description: "Description for Product B",
    price: 150,
    category: "Category 2",
  },
  {
    id: 3,
    name: "Product C",
    description: "Description for Product C",
    price: 200,
    category: "Category 3",
  },
];
exports.getAllProducts = (req, res) => {
  // Simulating database fetch
  res.status(200).json(products);
};


exports.createProduct = (req, res) => {
  const { name, description, price, category } = req.body;

  // Validate input
  if (!name || !description || !price || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Simulate creating a new product by adding it to the "database"
  const newProduct = {
    id: products.length + 1, // Simulate auto-increment ID
    name,
    description,
    price,
    category,
  };

  // Adding the new product to our dummy data
  products.push(newProduct);

  // Return a success response with the newly created product
  res.status(201).json(newProduct);
};
