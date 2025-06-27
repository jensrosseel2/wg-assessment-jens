import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/index.ts";
import UserList from "../components/users/UserList.tsx";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/common/LoadingIndicator.tsx";
import ErrorAlert from "../components/common/ErrorAlert.tsx";

export default function UserOverview() {
  const { isPending, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 2 * 60 * 1000,
  });

  if (isPending) return <LoadingIndicator />;

  if (error) return <ErrorAlert message={error.message} />;
  return (
    <>
      <span className="relative inline-block mb-6">
        <span className="font-bold text-3xl">Users overview</span>
        <svg
          className="absolute -bottom-1 left-0 w-full h-2 pointer-events-none"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <path
            d="M0,10 C30,0 70,0 100,10"
            stroke="#ff8000"
            stroke-width="3"
            fill="none"
          />
        </svg>
      </span>
      <Link to={"/users/add"}>
        <button className="float-right default-btn">Add user</button>
      </Link>

      <UserList users={data.users} />
    </>
  );
}
