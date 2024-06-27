const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__social-bar bg-milkWhite border-t py-2 border-solid border-snowWhite">
        <div className="common flex justify-between items-center">
          <div className="footer__social-text text-xs xs:text-sm">
            Get Connect with us on social network:
          </div>
          <ul className="footer__social-list flex gap-x-5">
            <li>
              <a href="#" className="footer__social-link">
                <img
                  className="footer__social-icon"
                  src="/icons/facebook.svg"
                  alt="Facebook"
                />
              </a>
            </li>
            <li>
              <a href="#" className="footer__social-link">
                <img
                  className="footer__social-icon"
                  src="/icons/twitter-logo-icon.svg"
                  alt="Twitter"
                />
              </a>
            </li>
            <li>
              <a href="#" className="footer__social-link">
                <img
                  className="footer__social-icon"
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                />
              </a>
            </li>
            <li>
              <a href="#" className="footer__social-link">
                <img
                  className="footer__social-icon size-5"
                  src="/icons/instagram.svg"
                  alt="Instagram"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__main bg-black py-10">
        <div className="common grid grid-cols-1 gap-y-3 xs:grid-cols-2  sm:grid-cols-4 sm:gap-y-0 gap-x-10">
          <div className="footer__section">
            <h3 className="footer__section-title">Company Name</h3>
            <p className="footer__section-content text-white text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
              voluptate. Ex neque quaerat adipisci sunt, corporis molestias! Ut,
              nesciunt fugiat praesentium omnis, quisquam fuga laudantium sunt
              suscipit nihil placeat quia.
            </p>
          </div>

          <div className="footer__section">
            <h3 className="footer__section-title">Label Me</h3>
            <ul className="footer__section-list">
              <li>
                <a href="#" className="footer__section-link">
                  Link One
                </a>
              </li>
              <li>
                <a href="#" className="footer__section-link">
                  Link Two
                </a>
              </li>
              <li>
                <a href="#" className="footer__section-link">
                  Link Three
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <h3 className="footer__section-title">Label Me</h3>
            <ul className="footer__section-list">
              <li>
                <a href="#" className="footer__section-link">
                  Link One
                </a>
              </li>
              <li>
                <a href="#" className="footer__section-link">
                  Link Two
                </a>
              </li>
              <li>
                <a href="#" className="footer__section-link">
                  Link Three
                </a>
              </li>
              <li>
                <a href="#" className="footer__section-link">
                  Link Two
                </a>
              </li>
              <li>
                <a href="#" className="footer__section-link">
                  Link Three
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__section">
            <h3 className="footer__section-title">Contact Us</h3>
            <ul className="footer__section-list">
              <li className="flex items-center gap-x-2 text-sm text-white">
                <img
                  className="size-5"
                  src="/icons/home.svg"
                  alt="home"
                />
                <span>1234 Elm Street, Anytown, USA</span>
              </li>
              <li className="flex items-center gap-x-2 text-sm text-white">
                <img
                  className="size-5"
                  src="/icons/email.svg"
                  alt="email"
                />
                <span>john.doe@example.com</span>
              </li>
              <li className="flex items-center gap-x-2 text-sm text-white">
                <img
                  className="size-5"
                  src="/icons/phone.svg"
                  alt="phone"
                />
                <span>555-123-4567 </span>
              </li>
              <li className="flex items-center gap-x-2 text-sm text-white">
                <img className="size-5" src="/icons/fax.svg" alt="fax" />
                <span>555-987-6543</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom-bar bg-milkWhite border-t py-2 border-solid border-snowWhite">
        <div className="common text-center">
          <p className="footer__bottom-text text-sm">
            About<strong className="ml-2">CountryX</strong> | all &copy; rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
