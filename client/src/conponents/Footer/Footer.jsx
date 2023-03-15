import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <header className="footer">
      <div className="footer__container">
        <div className="footer__row">
          <div className="footer__col-12 p-3 mb-0">
            <h3 className="text-center text-secondary font-monospace fs-5">
              © 2023 Alina Shebalkina
            </h3>
          </div>
          <div className="footer__col-12 p-0 mb-1 text-center">
            <a
              href="https://github.com/alinasheb"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-secondary"
            >
              <i className="icon-github"></i>
            </a>
            <a
              href="mailto:farmazonka1994@yandex.ru"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-secondary"
            >
              <i className="icon-email"></i>
            </a>
            <a
              href="https://t.me/AlinaSheb"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-secondary"
            >
              <i className="icon-telegram"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Footer;
