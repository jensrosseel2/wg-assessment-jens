import UserForm from "../components/users/UserForm.tsx";
import { useParams } from "react-router-dom";
import { getUser } from "../api/index.ts";
import AsyncData from "../components/common/AsyncData.tsx";
import { useQuery } from "@tanstack/react-query";

export default function AddOrEditUser() {
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(Number(id)),
    enabled: !!id,
  });

  return (
    <div className="container">
      <span className="relative inline-block mb-6">
        <span className="font-bold text-3xl">
          {id ? "Edit user" : "Add user"}
        </span>
        <svg
          className="absolute -bottom-1 left-0 w-full h-2 pointer-events-none"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <path
            d="M0,10 C30,0 70,0 100,10"
            stroke="#ff8000"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </span>
      <AsyncData isPending={isPending} error={error}>
        <UserForm user={data} />
      </AsyncData>
    </div>
  );
}
