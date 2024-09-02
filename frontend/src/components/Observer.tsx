import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { House } from "../utils/types";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addHomes } from "../features/house";

interface ObservedProp {
  username: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
}

export const Observer: React.FC<ObservedProp> = ({
  username,
  page,
  setPage,
  limit,
}) => {
  const dispatch = useDispatch();
  const elementRef = useRef(null);

  useEffect(() => {
    if (page > 1 && username) {
      axios
        .get(`/api/home/${username}?page=${page}&limit=${limit}`)
        .then((data) => {
          const houses = data.data as House[];
          dispatch(addHomes(houses));
        });
    }
  }, [page]);
  //
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPage((crnt) => crnt + 1);
            console.log("Component is in view");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div ref={elementRef} className="w-screen h-[100px] bg-transparent"></div>
  );
};
