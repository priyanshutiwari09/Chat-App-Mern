import React from "react";
import { IoSearchOutline } from "react-icons/io5";

function UserSearch(){

  return (
    <div className="flex px-4 pt-4 gap-2 items-center mb-5">
        <input type="text" placeholder="Search"
        style={{boxShadow: 'rgba(0, 0, 0, 0.5) 0px 5px 10px 0px inset',
        }}
        //box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px 0px inset;
        className="input input-bordered w-full bg-transparent rounded-3xl" />
        <button>
            <IoSearchOutline  className="text-4xl"/>
        </button>
    </div>
  )
}

export default UserSearch;