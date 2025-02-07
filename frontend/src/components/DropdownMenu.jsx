import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { SlOptionsVertical } from "react-icons/sl";
import React, { useContext, useState } from "react";
import handleLogout from "../context/logoutHandler";
import { AuthContext } from "../context/AuthProvider";
import ConfirmLogoutModal from "./ConfirmLogoutModal";

const DropDownMenu = () => {
  const { setAuthUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  

  const handleConfirmLogout = () => {
    handleLogout(setAuthUser);
    setShowModal(false);
  };

  return (
    <div className="pe-4 text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-full py-2 px-2 text-xl/3 font-light text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-300 data-[open]:g-gray-300 data-[focus]:outline-1 data-[focus]:outline-white">
          <SlOptionsVertical />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-35 origin-top-right rounded-xl border border-white/5 bg-slate-300
           p-1 text-sm/5 font-semibold text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Edit
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              onClick={() => setShowModal(true)}
            >
              Logout
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      <ConfirmLogoutModal
        isOpen={showModal}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default DropDownMenu;
