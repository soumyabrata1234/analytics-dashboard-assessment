'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    // Fetch and parse the CSV file once
    fetch('/data/abc.csv') // Ensure the path is correct
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }).data;
        setCsvData(parsedData);
      })
      .catch((error) => {
        console.error('Error reading the CSV file:', error);
      });
  }, []);

  return (
    <DataContext.Provider value={csvData}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}