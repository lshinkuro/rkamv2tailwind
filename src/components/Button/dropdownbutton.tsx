import React from "react";
import { Button, Dropdown, DropdownItem } from '@windmill/react-ui'

type ButtonProps = {
  isOpen: boolean;
  toggleDropDown: Function;
  onClick: Function;
};

const index: React.FC<ButtonProps> = ({ isOpen, toggleDropDown, onClick, ...rest }) => {
  return (
    <>
      <Button className="z-0" onClick={() => { toggleDropDown(isOpen) }} aria-haspopup="true">
        Aksi
      </Button>
      <Dropdown className="z-10" isOpen={isOpen} onClose={() => toggleDropDown(isOpen)}>
        <DropdownItem tag="a" href="#" className="justify-between z-10" onClick={() => { onClick() }}>
          <span>Cairkan</span>
        </DropdownItem>
      </Dropdown>
    </>
  );

};

export default index;