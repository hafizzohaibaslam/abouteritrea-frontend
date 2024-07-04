const Spinner = ({ size = "md" }) => {
  const fontSize =
    size === "lg"
      ? { fontSize: "26px" }
      : size == "sm"
      ? { fontSize: "14px" }
      : { fontSize: "22px" };

  return <i className="fa fa-spinner fa-spin" style={fontSize}></i>;
};

export default Spinner;
