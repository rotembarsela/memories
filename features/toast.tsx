import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  color: "white",
  iconColor: "white",
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const ToastSuccess = (msg: string) =>
  Toast.fire({
    icon: "success",
    title: msg,
    background: "#a5dc86",
  });

export const ToastError = (msg: string) => {
  console.log(msg);
  Toast.fire({
    icon: "error",
    title: msg,
    background: "#f27474",
  });
};

export const ToastWarning = (msg: string) =>
  Toast.fire({
    icon: "warning",
    title: msg,
    background: "#f8bb86",
  });

export const ToastInfo = (msg: string) =>
  Toast.fire({
    icon: "info",
    title: msg,
    background: "#3fc3ee",
  });

export const ToastQuestion = (msg: string) =>
  Toast.fire({
    icon: "question",
    title: msg,
    background: "#87adbd",
  });
