import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUsers = async () => {
  const { data } = await axios.get<User[]>("/api/user");
  return data;
};

export const useUsers = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 60 * 1000,
  });

  return { users, error, isLoading };
};
