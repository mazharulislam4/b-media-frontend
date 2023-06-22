import { useGetUserQuery } from "@/redux/features/user/userAPI";
import Link from "next/link";
import Avatar from "../Avatar";

function Users() {
  const { data, isLoading, isError } = useGetUserQuery();

  let content = null;

  if (!isLoading && !isError && data instanceof Object) {
    content = data?.data.map((user, index) => {
      return (
        <ul className="list-none " key={index}>
          <li className="my-2 bg-white">
            <Link href={"/"} legacyBehavior>
              <a className="py-1 px2">
                <Avatar isOnline={user?.active_status} name={user?.firstName} withName={true} url={user?.avatar?.url}  />
              </a>
            </Link>
          </li>
        </ul>
      );
    });
  }

  return <>{content}</>;
}

export default Users;
