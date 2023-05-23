import { useEffect, useState } from "react";
import "./App.css";
import Home from "./component/Home";
import Header from "./component/Header";
import CreateProduct from "./component/CreateProduct";
import ProductList from "./component/ProductList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./component/Login";
import axios from "axios";
import Products from "./component/Products";

function App() {
  const [lastObject, setLastObject] = useState("");
  useEffect(() => {
    const lastOne = localStorage.getItem("loginUser");
    if (lastOne) {
      const lastObject = JSON.parse(lastOne);
      setLastObject(lastObject.role);
    }
  }, []);

  console.log(lastObject);
  // console.log(lastObject.role);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route
            path="/crateproduct"
            element={
              lastObject === "admin" ? (
                <Navigate to="/ProductList" />
              ) : (
                <Navigate to="/products" />
              )
            }
          />
          <Route
            path="/crateproduct"
            element={
              lastObject === "admin" ? (
                <Navigate to="/createproduct" />
              ) : (
                <Navigate to="/products" />
              )
            }
          />
          <Route path="/productlist" Component={ProductList} />
          <Route path="/createproduct" Component={CreateProduct} />
          <Route path="/products" Component={Products} />
          <Route path="/EditProduct/:id" Component={CreateProduct} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
