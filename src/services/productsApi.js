import axios from "axios";

// Fetch products with pagination & sorting
export const getProducts = async (
  page = 1,
  sortColumn = "title",
  sortOrder = "asc"
) => {
  try {
    // Define pagination params
    const limit = 10;
    const skip = (page - 1) * limit;

    // Query parameters
    const sortParam = `sortBy=${sortColumn}&order=${sortOrder}`;
    const limitParam = `limit=${limit}`;
    const skipParam = `skip=${skip}`;
    const selectParam = `select=title,price,brand,category,images,reviews`;

    // Construct the URL
    const url = `https://dummyjson.com/products?${sortParam}&${limitParam}&${skipParam}&${selectParam}`;

    // Fetch products
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error fetching products.");
  }
};
