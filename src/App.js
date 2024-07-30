import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductTable from "./components/ProductTable";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-4">
        <ProductTable />
      </main>
      <Footer />
    </div>
  );
};

export default App;
