import { useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";

const Login = () => {
  const [logindata, setLoginData] = useState({
    id: null,
    userName: "",
    DOB: "",
    Email: "",
    password: "",
    role: "",
    Address: "",
  });
  // const [lastObject, setLastObject] = useState();

  const handleChange = (event) => {
    setLoginData({ ...logindata, [event.target.name]: event.target.value });
  };

  const CreateUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        logindata
      );
      // console.log(response);
      const lastObject = response.data;
      // console.log(data);
      // const lastOne = data[data.length - 1];
      // console.log(lastOne);
      // setLastObject(data);
      console.log(lastObject);
      localStorage.setItem("loginUser", JSON.stringify(lastObject));
    } catch (error) {
      console.log(error);
    }
    setLoginData({
      userName: "",
      DOB: "",
      Email: "",
      password: "",
      role: "",
      Address: "",
    });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    CreateUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        userName:
        <input
          type="text"
          name="userName"
          value={logindata.userName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        DOB:
        <input
          type="date"
          name="DOB"
          value={logindata.DOB}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="Email"
          value={logindata.Email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        password:
        <input
          type="password"
          name="password"
          value={logindata.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Role:
        <input
          type="text"
          name="role"
          value={logindata.role}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          name="Address"
          value={logindata.Address}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
