import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { dataActions } from '../store/data-reducer';

const ReactTable = ({ columns }) => {
  const data = useSelector((state) => state.dataReducer.data);
  const [filteredData, setFilteredData] = useState([]);
  console.log(data);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const dataFetched = await fetch(
        'https://crudcrmapiexpress.herokuapp.com/projects',
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          return result;
        })
        .catch((error) => console.log('error', error));
      const results = await dataFetched;
      const resultsRedux = dispatch(dataActions.getData(results));
      setFilteredData(resultsRedux.payload);
    };
    fetchData();
  }, []);
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  });

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <>
      {data ? (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ): (
          <div>
            <h1> Hello World </h1>
          </div>  
        )
      }
    </>
  );
};

export default ReactTable