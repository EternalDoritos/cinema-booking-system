import React from "react";
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
  return (
    <>
      {/* <div class="mb-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              class="block text-sm font-medium text-gray-400"
            >
              Search User by Email
            </label>
            <div class="mt-1">
              <input
                id="userName"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm  bg-amber-300 hover:bg-amber-500 text-black font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Search User
            </button>
          </div>
        </form>
      </div> */}
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
          {page.map((row) => {
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
                      class="text-slate-800"
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
