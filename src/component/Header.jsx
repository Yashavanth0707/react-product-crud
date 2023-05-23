import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  // const userrole = false;
  const [lastObject, setLastObject] = useState();
  useEffect(() => {
    const lastOne = localStorage.getItem("loginUser");
    if (lastOne) {
      const lastObject = JSON.parse(lastOne);
      setLastObject(lastObject);
    } else {
      setLastObject(null);
    }
  }, []);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
    setLastObject(null);
  };

  return (
    <>
      <div className="nav-bar">
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/login">
              {lastObject != null ? (
                <button type="submit" onClick={handleLogOut}>
                  log out
                </button>
              ) : (
                "log in"
              )}
            </Link>
          </li>
          {lastObject === "admin" && (
            <li>
              <Link to="/createproduct">CREATE-PRODUCT</Link>
            </li>
          )}
          {lastObject === "admin" && (
            <li>
              <Link to="/productlist">PRODUCT-LIST</Link>
            </li>
          )}
          {lastObject === "user" && (
            <li>
              <Link to="/products">PRODUCTS</Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default Header;
