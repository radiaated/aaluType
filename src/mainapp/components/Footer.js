import React from "react";

const Footer = () => {
  return (
    <footer className="container flex-box">
      <div className="footer-name">
        AaluType &copy; {new Date().getFullYear()}
      </div>
      <div>|</div>

      <div>
        <a
          href="https://github.com/SumanBeRadiated/aaluType"
          className="footer-link"
          target="_blank"
        >
          <ion-icon name="logo-github"></ion-icon> Github
        </a>
      </div>
    </footer>
  );
};

export default Footer;
