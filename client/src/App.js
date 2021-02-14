import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Places from "./components/places";
import BillInput from "./components/bill-input";
import BillTable from "./components/bill-table";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Captura de Recibos</h1>
        <Places />
        <BillInput />
        <BillTable />
      </div>
    </QueryClientProvider>
  );
}

export default App;
