function UserImage({ image, children, size = "60px" }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden", // Clip the image to the circular shape
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        alt="user"
        src={`${process.env.REACT_APP_API_URL}/assets/${image}`}
      />
      {children}
    </div>
  );
}

export default UserImage;
