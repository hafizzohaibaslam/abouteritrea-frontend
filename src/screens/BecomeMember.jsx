import { useMemo, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import MyToast from "../utils/Toast";

const BecomeMember = () => {
  const toast = useToast();
  const myToast = useMemo(() => new MyToast(toast), [toast]);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        credentials
      );
      console.log("data: ", data);
      myToast.success("Successfully Logged into Application");
    } catch (error) {
      console.log(error);
      myToast.error(error.response.data.error.message);
    }
  };
  return (
    <section className="signup w-full sm:w-7/12 md:w-8/12 py-10 sm:pr-5 flex flex-col gap-y-5">
      <h3 className="signup-title common-title">Become a Member</h3>
      <span className="signup-description w-full md:w-8/12 common-description">
        Becoming a member allows you to add/edit articles, comment, discuss in
        timeline and more.
      </span>

      <form
        onSubmit={submitHandler}
        className="w-full md:w-8/12 flex flex-col gap-y-5"
      >
        <div className="signup-form__field form__field">
          <label htmlFor="username" className="signup-form__label form__label">
            Name
          </label>
          <input
            type="text"
            value={credentials.username}
            onChange={changeHandler}
            name="username"
            id="username"
            className="signup-form__input form__input"
            required
          />
        </div>
        <div className="signup-form__field form__field">
          <label htmlFor="email" className="signup-form__label form__label">
            Email
          </label>
          <input
            type="email"
            value={credentials.email}
            onChange={changeHandler}
            name="email"
            id="email"
            className="signup-form__input form__input"
            required
          />
        </div>

        <div className="signup-form__field form__field">
          <label htmlFor="password" className="signup-form__label form__label">
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            onChange={changeHandler}
            name="password"
            id="password"
            className="signup-form__input form__input"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="form__submit">
            Become a Member
          </button>
        </div>
      </form>
    </section>
  );
};

export default BecomeMember;
