const listStyle =
  " w-[170px] h-[18px] flex item-center gap-[5px] shimmer-ui rounded-md";

export const HouseCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-[10px] p-[10px] bg-white rounded-lg custom-shadow">
      this is just a skeleton showcase
      <h2 className="w-[200px] h-[25px] text-[22px] font-bold shimmer-ui rounded-md"></h2>
      <ul className="flex flex-col gap-[8px]">
        <li className={listStyle}></li>
        <li className={listStyle}></li>
        <li className={listStyle}></li>
        <li className={listStyle}></li>
        <li className={listStyle}></li>
        <li className={listStyle}></li>
      </ul>
      <button className="w-[100px] h-[40px] shimmer-ui rounded-md"></button>
    </div>
  );
};
