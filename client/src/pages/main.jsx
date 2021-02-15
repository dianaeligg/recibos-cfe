import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Places from "../components/places";
import BillInput from "../components/bill-input";
import "./main.css";
import BillTable from "../components/bill-table";

const queryClient = new QueryClient();

function Main() {
  console.log("MAIN");
  return (
    <QueryClientProvider client={queryClient}>
      <div className="Main">
        <h1>Captura de Recibos</h1>
        <Places />
        <BillInput />
        <BillTable />
      </div>
    </QueryClientProvider>
  );
}

export default Main;
