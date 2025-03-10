import { ResponsePhotos } from "@/types";
import { axiosApiUsers } from "@/utilities/axios";
import { useQuery } from "@tanstack/react-query";


export const useGetUsers = () => {
  return useQuery<ResponsePhotos[]>({
    queryKey: ["users", "list", ],
    queryFn: () => axiosApiUsers.get(`/photos`),
    retry: 0,
    staleTime: 0,
    gcTime: 0,
  });
};
