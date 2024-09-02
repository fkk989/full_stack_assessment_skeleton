import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../utils/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { setUser } from "../features/user";

export const useGetAllUser = () => {
  const query = useQuery({
    queryKey: ["get-all-user"],
    queryFn: async () => {
      const users = (await axios.get("/api/user")).data as User[];
      return users;
    },
  });
  return { query, data: query.data };
};

export const useGetUserByHouse = (street_address: string) => {
  const query = useQuery({
    queryKey: ["get-users-by-home"],
    queryFn: async () => {
      const users = (await axios.get(`/api/user/${street_address}`))
        .data as User[];

      return users;
    },
  });

  return { query, data: query.data };
};

export const useSetUser = () => {
  const { data: users } = useGetAllUser();
  const dispatch: AppDispatch = useDispatch();
  //
  useEffect(() => {
    if (users && users.length !== 0) {
      dispatch(setUser(users));
    }
  }, [users]);
};
