import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon
} from "@heroicons/react/16/solid";
import React, { useContext } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import handleLogout from "../context/logoutHandler";
import { AuthContext } from "../context/AuthProvider";
// import { RiMenu3Fill } from "react-icons/ri";
// import { handleClick } from "../home/left/leftSettings/Logout";

const DropDownMenu = () => {
  const { setAuthUser } = useContext(AuthContext);
  return (
    <div className="pe-4 text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-full py-2 px-2 text-xl/3 font-light text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-300 data-[open]:g-gray-300 data-[focus]:outline-1 data-[focus]:outline-white">
          <SlOptionsVertical />
          {/* <RiMenu3Fill /> */}
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-35 origin-top-right rounded-xl border border-white/5 bg-slate-300
           p-1 text-sm/5 font-semibold text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              {/* <PencilIcon className="size-4 fill-white/30" /> */}
              Edit
              {/* <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">
                ⌘E
              </kbd> */}
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              onClick={() => handleLogout(setAuthUser)}
            >
              {/* <Square2StackIcon className="size-4 fill-white/30" /> */}
              Logout
              {/* <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">
                ⌘D
              </kbd> */}
            </button>
          </MenuItem>
          {/* <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
              Archive
              <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">
                ⌘A
              </kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <TrashIcon className="size-4 fill-white/30" />
              Delete
              <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">
                ⌘D
              </kbd>
            </button>
          </MenuItem> */}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default DropDownMenu;
