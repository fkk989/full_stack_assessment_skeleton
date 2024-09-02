import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { House, UpdateHouseUsers } from "../utils/types";
import { useDispatch } from "react-redux";
import { SetStateAction, useEffect } from "react";
import { setHome } from "../features/house";

export const useGetHomeByUser = ({
  username,
  page,
  limit,
}: {
  username: string;
  page: number;

  limit: number;
}) => {
  //

  const query = useQuery({
    queryKey: ["get-home-by-user"],
    queryFn: async () => {
      //
      if (!username) return [];
      //
      const houses = (
        await axios.get(`/api/home/${username}?page=${page}&limit=${limit}`)
      ).data as House[];
      //
      return houses;
    },
  });
  return { query, data: query.data };
};

export const useUpdateHomeUser = () => {
  const mutation = useMutation({
    mutationKey: ["update-home-users"],
    mutationFn: async (data: UpdateHouseUsers) => {
      //
      const updateHome = (await axios.put("/api/home", data)).data as {
        success: boolean;
        message: string;
      };
      //
      return updateHome;
    },
  });
  return { mutation };
};

export const useSetHomesByUser = ({
  username,
  page,
  limit,
}: {
  username: string;
  page: number;
  limit: number;
  setPage: React.Dispatch<SetStateAction<number>>;
}) => {
  const { query, data: house } = useGetHomeByUser({
    username,
    page,
    limit,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    //
    query.refetch();
  }, [username]);

  //
  useEffect(() => {
    if (house && house?.length !== 0) {
      dispatch(setHome(house));
    }
  }, [house]);

  return { query };
};
