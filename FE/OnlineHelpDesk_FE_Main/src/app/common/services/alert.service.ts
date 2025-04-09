import Swal from "sweetalert2";

export const loginRequiredAlert = () => {

  Swal.fire({
    title: `You haven't login yet`,
    text: "Please login to continue!",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Login',
  })

};