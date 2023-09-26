import React, { useState } from "react";
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
import Link from "next/link";
const SystemAdminScreen = ({ users }) => {
  return (
    <div>
      <Head>
        <title>SystemAdminScreen</title>
      </Head>
      <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
        System Admin Profile
      </h1>
      <div>
        <ul className="m-5 text-center">
          <li>
            <Link legacyBehavior href="/sysAdmnComponents/users/ViewUsers">
              <a className="text-center font-bold text-2xl p-2 rounded">
                View and Edit Users
              </a>
            </Link>
          </li>
        </ul>
        <ul className="m-5 text-center">
          <li>
            <Link legacyBehavior href="/sysAdmnComponents/users/CreateUser">
              <a className="text-center font-bold text-2xl p-2 rounded">
                Create New Users
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SystemAdminScreen;
