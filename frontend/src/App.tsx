import "./App.css";
import { useState } from "react";
import { UserDropDown } from "./components/UserDropDown";
import { useSetUser } from "./hooks/user";
import { useSelector } from "react-redux";

import { RootState } from "./app/store";
import { useSetHomesByUser } from "./hooks/home";
import { HouseCard } from "./components/HouseCard";
import { Observer } from "./components/Observer";

function App() {
  //
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  // getting selected user
  const selectedUser = useSelector(
    (state: RootState) => state.user.selectedUser
  );
  // setting home by selected user
  useSetHomesByUser({
    username: selectedUser,
    page,
    setPage,
    limit,
  });

  // setting users for the first time username is changed
  useSetUser();
  //getting house for the selected user
  const houses = useSelector((state: RootState) => state.house.houses);
  //

  return (
    <div className="w-screen flex flex-col gap-[20px] px-[25px] py-[10px]">
      {/* user dropdown */}
      <div className="sticky top-0 w-full h-[70px] flex items-center justify-end bg-white">
        <UserDropDown setPage={setPage} />
      </div>
      {houses.length !== 0 ? (
        <>
          <div className="w-full overflow-scroll home-card-container pt-[30] pb-[30px] px-[10px]">
            {houses.map((houseData, index) => {
              return <HouseCard key={index} {...houseData} />;
            })}
          </div>
          {/* whenever the observer comes into view it add's new house to the houseSlice */}
          <Observer
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            username={selectedUser}
          />
        </>
      ) : (
        <div className="w-screen h-[calc(100vh-70px)] flex justify-center items-center">
          <h1>nothing to show</h1>
        </div>
      )}
    </div>
  );
}

export default App;
