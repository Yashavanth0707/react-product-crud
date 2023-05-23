import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      const allProducts = response.data;
      console.log(allProducts);
      setProducts(allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (p) => {
    const confirmed = confirm(
      `Are you sure you want to delete this product: ${p.ProductName}`
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/products/${p.id}`);
        getAllProducts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/EditProduct/${id}`);
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
            <button onClick={() => handleDelete(product)}>Delete</button>
            <button onClick={() => handleEdit(product.id)}>Edit</button>
          </div>
        ))}
      </div>
    </>
  );
};
export default ProductList;
