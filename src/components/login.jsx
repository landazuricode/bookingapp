import useHotelAPI from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { loginUser } = useHotelAPI();
  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formValues = {};
      formData.forEach((value, key) => {
        formValues[key] = value;
      });
      const res = await loginUser(formValues);
      if (res?.token) {
        sessionStorage.setItem('token', res?.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginpage">
      <header className="loginpage__header">
        <img className="loginpage__img" src="/images/user.png" alt="" />
      </header>
      <form onSubmit={handleSubmitForm} className="login">
        <h2 className="loginpage__title">User</h2>
        <div className="login__field">
          <label className="login__label" htmlFor="email">
            Email
          </label>
          <input
            className="login__input"
            required
            name="email"
            type="email"
            id="email"
          />
        </div>
        <div className="login__field">
          <label className="login__label" htmlFor="password">
            Password
          </label>
          <input
            className="login__input"
            name="password"
            type="password"
            id="password"
            required
          />
        </div>
        <button className="login__btn">Submit</button>
      </form>
    </div>
  );
}
