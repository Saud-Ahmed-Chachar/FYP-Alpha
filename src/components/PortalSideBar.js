import React, { useState } from "react";
import { Badge, Sidebar } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
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
    <div>
     {/* Header */}
     <header className="flex items-center justify-between bg-white py-4 px-6">
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
            <button className="flex items-center focus:outline-none" onClick={toggleDropdown}> {/* Add onClick event to toggle dropdown */}
             
              <div className="mr-3 ">
                <h1>John Doe</h1>
              </div>
              <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
            </button>
            {/* Dropdown menu */}
            <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 ${isDropdownOpen ? '' : 'hidden'}`}> {/* Add dynamic class based on dropdown visibility */}
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white flex items-center"
              >
                <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white flex items-center"
              >
                <FontAwesomeIcon icon={faCog} className="text-gray-500 mr-2" />
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white flex items-center"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-500 mr-2" />
                Sign out
              </a>
            </div>
          </div>
        </div>
      </header>
    <div className={`flex h-screen  ${isOpen ? 'flex-row' : 'flex-col'}`}>
      {/* Sidebar */}
      {isOpen && (
        <Sidebar aria-label="Sidebar with call to action button example" className="w-64 bg-gray-200">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={HiHome}
                className="group hover:bg-indigo-500 hover:text-white"
              >
                Home
              </Sidebar.Item>
              <Sidebar.Item
                href="/profile"
                icon={HiUser}
                className="group hover:bg-indigo-500 hover:text-white"
              >
               Profile
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiViewBoards}
                className="group hover:bg-indigo-500 hover:text-white"
              >
                Applications
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiStatusOnline}
                className="group hover:bg-indigo-500 hover:text-white"
              >
                Status
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiOfficeBuilding}
                className="group hover:bg-indigo-500 hover:text-white"
              >
                Universities
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiArrowSmRight}
                className="group hover:bg-indigo-500 hover:text-white"
              >
                Scholarships
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiTable}
                className="group hover:bg-indigo-500 hover:text-white"
              >
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
              Preview the new Flowbite dashboard navigation! You can turn the new
              navigation off for a limited time in your profile.
            </div>
            <a
              className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300"
              href="#"
            >
              Turn new navigation off
            </a>
          </Sidebar.CTA>
        </Sidebar>
      )}

      {/* Right column */}
      <div className="flex-1 flex ">
        <UserProfile/>
      </div>

      {/* <UserProfile/> */}
    </div>
    </div>
  );
}

export default PortalSideBar;
