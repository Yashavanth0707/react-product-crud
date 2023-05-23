import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CreateProduct = () => {
  const [formdata, setFormdata] = useState({
    id: null,
    ProductName: "",
    price: "",
    discount: "",
    rating: "",
  });

  const { id: pid } = useParams();
  //   console.log(pid);

  const handleChange = (event) => {
    setFormdata({ ...formdata, [event.target.name]: event.target.value });
  };

  const saveProduct = async () => {
    try {
      await axios.post("http://localhost:3000/products", formdata);
    } catch (error) {
      console.log(error);
    }
    setFormdata({ ProductName: "", price: "", discount: "", rating: "" });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    if (pid) {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${pid}`
        );
        const product = response.data;
        console.log(product.ProductName);
        setFormdata({
          ProductName: product.ProductName,
          price: product.price,
          discount: product.discount,
          rating: product.rating,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:3000/products/${pid}`, formdata);
    } catch (error) {
      console.log(error);
    }
  };

  const handlSubmit = async (e) => {
    e.preventDefault();
    if (pid) {
      updateProduct();
    } else {
      saveProduct();
    }
    setFormdata({
      ProductName: "",
      price: "",
      discount: "",
      rating: "",
    });
  };

  return (
    <>
      <h2>{pid ? "Edit" : "Create"} Product</h2>
      <form onSubmit={handlSubmit}>
        <label>
          ProductName:
          <input
            type="text"
            name="ProductName"
            value={formdata.ProductName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formdata.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Discount:
          <input
            name="discount"
            type="text"
            value={formdata.discount}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Rating:
          <input
            type="text"
            name="rating"
            value={formdata.rating}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default CreateProduct;
