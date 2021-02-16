import React from "react";
import { useQuery } from "react-query";
import { useTable } from "react-table";
import "./bill-table.scss";

export default function BillTableWrapper() {
  const { isLoading, data } = useQuery("bills", () =>
    fetch("/api/bills").then((res) => res.json())
  );

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return <BillTable queryData={data} />;
}

const formatDate = (date) => {
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}-${mo}-${ye}`;
};

function BillTable({ queryData }) {
  const data = React.useMemo(() => queryData, [queryData]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Fecha de Recibo",
        accessor: "billDate", // accessor is the "key" in the data
      },
      {
        Header: "Cuenta",
        accessor: "account",
      },
      {
        Header: "Monto",
        accessor: "cost",
      },
      {
        Header: "Fecha de Captura",
        accessor: "createdAt",
      },
      {
        Header: "Fecha",
        accessor: "manualDate",
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
    <div className="bill-table-wrapper">
      <table className="bill-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{
                backgroundColor: "#599bb3",
                borderRadius: "4px 4px 0 0",
                border: "solid 1px gray",
              }}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    // backgroundColor: "#599bb3",
                    // borderRadius: "4px 4px 0 0",
                    color: "white",
                    fontWeight: "bold",
                    margin: "0 20px",
                    padding: "12px",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((ogRow) => {
            const row = {
              ...ogRow,
              values: {
                ...ogRow.values,
                billDate: formatDate(ogRow.values.billDate),
                cost: `$ ${ogRow.values.cost}`,
                createdAt: formatDate(ogRow.values.createdAt),
                manualDate: formatDate(ogRow.values.manualDate),
              },
            };

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
