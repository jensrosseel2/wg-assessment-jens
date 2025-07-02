import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/index.ts";
import UserList from "../components/users/UserList.tsx";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/common/LoadingIndicator.tsx";
import ErrorAlert from "../components/common/ErrorAlert.tsx";
import { useState, useEffect } from "react";

export default function UserOverview() {
  const [sortField, setSortField] = useState<string>(() => {
    return localStorage.getItem("sortField") || "name";
  });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(() => {
    return (localStorage.getItem("sortOrder") as "asc" | "desc") || "asc";
  });

  useEffect(() => {
    localStorage.setItem("sortField", sortField);
  }, [sortField]);

  useEffect(() => {
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortOrder]);

  const { isPending, error, data } = useQuery({
    queryKey: ["users", sortField, sortOrder],
    queryFn: () => getUsers(sortField, sortOrder),
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
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </span>

      <div className="mb-4 flex items-center float-right gap-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-[#ff8000] text-sm"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="role">Role</option>
          </select>

          <select
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-[#ff8000] text-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <Link to={"/users/add"}>
          <button className="default-btn">Add user</button>
        </Link>
      </div>

      <UserList users={data.users} />
    </>
  );
}
