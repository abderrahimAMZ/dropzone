import { Link } from 'react-router-dom';

import Container from '../Container';

import instaImage from "../../icons8-instagram-48.png";
import {useAuth} from "../../hooks/AuthProvider";
import dropDownProfile from "../dropDownProfile";
import login from "../../pages/Login";
import {useState} from "react";
import {navigate} from "wouter/use-hash-location";
const Nav = () => {
  const context = useAuth();
  const user = context.user;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    if (user == null) {
      navigate("/login");
    }
    else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  }

  return (


      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className={"max-w-screen-xl flex flex-wrap justify-between mx-auto pt-4 pb-4"}>

        <div className={"pt-2 "}>
          <a href="#" className="flex  rtl:space-x-reverse">
            <img src={instaImage} className="h-8" alt="Flowbite Logo"/>
            <span
                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">InstagramPro.ai</span>
          </a>

        </div>
        <div className="pt-2">
          <button data-collapse-toggle="navbar-multi-level" type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-multi-level" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div>
            <button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar"
                    onClick={handleMouseEnter}
                    onMouseLeave={() => setTimeout(() => setIsDropdownOpen(false), 2000)}


                    className="flex text-sm md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    type="button">
              {user != null ? user.username : "Login"}</button>
            <div id="dropdownAvatar"
                 className={`z-10 bg-white divide-y mt-8 ${isDropdownOpen && user != null ? "" : "hidden"} divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="font-medium truncate">{user != null ? user.email : ""}</div>
              </div>
              <div className="py-2">
                <Link to=""
                   onClick={() => context.logOut()}
                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                  out</Link>
              </div>
            </div>
          </div>

        </div>
        </div>
      </nav>

  )
}

export default Nav;