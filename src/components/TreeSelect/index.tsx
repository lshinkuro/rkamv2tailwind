import { Input, Transition } from "@windmill/react-ui";
import React, { useState } from "react";
import { DropdownIcon } from "../../icons";
import { TreeDropdown1 } from "./TreeDropdown1";

export const TreeSelect = ({ data, getValue, defaultValue, placeholder, radioVal }: any) => {
  const [isDropdownTreeOpen, setIsDropdownTreeOpen] = useState(false);
  function handleDropdownMenuClick() {
    setIsDropdownTreeOpen(!isDropdownTreeOpen);
  }

  return (
    <li className="relative mt-1 w-full list-none">
      <button
        className="bg-gray-200 rounded-sm inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 focus:outline-none focus:shadow-none hover:text-gray-800 dark:hover:text-gray-200"
        onClick={handleDropdownMenuClick}
        aria-haspopup="true"
      >
        <span className="inline-flex items-center w-full">
          <Input
            className="w-full"
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
          {/* <span className="ml-4">Kode Komponen Biaya</span> */}
        </span>
        <DropdownIcon className="w-4 h-4" aria-hidden="true" />
      </button>
      <Transition
        show={isDropdownTreeOpen}
        enter="transition-all ease-in-out duration-300"
        enterFrom="opacity-25 max-h-0"
        enterTo="opacity-100"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 max-h-0"
      >
        <ul
          className="absolute w-full p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900 z-50 max-h-56 overflow-y-scroll"
          aria-label="submenu"
        >
          {data.map((data: any) =>
            data.child || data.list_jenis_belanja ? (
              <TreeDropdown1 children={data} getValue={getValue} radioVal={radioVal} />
            ) : (
              <li
                className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                key={data.kode}
              >
                <span className="w-full">
                  {data.kode} {data.nama}
                </span>
              </li>
            )
          )}
        </ul>
      </Transition>
    </li>
  );
};
