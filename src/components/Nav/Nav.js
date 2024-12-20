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


      <nav className="bg-gray-50 border-gray-200 dark:bg-gray-900 shadow-sm">

        <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={instaImage} className="h-8" alt="Flowbite Logo"/>
            <span
                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Instagrampro.ai</span>
          </Link>
          <div className="flex flex-col md:order-2 space-x-2.5 md:space-x-2 rtl:space-x-reverse">
            <div className={"relative"}>
            <button id={"idk"} onClick={handleMouseEnter}
                    type="button" data-dropdown-toggle="language-dropdown-menu" className="relative inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                {user != null ? user.username : "Login"}
            </button>
            <div onMouseLeave={handleMouseEnter} className={`w-170px p-4 absolute z-50 ${isDropdownOpen ? "" : "hidden"} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 p-4 mt-10 top-6 right-10`} id="language-dropdown-menu">
              <ul className="py-2 font-medium" role="none">
                <div >
                  <Link to="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Upload File
                  </Link>
                </div>
                <div >
                  <Link to="/browse-files"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Browse Files
                  </Link>
                </div>
                <div >
                  <Link to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Profile
                  </Link>
                </div>
                <li className={"mt-2"}>
                  <div >
                    <Link to="/login"
                          onClick={() => context.logOut()}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                      out</Link>
                  </div>
                </li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </nav>
      /*
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className={"max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"}>
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={instaImage} className="h-8" alt="Flowbite Logo"/>
            <span
                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Instagrampro.ai</span>
          </Link>

        <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
          <button  onClick={handleMouseEnter} type="button" data-dropdown-toggle="language-dropdown-menu" className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            English (US)
          </button>
          <div>
            <button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar"
                    className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                    onClick={handleMouseEnter}
                    type="button">
              {user != null ? user.username : "Login"}</button>
            <div id="dropdownAvatar"
                 onMouseEnter={() => setIsDropdownOpen(true)}
                 onMouseLeave={() => setIsDropdownOpen(false)}
                 className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 ${isDropdownOpen && user != null ? "" : "hidden"}`}>
              <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
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
      */
  )}

export default Nav;