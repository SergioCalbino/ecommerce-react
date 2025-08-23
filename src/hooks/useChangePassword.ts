import { resetPasswordLogin } from "@/api/Auth";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

const useChangePassword = () => {
  const mutation = useMutation({
    mutationFn: resetPasswordLogin,
    onError: (error: AxiosError<{ error: string }>) => {
      console.log(error.response?.data.error);
      toast.error(error?.response?.data.error);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });
  return mutation;
};

export default useChangePassword;
