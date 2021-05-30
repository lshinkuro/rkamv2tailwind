import React, { useState } from "react";
import { NavLink, Route } from "react-router-dom";
import { DropdownIcon } from "../../icons";
import * as Icons from "../../icons";
import { Transition } from "@windmill/react-ui";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarSubmenu({ route }) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  function handleDropdownMenuClick() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  }

  return (
    <li className="relative px-6 py-3" key={route.name}>
      <button
        className="inline-flex items-center justify-between w-full text-md  duration-150 active:text-gray-900 focus:outline-none focus:shadow-none hover:text-gray-900 dark:hover:text-gray-200"
        onClick={handleDropdownMenuClick}
        aria-haspopup="true"
      >
        <span className="inline-flex items-center">
          <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon}  
                    stroke="#2ca2ce" fill="none" />
          <span className="ml-4 text-gray-600">{route.name}</span>
        </span>
        <DropdownIcon className="w-4 h-4" aria-hidden="true" />
      </button>
      <Transition
        show={isDropdownMenuOpen}
        enter="transition-all ease-in-out duration-100 "
        enterFrom="opacity-25 max-h-0"
        enterTo="opacity-100 max-h-xl"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100 max-h-xl"
        leaveTo="opacity-0 max-h-0"
      >
        <ul
          className="p-1 mt-1  space-y-2  text-sm  focus:overflow-hidden text-gray-800  dark:text-gray-400 dark:bg-gray-900"
          aria-label="submenu"
        >
          {route.routes.map((r) => (
            r.routes ? (
              <SidebarSubmenu2 route={r} key={r.name} />
            ) : (
              <li
                className="relative px-1 py-1  duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                key={r.name}
              >
                <NavLink
                  exact
                  to={r.path}
                  className="inline-flex items-center w-full text-xs transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  activeClassName="text-gray-800 dark:text-gray-100"
                >
                  <Route path={r.path} exact={r.exact}>
                    <span
                      className="absolute inset-y-0 left-0 w-1 bg-yellow-300 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  </Route>
                  {r.icon ? (
                    <Icon
                      className="w-4 h-4 ml-1 absolute"
                      aria-hidden="true"
                      icon={r.icon}
                    />
                  ) : (
                    ""
                  )}
                  <span className="ml-6 absolute">{r.name}</span>
                </NavLink>
              </li>)
          ))}
        </ul>
      </Transition>
    </li>
  );
}

function SidebarSubmenu2({ route }) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  function handleDropdownMenuClick() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  }

  return (
    <li className="relative px-1 py-1  duration-150 hover:text-gray-800 dark:hover:text-gray-200" key={route.name}>
      <button
        className="relative inline-flex justify-between w-full text-xs duration-150 active:text-gray-900 focus:outline-none focus:shadow-none hover:text-gray-900 dark:hover:text-gray-200"
        onClick={handleDropdownMenuClick}
        aria-haspopup="true"
      >
        <span className="inline-flex text-left items-baseline">
          {
            route.icon ? (
              <Icon className="absolute w-4 h-4" aria-hidden="true" icon={route.icon} fill="#1766ad"
                stroke="#1766ad" />
            ) : ''
          }
          <span className="absolute ml-5">{route.name}</span>
        </span>
        <DropdownIcon className="w-4 h-4" aria-hidden="true" />
      </button>
      <Transition
        show={isDropdownMenuOpen}
        enter="transition-all ease-in-out duration-100 "
        enterFrom="opacity-25 max-h-0"
        enterTo="opacity-100 max-h-xl"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100 max-h-xl"
        leaveTo="opacity-0 max-h-0"
      >
        <ul
          className="p-1 mt-3  space-y-2  text-sm  focus:overflow-hidden text-gray-800  dark:text-gray-400 dark:bg-gray-900"
          aria-label="submenu"
        >
          {route.routes.map((r) => (
            <li
              className="relative px-1 py-1  duration-150 hover:text-gray-900 dark:hover:text-gray-200"
              key={r.name}
            >
              <NavLink
                exact
                to={r.path}
                className="relative inline-flex items-center w-full text-xs transition-colors duration-150 hover:text-gray-900 dark:hover:text-gray-200"
                activeClassName="text-gray-900 dark:text-gray-100"
              >
                <Route path={r.path} exact={r.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-yellow-300 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                {r.icon ? (
                  <Icon
                    fill="#1766ad"
                    stroke="#1766ad"
                    className="w-4 h-4 ml-1 absolute"
                    aria-hidden="true"
                    icon={r.icon}
                  />
                ) : (
                  ""
                )}
                <span className="ml-6 absolute">{r.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </Transition>
    </li>
  );
}

export default SidebarSubmenu;
