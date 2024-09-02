import clsx from "clsx";

const Loader = ({ className }: { className: string }) => {
  return (
    <div
      className={clsx(
        "rounded-full border-[1px] border-r-0 border-black animate-spin duration-200",
        className
      )}
    ></div>
  );
};

export default Loader;
