import { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  //   const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      const allProducts = response.data;
      //   console.log(allProducts);
      setProducts(allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        {products.map((product) => (
          <div className="product-box" key={product.id}>
            <h3>Product Name:{product.ProductName}</h3>
            <h3>Price:{product.price}&#x20B9;</h3>
            <h3>discount:{product.discount}</h3>
            <h3>rating:{product.rating}</h3>
          </div>
        ))}
      </div>
    </>
  );
};
export default Products;
