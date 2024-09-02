export const InputSkeleton = () => {
  return (
    <div className="flex items-center gap-[5px]">
      <div className="h-[15px] w-[15px] rounded-sm bg-[#CCCCCC]"></div>
      <div className="h-[15px] w-[100px] rounded-sm bg-[#CCCCCC] shimmer-ui"></div>
    </div>
  );
};
