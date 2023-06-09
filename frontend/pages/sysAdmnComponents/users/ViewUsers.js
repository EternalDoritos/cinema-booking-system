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
      col4: user.isActive ? "active" : "not active",
      col5: user.hasAccess ? "not suspended" : "suspended",
      id: user._id,
    }));
    setData(mappedData);
  }, [users]);
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
        Header: "Active",
        accessor: "col4", // accessor is the "key" in the data
      },
      {
        Header: "Suspended",
        accessor: "col5",
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

      <table class="table w-full overflow-hidden" {...getTableProps()}>
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
            const activityStatus = row.original.col4;
            const suspendedStatus = row.original.col5;
            const id = row.original.id;
            const SuspendUser = async (id) => {
              const suspendUser = await fetch(
                `http://localhost:5000/auth/suspendUserAccess/${id}`,
                {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
              );
              if (suspendUser.status === 200) {
                window.alert("User suspended successfully. Refreshing page.");
              } else window.alert("Error suspending user.");
            };

            const ResumeUserAccess = async (id) => {
              const resumeUser = await fetch(
                `http://localhost:5000/auth/resumeUserAccess/${id}`,
                {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
              );
              if (resumeUser.status === 200) {
                window.alert("User unsuspended successfully. Refreshing page.");
              } else window.alert("Error resuming user access.");
            };
            return (
              <React.Fragment key={index}>
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    setOpenModalIndex(index);
                  }}
                >
                  {row.cells.map((cell) => {
                    console.log(cell.value);
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          color:
                            cell.value === "not active" ||
                            cell.value === "suspended"
                              ? "rgb(220 38 38)"
                              : cell.value === "active" ||
                                cell.value === "not suspended"
                              ? "rgb(74 222 128)"
                              : "rgb(30 41 59)",
                          padding: "10px",
                          border: "solid 1px gray",
                          background: "#FFF7D4",
                        }}
                        class="font-normal "
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
                    <p class="font-extrabold text-slate-700">User name: </p>
                    <p class="text-slate-600">{name}</p>
                    <p class="font-extrabold text-slate-700">Employee type: </p>
                    <p class="text-slate-600">{userType}</p>
                    <p class="font-extrabold text-slate-700">Email: </p>
                    {email ? (
                      <p class="text-slate-600">{email}</p>
                    ) : (
                      <p class="text-slate-600">-</p>
                    )}
                    <p class="font-extrabold text-slate-700">Active: </p>
                    {activityStatus === "active" ? (
                      <p class="text-green-500">{activityStatus}</p>
                    ) : (
                      <p class="text-red-500">{activityStatus}</p>
                    )}
                    <p class="font-extrabold text-slate-700">Suspended: </p>
                    {suspendedStatus === "not suspended" ? (
                      <p class="text-green-500">{suspendedStatus}</p>
                    ) : (
                      <p class="text-red-500">{suspendedStatus}</p>
                    )}
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
                        onClick={() => {
                          if (confirm("Confirmation to suspend user?")) {
                            SuspendUser(id);
                            setOpenModalIndex(false);
                            window.location.reload();
                          }
                        }}
                        class="mt-6 mb-6 mr-2 bg-red-400 hover:bg-red-500 text-black font-bold py-2 px-4 rounded"
                      >
                        Suspend User
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (confirm("Confirmation to resume user access?")) {
                            ResumeUserAccess(id);
                            setOpenModalIndex(false);
                            window.location.reload();
                          }
                        }}
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
