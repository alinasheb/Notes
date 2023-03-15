import React from "react";
import "./header.css";
import logo from "../../images/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__row">
          <div className="header__col-12 p-3 mb-3 bg-info">
            <h1 className="text-center text-secondary">
              <img className="header__logo" src={logo} alt="Логотип"></img>
              Notes
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
