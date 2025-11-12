import React from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="px-[3%] xl:px-[7%] py-[5%] lg:py-[2%]">
        <div className="md:flex md:justify-between md:items-start gap-10">
          <div className="text-center md:text-justify mb-8 md:mb-0 max-w-sm">
            <Link
              to="/"
              className="flex justify-center md:justify-normal items-center gap-3 mb-3"
            >
              <img src={logo} alt="CityFix Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold">
                City<span className="text-primary">Fix</span>
              </span>
            </Link>
            <p className="text-sm opacity-80">
              Empowering citizens to make cleaner, safer, and smarter cities —
              together we fix what matters.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
            <div>
              <h3 className="footer-title mb-3 text-base-content/90 uppercase">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="link link-hover">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/issues" className="link link-hover">
                    All Issues
                  </Link>
                </li>
                <li>
                  <Link to="/volunteer">Become a Volunteer</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="footer-title mb-3 text-base-content/90 uppercase">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="link link-hover"
                  >
                    Tailwind CSS
                  </a>
                </li>
                <li>
                  <a href="https://daisyui.com/" className="link link-hover">
                    DaisyUI
                  </a>
                </li>
                <li>
                  <Link to="#" className="link link-hover">
                    Contact US
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="footer-title mb-3 text-base-content/90 uppercase">
                Community
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/"
                    className="link link-hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.com/"
                    className="link link-hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <Link to="#" className="link link-hover">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="footer-title mb-3 text-base-content/90 uppercase">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="link link-hover">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="link link-hover">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-base-300" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-base-content/70">
          <span>
            © {new Date().getFullYear()}{" "}
            <Link to="/" className="font-semibold hover:text-primary">
              CityFix
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex gap-5">
            <a
              href="https://facebook.com"
              className="hover:text-primary"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com"
              className="hover:text-primary"
              aria-label="Twitter"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://youtube.com"
              className="hover:text-primary"
              aria-label="YouTube"
            >
              <IoLogoYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
