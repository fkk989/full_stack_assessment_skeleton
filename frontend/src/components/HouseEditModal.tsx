import { useSelector } from "react-redux";
import { useGetUserByHouse } from "../hooks/user";
import { Modal } from "./Modal";
import React, { ChangeEvent, useEffect, useState } from "react";
import { UpdateHouseUsers } from "../utils/types";
import { RootState } from "../app/store";
import { InputSkeleton } from "./skeletons/InputSkeleton";
import { useUpdateHomeUser } from "../hooks/home";
import toast from "react-hot-toast";

interface DropdownProp {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  street_address: string;
}

export const HouseEditModal: React.FC<DropdownProp> = (prop) => {
  //
  const [selectedUser, setSelectedUser] = useState<{ [key: string]: boolean }>(
    {}
  );

  //getting all users form redux state
  const users = useSelector((state: RootState) => state.user.users);

  // fetching all users related to the street_address
  const { query: homeUserQuery, data: homeUsers } = useGetUserByHouse(
    prop.street_address
  );

  const handleSetSelectedUser = ({
    username,
    checked,
  }: {
    username: string;
    checked: boolean;
  }) => {
    setSelectedUser((crnt) => {
      const updatedState = { ...crnt, [username]: checked };
      return updatedState;
    });
  };
  // setting all checked user false for the first time
  useEffect(() => {
    users?.map(({ username }) => {
      if (selectedUser[username] === undefined) {
        handleSetSelectedUser({ username, checked: false });
      }
    });
  }, [users]);
  // setting all user related to home true
  useEffect(() => {
    homeUsers?.map(({ username }) => {
      handleSetSelectedUser({ username, checked: true });
    });
  }, [homeUsers]);

  //handling input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.currentTarget.name;
    const isChecked = e.currentTarget.checked;

    // check for atleast one user shold be checked
    const selectedUserArr = Object.keys(selectedUser);
    const checkedUserCount = selectedUserArr.filter(
      (username) => selectedUser[username]
    );
    // if user count = 1 and the coming isChekced from input is false show error
    if (checkedUserCount.length === 1 && !isChecked) {
      toast.error("cannot uncheck all users", {
        id: "one-user",
        duration: 2000,
      });
      return;
    }
    handleSetSelectedUser({ username, checked: isChecked });
  };
  //
  const { mutation: HomeUserMutation } = useUpdateHomeUser();
  // refetch on successfull mutation
  useEffect(() => {
    if (HomeUserMutation.isSuccess) {
      homeUserQuery.refetch();
    }
  }, [HomeUserMutation.isSuccess]);
  // handling success for error for mutation
  useEffect(() => {
    // closing modal after successfull mutation and the completion of data refetching
    if (HomeUserMutation.isSuccess && !homeUserQuery.isRefetching) {
      prop.setOpen(false);
    }
  }, [HomeUserMutation.isSuccess, homeUserQuery.isRefetching]);
  //
  return (
    <Modal.Root
      isOpen={prop.open}
      setIsOpen={prop.setOpen}
      className="fixed flex flex-col justify-center  h-[55px] z-[2] "
    >
      <Modal.Content>
        <div className="w-[400px] flex flex-col gap-[10px] bg-white rounded-lg py-[10px] px-[25px]">
          <h3 className="text-[20px] font-[600]">
            Modify Users for: {prop.street_address}
          </h3>

          <div className="flex flex-col gap-[10px]">
            {users?.map(({ username }, index) => {
              return selectedUser[username] !== undefined ? (
                <div
                  key={username}
                  className="flex items-center gap-[10px] cursor-pointer"
                >
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name={username}
                    id={username}
                    // if nullish value set to false
                    checked={selectedUser[username] ?? false}
                    className="cursor-pointer"
                  />
                  <label className="cursor-pointer" htmlFor={username}>
                    {username}
                  </label>
                </div>
              ) : (
                <InputSkeleton key={index} />
              );
            })}
          </div>
          {/* buttons */}
          <div className="w-full flex items-center justify-end gap-[10px]">
            <button
              onClick={() => {
                prop.setOpen(false);
              }}
              className="w-[100px] h-[40px] flex justify-center items-center bg-[#E8E8E8] hover:bg-[#a2a2a2] hover:text-white rounded-md"
            >
              Cancel
            </button>
            {/*  */}
            <button
              onClick={() => {
                const userToUpdate = users.map(({ username }) => {
                  return { username, isChecked: selectedUser[username] };
                });
                const updateObj: UpdateHouseUsers = {
                  users: userToUpdate,
                  street_address: prop.street_address,
                };
                // mutating home
                HomeUserMutation.mutate(updateObj);
              }}
              className="w-[100px] h-[40px] flex justify-center items-center bg-[#3D82F5] hover:bg-[#3d80f5c9] text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
