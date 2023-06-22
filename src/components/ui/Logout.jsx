import { useLogoutMutation } from "@/redux/features/auth/authAPI";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

function Logout({ className, style }) {
  const dispatch = useDispatch();
  const [logout, { data, isLoading, isError }] = useLogoutMutation();
console.log(data);

  const logoutHandler = () => {
    try {
      logout()
      dispatch(userLoggedOut());
    } catch(err) {
console.log(err);
    }
  };

  return (
    <button
      type="button"
      onClick={logoutHandler }
      className={`${className}`}
      style={style}
      disabled={isLoading}
    >
      Logout
    </button>
  );
}

export default Logout;
