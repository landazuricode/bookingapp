import useHotelAPI from "../hooks/useApi";

export default function Register() {
  const { registerUser } = useHotelAPI();

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formValues = {};
      formData.forEach((value, key) => {
        formValues[key] = value;
      });
      const res = await registerUser(formValues);
      if (res?.id) {
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <h2 className="register__title">Register</h2>
      <form onSubmit={handleSubmitForm} className="form-register">
        <div className="form-register__field">
          <label className="form-register__label" htmlFor="firstname">
            First Name
          </label>
          <input
            className="form-register__input"
            name="firstName"
            type="text"
            id="firstname"
            required
          />
        </div>
        <div className="form-register__field">
          <label className="form-register__label" htmlFor="lastname">
            Last Name
          </label>
          <input
            className="form-register__input"
            name="lastName"
            type="text"
            id="lastname"
            required
          />
        </div>
        <div className="form-register__field">
          <label className="form-register__label" htmlFor="email">
            Email
          </label>
          <input
            className="form-register__input"
            name="email"
            type="email"
            id="email"
            required
          />
        </div>
        <div className="form-register__field">
          <label className="form-register__label" htmlFor="password">
            Password
          </label>
          <input
            className="form-register__input"
            name="password"
            type="password"
            id="password"
            required
          />
        </div>
        <div className="form-register__field">
          <select className="form-register__select" required name="gender">
            <option
              className="form-register__option"
              value="unknown"
              selected=""
            >
              unknown
            </option>
            <option className="form-register__option" value="male">
              male
            </option>
            <option className="form-register__option" value="female">
              female
            </option>
            <option className="form-register__option" value="other">
              other
            </option>
          </select>
        </div>
        <button className="form-register__btn">Submit</button>
      </form>
    </div>
  );
}
