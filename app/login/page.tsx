import Login from "../components/forms/Login";

const page = async () => {
  return (
    <main
      className=" min-h-screen flex items-center justify-center w-full"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Login />
    </main>
  );
};

export default page;
