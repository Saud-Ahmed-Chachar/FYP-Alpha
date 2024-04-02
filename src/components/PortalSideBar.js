import React, { useState } from "react";
import { Badge, Sidebar } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';
import profile from "../assets/images/profile.jpg";
import {
  HiArrowSmRight,
  HiHome,
  HiStatusOnline,
  HiOfficeBuilding,
  HiTable,
  HiUser,
  HiViewBoards,
  HiDatabase,
} from "react-icons/hi";
import UserProfile from "./UserProfile";
import AppliedApplications from "./PortalComponents/AppliedApplications";

function PortalSideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      {isOpen && (
        <div className="bg-gray-200 w-64 h-screen fixed overflow-y-auto" style={{ background: 'linear-gradient(to right, rgb(36, 18, 101) 0%, rgb(0, 130, 203) 100%)', color: 'white', boxSizing: 'border-box' }}>
          <Sidebar aria-label="Sidebar with call to action button example">
            <div className="flex items-center justify-center mt-6 mb-4">
              {/* Profile image */}
              <img className="w-20 h-20 rounded-full" src={profile} alt="profile" />
            </div>
            {/* Profile name */}
            <div className="text-center mb-4">
              <h1 className="text-lg font-semibold">Ameer Ali</h1>
            </div>
            <Sidebar.Items className="text-white">
              <Sidebar.ItemGroup>
                {/* <Link to={"/portal/home"}>
                  <Sidebar.Item icon={HiHome} className="group text-white hover:bg-indigo-500 hover:text-white" activeClassName="text-white">
                    Home
                  </Sidebar.Item>
                </Link> */}
                <Link to={"/portal/"}>
                  <Sidebar.Item href="/profile" icon={HiUser} className="group text-white hover:bg-indigo-500 hover:text-white" activeClassName="text-white">
                    Profile
                  </Sidebar.Item>
                </Link>
                <Link to={"/portal/myApplication"}>
                  <Sidebar.Item icon={HiViewBoards} className="group text-white hover:bg-indigo-500 hover:text-white" activeClassName="text-white">
                    Applied Applications
                  </Sidebar.Item>
                </Link>
                
                <Sidebar.Item href="/portal/university" icon={HiOfficeBuilding} className="group  text-white hover:bg-indigo-500 hover:text-white" activeClassName="text-white">
                  Universities
                </Sidebar.Item>
                <Sidebar.Item href="/portal/scholarships" icon={HiArrowSmRight} className="group text-white hover:bg-indigo-500 hover:text-white" activeClassName="text-white">
                  Scholarships
                </Sidebar.Item>
                <Sidebar.Item href="/portal/admissions" icon={HiTable} className="group text-white hover:bg-indigo-500 hover:text-white" activeClassName="text-white">
                  Admissions
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
            <Sidebar.CTA>
              <div className="mb-3 flex items-center">
                <Badge color="warning">Beta</Badge>
                <button
                  aria-label="Close"
                  className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-gray-100 p-1 text-cyan-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                  type="button"
                  onClick={handleClose}
                >
                  <svg
                    aria-hidden
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="mb-3 text-sm text-cyan-900 dark:text-gray-400">
                Preview the new dashboard navigation! You can turn the new
                navigation off for a limited time in your profile.
              </div>
            </Sidebar.CTA>
          </Sidebar>
        </div>
      )}
      <div className="flex-grow ml-64">
        {/* Header */}
        <header className="bg-white py-4 px-6 w-full z-50">
          <div className="flex items-center justify-between container mx-auto">
            <div className="flex items-center">
              <div className="mr-4">
                {/* Your logo component or image */}
                <img className="w-12 md:w-auto" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/centre_aligned_simple-Svg1.svg" alt="logo" />
              </div>
              <h1 className="text-lg font-semibold text-gray-800">University Recommendation</h1>
            </div>
            <div className="flex items-center">
              {/* Profile dropdown */}
              <div className="relative ml-4">
                <button className="flex items-center focus:outline-none" onClick={toggleDropdown}>
                  {/* Add onClick event to toggle dropdown */}
                  <div className="mr-3 ">
                    <h1>Ameer Ali</h1>
                  </div>
                  <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
                </button>
                {/* Dropdown menu */}
                <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 ${isDropdownOpen ? '' : 'hidden'}`}> {/* Add dynamic class based on dropdown visibility */}
                  <Link to={"/portal"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white flex items-center">
                    <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
                    Profile
                  </Link>
                  <Link to={"/"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white flex items-center">
                    <FontAwesomeIcon icon={faCog} className="text-gray-500 mr-2" />
                    Settings
                  </Link>
                  <Link to={"/login"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white flex items-center">
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-500 mr-2" />
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PortalSideBar;
