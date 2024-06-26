import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useMemo, useState } from "react";
import MyToast from "../utils/Toast";
import { useNavigate } from "react-router-dom";
import request from "../utils/request";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const myToast = useMemo(() => new MyToast(toast), [toast]);
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchRole = async () => {
    try {
      const { data } = await request.get("/users/me/?populate=*");
      return data.role.name;
    } catch (error) {
      myToast.error("Something went wrong");
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:1337/api/auth/local",
        credentials
      );
      localStorage.setItem("token-strapi", data.jwt);
      
      const role = await fetchRole();
      const user = {
        ...data.user,
        role
      }
      localStorage.setItem("user", JSON.stringify(user));
      myToast.success("Successfully Logged into Application");
      navigate("/");
    } catch (error) {
      console.log(error);
      myToast.error(error.response.data.error.message);
    }
  };


  return (
    <section className="login w-full sm:w-7/12 md:w-8/12 py-10 sm:pr-5 flex flex-col gap-y-5">
      <h3 className="login-title common-title">Log in to your account</h3>
      <span className="login-description common-description">
        Sign in to your account,{" "}
        <a href="#">
          <b> reset your password</b>
        </a>
      </span>

      <form
        onSubmit={submitHandler}
        className="w-full md:w-8/12 flex flex-col gap-y-5"
      >
        <div className="login-form__field form__field">
          <label htmlFor="email" className="login-form__label form__label">
            Email
          </label>
          <input
            type="email"
            value={credentials.email}
            onChange={changeHandler}
            name="identifier"
            id="identifier"
            className="login-form__input form__input"
            required
          />
        </div>
        <div className="login-form__field form__field">
          <label htmlFor="password" className="login-form__label form__label">
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            name="password"
            onChange={changeHandler}
            id="password"
            className="login-form__input form__input"
            required
          />
        </div>

        <div>
          <button type="submit" className="form__submit">
            Sign In
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
