// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { SlOptionsVertical } from "react-icons/sl";
// import React, { useContext, useState } from "react";
// import handleLogout from "../context/logoutHandler";
// import { AuthContext } from "../context/AuthProvider";
// import ConfirmLogoutModal from "./ConfirmLogoutModal";

// const DropDownMenu = () => {
//   const { setAuthUser } = useContext(AuthContext);
//   const [showModal, setShowModal] = useState(false);

//   const handleConfirmLogout = () => {
//     handleLogout(setAuthUser);
//     setShowModal(false);
//   };

//   return (
//     <div className="pe-4 text-right">
//       <Menu>
//         <MenuButton className="inline-flex items-center gap-2 rounded-full py-2 px-2 text-xl/3 font-light text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-300 data-[open]:g-gray-300 data-[focus]:outline-1 data-[focus]:outline-white">
//           <SlOptionsVertical />
//         </MenuButton>

//         <MenuItems
//           transition
//           anchor="bottom end"
//           className="w-35 origin-top-right rounded-xl border border-white/5 bg-slate-300
//            p-1 text-sm/5 font-semibold text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
//         >
//           <MenuItem>
//             <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
//               Edit
//             </button>
//           </MenuItem>
//           <MenuItem>
//             <button
//               className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
//               onClick={() => setShowModal(true)}
//             >
//               Logout
//             </button>
//           </MenuItem>
//         </MenuItems>
//       </Menu>

//       <ConfirmLogoutModal
//         isOpen={showModal}
//         onConfirm={handleConfirmLogout}
//         onCancel={() => setShowModal(false)}
//       />
//     </div>
//   );
// };

// export default DropDownMenu;

import { AuthContext } from "../context/AuthProvider";
import handleLogout from "../context/logoutHandler";
import ConfirmLogoutModal from "./ConfirmLogoutModal";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";

const DropDownMenu = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    authUser?.language || "en"
  );
  const [showConfirmLanguageModal, setShowConfirmLanguageModal] =
    useState(false);
  const [pendingLanguage, setPendingLanguage] = useState(null); // Store language temporarily

  const languageMap = {
    en: "English",
    hi: "Hindi",
    mr: "Marathi"
  };

  const handleConfirmLogout = () => {
    handleLogout(setAuthUser);
    setShowModal(false);
  };

  const handleChangeLanguage = async () => {
    if (!pendingLanguage) return;

    setSelectedLanguage(pendingLanguage);
    setShowConfirmLanguageModal(false);
    setShowLanguageDropdown(false);

    try {
      await axios.put(`/api/user/updateLanguage/${authUser.user._id}`, {
        language: pendingLanguage
      });

      setAuthUser((prevUser) => ({
        ...prevUser,
        language: pendingLanguage
      }));

      alert(`Language preference updated to ${languageMap[pendingLanguage]}!`);
    } catch (error) {
      console.error("Failed to update language preference", error);
      alert("Failed to update language preference. Please try again.");
    }
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
          className="w-40 origin-top-right rounded-xl border border-white/5 bg-slate-300 p-1 text-sm font-semibold text-black transition duration-100 ease-out focus:outline-none"
        >
          {!showLanguageDropdown ? (
            <>
              <MenuItem as="div">
                <div
                  className="group cursor-pointer flex w-full items-center justify-between gap-2 rounded-lg py-2 px-3 hover:bg-gray-400"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowLanguageDropdown(true);
                  }}
                >
                  Change Language{" "}
                  <p className="text-gray-700">
                    ({languageMap[selectedLanguage]})
                  </p>
                </div>
              </MenuItem>
              <MenuItem as="div">
                <div
                  className="group cursor-pointer flex w-full items-center justify-between gap-2 rounded-lg py-2 px-3 hover:bg-gray-400"
                  onClick={() => setShowModal(true)}
                >
                  Logout
                </div>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem as="div">
                <div className="group flex w-full items-center justify-between gap-2 text-xl">
                  <div className="hover:bg-gray-400 rounded-full py-1 px-1 cursor-pointer">
                    <MdArrowBack
                      onClick={(e) => {
                        e.preventDefault();
                        setShowLanguageDropdown(false);
                      }}
                    />
                  </div>
                </div>
              </MenuItem>

              {/* Language Options with Confirmation */}
              <ul className="flex flex-col gap-1 ps-0 p-1">
                {["en", "hi", "mr"].map((lang) => (
                  <li
                    key={lang}
                    onClick={() => {
                      setPendingLanguage(lang); // Store selected language
                      setShowConfirmLanguageModal(true); // Show confirmation modal
                    }}
                    className={`px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-400 ${
                      selectedLanguage === lang ? "bg-gray-500 text-white" : ""
                    }`}
                  >
                    {languageMap[lang]}
                  </li>
                ))}
              </ul>
            </>
          )}
        </MenuItems>
      </Menu>

      {/* Logout Confirmation Modal */}
      <ConfirmLogoutModal
        isOpen={showModal}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowModal(false)}
      />

      {/* Language Change Confirmation Modal */}
      {showConfirmLanguageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg text-gray-700 font-semibold">
              Are you sure you want to change the language to {languageMap[pendingLanguage]}?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={handleChangeLanguage}
              >
                Yes, Change
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => setShowConfirmLanguageModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
