import { Input, Label, Transition } from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import { DropdownIcon } from "../../icons";
import { TreeDropdown2 } from "./TreeDropdown2";

export const TreeDropdown1 = ({ children, getValue, radioVal }: any) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const handleChecked = (val: any) => {
    let gas: boolean = false;
    if (radioVal) {
      radioVal.map((e) => {
        if (e === val) {
          gas = true;
        }
      });
    }
    return gas;
  };

  function handleDropdownMenuClick() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  }

  return (
    <li
      className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
      key={children.nama}
    >
      <button
        className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 focus:outline-none focus:shadow-none hover:text-gray-800"
        onClick={handleDropdownMenuClick}
        aria-haspopup="true"
      >
        <span className="inline-flex items-center">
          {/* <Icon className="w-5 h-5" aria-hidden="true" icon={child.icon} /> */}
          <span>
            {children.kode} {children.nama}
          </span>
        </span>
        <DropdownIcon className="w-4 h-4" aria-hidden="true" />
      </button>
      <Transition
        show={isDropdownMenuOpen}
        enter="transition-all ease-in-out duration-300"
        enterFrom="opacity-25 max-h-0"
        enterTo="opacity-100 max-h-xl"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100 max-h-xl"
        leaveTo="opacity-0 max-h-0"
      >
        <ul
          className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
          aria-label="submenu"
        >
          {children.list_jenis_belanja
            ? children.list_jenis_belanja.map((data: any) => {
                const res = handleChecked(data.kode);
                return (
                  <li
                    className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
                    key={data.nama}
                  >
                    <Label check>
                      <Input
                        type="checkbox"
                        defaultChecked={res}
                        onChange={() => {
                          getValue({
                            show: data.kode,
                            value: data.kode,
                          });
                        }}
                      />{" "}
                      <span>
                        &nbsp;
                        {data.kode} {data.nama}
                      </span>
                    </Label>
                  </li>
                );
              })
            : children.child.map((dump: any) =>
                dump.child && dump.child.length > 0 ? (
                  <TreeDropdown2 children={dump} getValue={getValue} />
                ) : (
                  <li
                    className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    key={dump.nama}
                    onClick={() =>
                      getValue({
                        show: dump.kode,
                        value: dump.kode,
                      })
                    }
                  >
                    <span className="w-full">
                      {dump.kode} {dump.nama}
                    </span>
                  </li>
                )
              )}
        </ul>
      </Transition>
    </li>
  );
};
