import LoadingIndicator from "./LoadingIndicator";
import ErrorAlert from "./ErrorAlert";

export default function AsyncData({
  isPending,
  error,
  children,
}: {
  isPending: boolean;
  error: Error | null;
  children?: React.ReactNode;
}) {
  if (isPending) return <LoadingIndicator />;

  return (
    <>
      {error && <ErrorAlert message={error.message} />}
      {!error && !isPending && children}
    </>
  );
}
