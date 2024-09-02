import React, { useState } from "react";
import { House } from "../utils/types";
import { HouseEditModal } from "./HouseEditModal";

export const HouseCard: React.FC<House> = (prop) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <HouseEditModal
          open={open}
          setOpen={setOpen}
          street_address={prop.street_address}
        />
      )}

      <div className="flex flex-col gap-[10px] p-[10px] bg-white rounded-lg custom-shadow">
        <h2 className="text-[22px] font-bold">{prop.street_address}</h2>
        <ul className="flex flex-col gap-[5px]">
          <li>List price: ${prop.list_price}</li>
          <li>State: {prop.state}</li>
          <li>Zip: {prop.zip}</li>
          <li>Sqft: {prop.sqft}</li>
          <li>Beds: {prop.beds}</li>
          <li>Baths: {prop.baths}</li>
        </ul>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="w-[100px] h-[40px] flex items-center justify-center text-white font-bold bg-[#3D82F5] hover:bg-[#3d80f5c9] rounded-md"
        >
          Edit Users
        </button>
      </div>
    </>
  );
};
