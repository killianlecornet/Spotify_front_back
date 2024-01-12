import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import Header from "./components/header";

export default function App() {
  return (
    <>
      <Header/>
      <RouterProvider router={router} />
    </>
  );
}