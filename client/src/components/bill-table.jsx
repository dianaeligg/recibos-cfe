import React from "react";
import { useQuery } from "react-query";
import { useTable } from "react-table";
import "./bill-table.scss";

export default function BillTableWrapper() {
  const { isLoading, error, data } = useQuery("bills", () =>
    fetch("/api/bills").then((res) => res.json())
  );
  console.log({ isLoading, data });

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return <BillTable queryData={data} />;
}

function BillTable({ queryData }) {
  const rightNow = new Date();

  const data = React.useMemo(() => queryData, [rightNow]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Fecha",
        accessor: "date", // accessor is the "key" in the data
      },
      {
        Header: "Cuenta",
        accessor: "account",
      },
      {
        Header: "Monto",
        accessor: "cost",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="bill-table">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    // background: "aliceblue",
                    // color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
