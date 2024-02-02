export default function Header({ children }) {
  return (
    <>
      <header className="header">
        <h1 className="header__logo">
          <a href="#/">
            Booking<span className="header__app">App</span>
          </a>
        </h1>
        <div className="header__menu">
          <i className="bx bx-menu"></i>
        </div>
        <nav className="header__nav nav__close">
          <ul className="header__list">
            <li className="header__item">
              <a href="#/reservation">Reservation</a>
            </li>
            <li className="header__item">
              <a href="#/register">Register</a>
            </li>
            <li className="header__item">
              <a href="#/login">Login</a>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </>
  );
}
