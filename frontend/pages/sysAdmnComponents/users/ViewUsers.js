import React, { useState, useMemo, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
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
import Link from "next/link";
import { MdArrowDropDown } from "react-icons/md";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/auth/getUsers");
  const data = await res.json();
  //   console.log(data);
  return {
    props: { users: data },
  };
};

const ViewUsers = ({ users }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const mappedData = users.map((user) => ({
      col1: user.username ? user.username : "",
      col2: user.userType ? user.userType : "",
      col3: user.email ? user.email : "",
      col4: user.phoneNum ? user.phoneNum : "87654321",
      col5: user.isActive ? "active" : "not active",
      col6: user.hasAccess ? "not suspended" : "suspended",
      id: user._id,
    }));

    setData(mappedData);
  }, [users]);

  //   console.log(data);
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
  const [openModalIndex, setOpenModalIndex] = useState(null);
  return (
    <>
      <Head>
        <title>View Users</title>
      </Head>
      <h1 class="text-white text-center text-4xl pt-10 font-bold uppercase tracking-wider">
        Cinema Booking System Users
      </h1>
      <p class="text-white text-center text-base pt-2 pb-10  tracking-wider">
        Functions: View Users, Search Users, Update Users
      </p>
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
            const name = row.original.col1;
            const userType = row.original.col2;
            const email = row.original.col3;
            const phoneNum = row.original.col4;
            const activityStatus = row.original.col5;
            const suspendedStatus = row.original.col6;
            const id = row.original.id;
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
                    <h2 class="font-bold text-xl text-slate-800 uppercase">
                      {userType}
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
                    <Link
                      href={`/sysAdmnComponents/users/EditUser/${id}`}
                      //   href={`/EditUser?id=u64574dc5f132becf123ddcf7`}
                      legacyBehavior
                    >
                      <button class="mt-6 mb-6 mr-2 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded">
                        Edit Profile
                      </button>
                    </Link>

                    {suspendedStatus === "not suspended" ? (
                      <button
                        onClick={() => {}}
                        class="mt-6 mb-6 mr-2 bg-red-400 hover:bg-red-500 text-black font-bold py-2 px-4 rounded"
                      >
                        Suspend User
                      </button>
                    ) : (
                      <button
                        onClick={() => {}}
                        class="mt-6 mb-6 mr-2 bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded"
                      >
                        Un-suspend User
                      </button>
                    )}
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
export default ViewUsers;
