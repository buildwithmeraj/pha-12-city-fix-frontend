import React from "react";
import Header from "../components/NavBar";
import Footer from "../components/Footer";
import ErrorImage from "../components/utilities/ErrorImage";

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-[3%] py-[1%] flex items-center justify-center h-[70vh] flex-col gap-4 pt-4">
        <ErrorImage />
        <div className="text-center font-semibold text-3xl">
          <span className="text-amber-600">OOPS!</span> Page Not Found.
        </div>
        <div className="text-xl">
          The Page you are looking for cannot be found on the server. But don't
          worry, you can always go back to the{" "}
          <a href="/" className="text-amber-600 font-semibold">
            Home Page
          </a>
          .
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorPage;
