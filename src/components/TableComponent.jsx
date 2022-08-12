import React, { useMemo, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useTable, useSortBy, useFilters } from 'react-table';
import AddUserReactTable from './AddUserReactTable';
import ModalUser from './ModalUser';
import UserModal from './UserModal';

function DefaultColumnFilter({
  column: {filterValue, preFilteredRows, setFilter},
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}


const columns = [
  {
    Header: 'ID',
    accessor: '_id',
  },
  {
    Header: 'User Name',
    accessor: 'user_name',
  },
  {
    Header: 'User Email',
    accessor: 'user_email',
  },
  {
    Header: 'User Mobile',
    accessor: 'user_mobile',
  },
  {
    Header: 'User Subscribed',
    accessor: 'user_subscribed',
  },
];

const TableComponent = (props) => {
  const data = useMemo(() => props.data, [props.data]);
  const [person, setPerson] = useState([]);
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);

  const changeShowToTrue = (action, value='') => {
    console.log(value);
    console.log(action)
    if (action === 'DELETE') {
      const person2 = data.filter((obj) => obj._id == value);
      setPerson(person2[0]);
      setShow(true);
    } else if (action === 'ADD') {
      setAddShow(true);
    }
  }
  const changeShowToFalse = (action) => {
    if (action === 'ADD') {
      setAddShow(false)
      props.handleUpdate();
    } else if (action === 'DELETE') {
      setShow(false);
      props.handleUpdate();
    } else if (action === 'CLOSE-DELTE-MODAL') {
      setShow(false);
    }
  }
  // const [passId, setPassId] = useState();
  let keyVal = 0;

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const handleModalShow = () => {
    console.log('working');
  }
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
  } = useTable({columns, data, defaultColumn}, useFilters, useSortBy);
  return (
    <div>
      <div className="crm-page-header">
        <div>
          <img
            src="https://lastingsales.com/wp-content/uploads/2021/11/logo-1.png"
            alt=""
          />
        </div>
        <div id="mobile-filter-section" className="filter-section-div">
          <AddUserReactTable
            addshow={addShow}
            changeShowToTrue={changeShowToTrue}
            changeShowToFalse={changeShowToFalse}
          />
        </div>
      </div>
      <table
        style={{
          borderLeft: 'solid 1px black',
          // borderTop: 'solid 1px black',
          // borderBottom: 'solid 1px black',
          width: '98%',
          marginInline: 'auto',
          marginTop: '10%',
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  scope="col"
                  className={
                    column.id == 'user_subscribed'
                      ? 'last-column'
                      : 'normal-column'
                  }
                  key={column.id}
                  // className='normal-column'
                >
                  {column.render('Header')}
                  <span className="sorting">
                    {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    if (!cell.value) {
                      return (
                        <>
                          <td
                            {...cell.getCellProps()}
                            style={{
                              padding: '10px',
                              border: 'solid 1px gray',
                            }}
                          >
                            False
                          </td>
                          <td>
                            <UserModal
                              value={row.values._id}
                              data={data}
                              changeShowToTrue={changeShowToTrue}
                              changeShowToFalse={changeShowToFalse}
                              show={show}
                              person={person}
                            />
                          </td>
                        </>
                      );
                    } else if (cell.value == true) {
                      return (
                        <>
                          <td
                            {...cell.getCellProps()}
                            style={{
                              padding: '10px',
                              border: 'solid 1px gray',
                            }}
                          >
                            True
                          </td>
                          <td>
                            <UserModal value={row.values._id} data={data} />
                          </td>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <td
                            {...cell.getCellProps()}
                            style={{
                              padding: '10px',
                              border: 'solid 1px gray',
                            }}
                          >
                            {cell.render('Cell')}
                          </td>
                        </>
                      );
                    }
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent