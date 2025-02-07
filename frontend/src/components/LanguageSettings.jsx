import axios from "axios";
import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

function Settings({ authUser }) {
  const [language, setLanguage] = useState("en");
  const [showDropdown, setShowDropdown] = useState(false);
  //   console.log("auth", authUser.user._id);

  const handleChangeLanguage = async (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setShowDropdown(false);
    try {
      await axios.put(`/api/user/updateLanguage/${authUser.user._id}`, {
        language: selectedLanguage
      });
      alert(`Language preference updated to ${selectedLanguage}!`);
    } catch (error) {
      console.error("Failed to update language preference", error);
    }
  };

  return (
    <>
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(10, 10, 10, 0.23) 0px 0px 6px"
        }}
        className="rounded-full  p-1 group relative inline-block"
      >
        <SlOptionsVertical
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-4xl  fill-white"
        />

        {/* Tooltip (Show only if dropdown is not open) */}
        {!showDropdown && (
          <span className="absolute z-10 bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-lg">
            Change Language
          </span>
        )}

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="font-semibold text-left text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
            <ul
              className="absolute mt-2 bg-white shadow-md rounded-lg py-2 w-40 z-10"
              style={{
                bottom: "100%", // Adjust to make sure the dropdown stays above the button
                // left: "50%", // Align to the center horizontally if necessary
                transform: "translate(-10%, -10%)", // Combine X and Y transformations
                marginLeft: "20px" // Margin from the left // Center the dropdown
              }}
            >
              {["en", "hi", "mr"].map((lang) => (
                <li
                  key={lang}
                  onClick={() => handleChangeLanguage(lang)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {lang === "en"
                    ? "English"
                    : lang === "hi"
                    ? "Hindi"
                    : "Marathi"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Settings;

{
  /* <div>
      <h2>Settings</h2>
      <label>Select Preferred Language:</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="mr">Marathi</option>
      </select>
      <button onClick={handleChangeLanguage}>Save</button>
    </div> */
}
