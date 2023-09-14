/* reikės perkelti */
export const containerStyle = { background: "transparent" };
export const cardStyle = {
  backgroundImage: `url("http://localhost:3000/static/media/background-image-light-gray.b9c14666961e2f8fac7f.jpg")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};
export const defaultImage =
  "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60";
export const paginationStyle = {
  border: "1px solid gray",
  borderRadius: "50%",
  marginRight: "1px",
  cursor: "pointer",
};
export const Loadera = () => {
  return (
    <div className="d-flex justify-content-md-center">
      <div className="spinner"></div>
    </div>
  );
};
