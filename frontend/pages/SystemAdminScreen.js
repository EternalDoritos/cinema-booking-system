import React, { useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useMemo } from "react";
import "babel-polyfill";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import Head from "next/head";
import { MdArrowDropDown } from "react-icons/md";

const SystemAdminScreen = () => {
  const mockData = React.useMemo(
    () => [
      {
        col1: "Bob Johnson",
        col2: "Customer",
        col3: "example4@gmail.com",
        col4: "(139) 785-2394",
        col5: "Inactive",
        col6: "Not-suspended",
      },
      {
        col1: "John Doe",
        col2: "Manager",
        col3: "example10@gmail.com",
        col4: "(241) 285-6893",
        col5: "Inactive",
        col6: "Suspended",
      },
      {
        col1: "Jane Smith",
        col2: "Staff",
        col3: "example2@gmail.com",
        col4: "(680) 635-9251",
        col5: "Active",
        col6: "Not-suspended",
      },
      {
        col1: "Charlie Brown",
        col2: "Manager",
        col3: "example5@gmail.com",
        col4: "(432) 360-2745",
        col5: "Inactive",
        col6: "Not-suspended",
      },
      {
        col1: "Alice Lee",
        col2: "Customer",
        col3: "example9@gmail.com",
        col4: "(244) 407-8532",
        col5: "Inactive",
        col6: "Suspended",
      },
      {
        col1: "John Doe",
        col2: "Staff",
        col3: "example8@gmail.com",
        col4: "(348) 417-4783",
        col5: "Active",
        col6: "Suspended",
      },
      {
        col1: "Grace Chen",
        col2: "Manager",
        col3: "example1@gmail.com",
        col4: "(841) 741-6098",
        col5: "Inactive",
        col6: "Not-suspended",
      },
      {
        col1: "Emily Davis",
        col2: "Customer",
        col3: "example3@gmail.com",
        col4: "(578) 111-3689",
        col5: "Inactive",
        col6: "Not-suspended",
      },
      {
        col1: "Henry Kim",
        col2: "Customer",
        col3: "example10@gmail.com",
        col4: "(798) 441-8536",
        col5: "Inactive",
        col6: "Not-suspended",
      },
      {
        col1: "Jane Smith",
        col2: "Customer",
        col3: "example4@gmail.com",
        col4: "(891) 503-4756",
        col5: "Active",
        col6: "Not-suspended",
      },
      {
        col1: "Isabella Wilson",
        col2: "Staff",
        col3: "example6@gmail.com",
        col4: "(533) 383-3220",
        col5: "Inactive",
        col6: "Suspended",
      },
      {
        col1: "Frank Miller",
        col2: "Customer",
        col3: "example2@gmail.com",
        col4: "(445) 479-1283",
        col5: "Active",
        col6: "Not-suspended",
      },
    ],
    []
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "User Type",
        accessor: "col2",
      },
      {
        Header: "Email",
        accessor: "col3", // accessor is the "key" in the data
      },
      {
        Header: "Phone",
        accessor: "col4",
      },
      {
        Header: "Active",
        accessor: "col5", // accessor is the "key" in the data
      },
      {
        Header: "Suspended",
        accessor: "col6",
      },
    ],
    []
  );
  return (
    <div>
      <Head>
        <title>SystemAdminScreen</title>
      </Head>
      <h1 class="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
        System Admin Profile
      </h1>
      <UserAccountTable columns={columns} data={mockData} />
    </div>
  );
};

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search for a user:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
          color: "#000000",
        }}
      />
    </span>
  );
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

const UserAccountTable = ({ columns, data }) => {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const [open, setOpen] = useState(false);
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => setOpen(true);

  return (
    <>
      <table class="table w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: "solid 3px gray",
                    // background: "aliceblue",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                  <span>
                    <MdArrowDropDown />
                  </span>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left",
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                // globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            console.log(row.original);
            const name = row.original.col1;
            const userType = row.original.col2;
            const email = row.original.col3;
            const phoneNum = row.original.col4;
            const activityStatus = row.original.col5;
            const suspendedStatus = row.original.col6;
            return (
              <React.Fragment key={index}>
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    setOpenModalIndex(index);
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                          background: "papayawhip",
                        }}
                        class="text-slate-800"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
                {openModalIndex === index && (
                  <Modal
                    open={openModalIndex !== null}
                    onClose={() => setOpenModalIndex(null)}
                    center
                  >
                    <h2 class="font-bold text-xl text-slate-800">
                      Cinema Booking User
                    </h2>
                    <p class="font-bold text-slate-600">User name: </p>
                    <p class="text-slate-600">{name}</p>
                    <p class="font-bold text-slate-600">Employee type: </p>
                    <p class="text-slate-600">{userType}</p>
                    <p class="font-bold text-slate-600">Email: </p>
                    <p class="text-slate-600">{email}</p>
                    <p class="font-bold text-slate-600">Phone: </p>
                    <p class="text-slate-600">{phoneNum}</p>
                    <p class="font-bold text-slate-600">Active: </p>
                    <p class="text-slate-600">{activityStatus}</p>
                    <p class="font-bold text-slate-600">Suspended: </p>
                    <p class="text-slate-600">{suspendedStatus}</p>
                    <p class="font-bold text-slate-600">Short info: </p>
                    <p class="text-slate-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                  </Modal>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="pagination text-right pr-5">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
      </div>
    </>
  );
};
export default SystemAdminScreen;
