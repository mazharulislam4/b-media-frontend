import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

function withPublicRoute(WrappedComponent) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const isAuthorized = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isAuthorized) {
        router.push("/");
      }
    }, [isAuthorized , router]);


    return !isAuthorized ? <WrappedComponent {...props} /> : null;
  };
}

export default withPublicRoute;
