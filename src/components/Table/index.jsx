'use client';
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Grid styles
import style from './Table.module.scss'; // Custom styles if necessary
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Alpine theme styles

const Table = ({ Data }) => {
  const [rowData] = useState([
    { make: 'Toyota', model: '12345-1234567-1', price: 35000 },
    { make: 'Ford', model: '98765-7654321-0', price: 32000 },
    { make: 'Porsche', model: '54321-1234321-9', price: 72000 },
    { make: 'BMW', model: '56789-6789012-2', price: 90000 },
    { make: 'Audi', model: '45678-3456789-8', price: 27000 },
    { make: 'Honda', model: '12345-5432100-5', price: 22000 },
    { make: 'Chevrolet', model: '11111-2222222-3', price: 25000 },
    { make: 'Mazda', model: '99999-8888888-4', price: 35000 },
    { make: 'Hyundai', model: '88888-7777777-7', price: 28000 },
    { make: 'Nissan', model: '55555-6666666-6', price: 32000 }
  ]);

  // Column definitions for the grid
  const columnDefs = [
    { headerName: 'Name', field: 'make' },
    { headerName: 'CNIC', field: 'model' },
    { headerName: 'Father/Husband Name', field: 'price' },
    { headerName: 'City', field: 'make' },
    { headerName: 'State', field: 'model' },
    { headerName: 'Licence Number', field: 'price' },
    { headerName: 'Allowed Vehicles', field: 'price' },
  ];

  // Function to handle the filter change
  const onFilterTextChange = (e) => {
    gridApi.setQuickFilter(e.target.value);
  };

  let gridApi;

  return (
    <div className={`ag-theme-alpine ${style.container}`}>
      {/* Search Filter Input */}
      <div className={"search-container"}>
        <input
          type="text"
          placeholder="Search by CNIC"
          onChange={onFilterTextChange}
          className="search-input"
        />
      </div>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={(params) => {
          gridApi = params.api;
        }}
      />
    </div>
  );
};

export default Table;
