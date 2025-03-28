interface StateElementProps {
  status: "idle" | "loading" | "error" | "success";
  error?: Error | string | null;
  loadingElement?: React.ReactNode;
}

export const StateElement = ({
  status,
  error,
  loadingElement,
}: StateElementProps) => {
  if (status === "error") {
    return (
      <div className="weather-error" role="alert">
        {typeof error === "string" ? error : error?.message}
      </div>
    );
  }

  if (status === "loading") {
    return <>{loadingElement}</>;
  }

  return null;
};
