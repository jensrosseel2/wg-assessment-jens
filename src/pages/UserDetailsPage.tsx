import { useParams } from "react-router-dom";
import { getUser } from "../api/index.ts";
import UserDetails from "../components/users/UserDetails.tsx";
import AsyncData from "../components/common/AsyncData.tsx";
import { useQuery } from "@tanstack/react-query";

export default function UserDetailsPage() {
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["user", Number(id)],
    queryFn: () => getUser(Number(id)),
    staleTime: 2 * 60 * 1000,
  });
  return (
    <AsyncData isPending={isPending} error={error}>
      <UserDetails user={data} />
    </AsyncData>
  );
}
