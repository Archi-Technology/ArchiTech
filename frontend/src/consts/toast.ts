import { toast } from "react-toastify";

export type ToastType = "success" | "error" | "info" | "warning" | "info"
export const showToast = (message: string, type: ToastType = "info") => {
  toast[type](message);
};
