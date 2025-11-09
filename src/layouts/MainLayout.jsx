import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
