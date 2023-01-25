import ReactLoading from "react-loading";

function LoadingIcon() {
  return (
    <div>
      <ReactLoading
        className="m-auto"
        type={"bars"}
        color="white"
        height={40}
        width={40}
      />
    </div>
  );
}

export { LoadingIcon };
