import { DropdownMenu } from "./Dropdown";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ArrowDown } from "./icons/ArrowDown";
import { clsx } from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { setSelectedUser } from "../features/user";
import Check from "./icons/Check";
import { setHome } from "../features/house";
//
interface UserDropDownProp {
  setPage: Dispatch<SetStateAction<number>>;
}
//
const listStyle = `group relative w-full flex justify-center  items-center gap-[10px] rounded-lg hover:bg-[#44A1FF] hover:text-white cursor-pointer`;
//
export const UserDropDown: React.FC<UserDropDownProp> = ({ setPage }) => {
  //
  const [open, setOpen] = useState(false);
  const { users, selectedUser } = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();
  //
  return (
    <DropdownMenu.Root
      isOpen={open}
      setIsOpen={setOpen}
      className="flex items-center gap-[10px] justify-center"
    >
      <div>Selected User:</div>
      <div className=" flex flex-col items-center gap-[5px]">
        {/* trigger */}
        <DropdownMenu.Trigger>
          <div className="w-[100px] h-[40px] flex items-center justify-between border-purple-800 border-[1px] hover:bg-[#EBE9DF] rounded-lg box-border px-[10px]">
            <div>{open ? "" : selectedUser ? selectedUser : "None"}</div>
            <ArrowDown
              className={clsx(
                "w-[20px] h-[20px] rotate-0 transition-all duration-300 ease-out",
                open && "rotate-[-180deg]"
              )}
            />
          </div>
        </DropdownMenu.Trigger>

        {/* content */}
        <DropdownMenu.Content className="absolute top-[70px]">
          <ul className=" w-[100px]  flex flex-col items-center gap-[10px] bg-[#E8E8E8] py-[10px] px-[5px] rounded-md overflow-scroll">
            {open && (
              <li
                onClick={() => {
                  dispatch(setSelectedUser(""));
                  dispatch(setHome([]));
                  setPage(1);
                  setOpen(false);
                }}
                className={clsx(listStyle, !selectedUser && " text-[#969393]")}
              >
                {!selectedUser && (
                  <Check className="absolute left-[5px] group-hover:text-white w-[15px] h-[15px] text-[#969393]" />
                )}
                None
              </li>
            )}{" "}
            {users.map(({ username }) => {
              return (
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    // scrolling back to top
                    document.documentElement.scrollTop = 0;
                    setPage(1);
                    dispatch(setSelectedUser(username));
                    setOpen(false);
                  }}
                  key={username}
                  className={clsx(
                    listStyle,
                    selectedUser === username && "text-[#969393]"
                  )}
                >
                  {selectedUser === username && (
                    <Check className="absolute left-[5px] group-hover:text-white w-[15px] h-[15px] text-[#969393]" />
                  )}
                  {username}
                </li>
              );
            })}
          </ul>
        </DropdownMenu.Content>
      </div>
    </DropdownMenu.Root>
  );
};
