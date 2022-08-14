import React, { useMemo, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useTable, useSortBy, useFilters } from 'react-table';
import AddUserReactTable from './AddUserReactTable';
import ModalUser from './ModalUser';
import UserModal from './UserModal';
import UserModalNew from './UserModalNew';

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
    Header: 'User Country',
    accessor: 'user_country',
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
  const [newShow, setNewShow] = useState(false);
  const [addShow, setAddShow] = useState(false);

  const changeShowToTrue = (action, value='') => {
    if (action === 'DELETE-MODAL-BOX') {
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

  let keyVal = 0;

  const defaultColumn = React.useMemo(
    () => ({
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
          // borderLeft: 'solid 1px black',
          // borderTop: 'solid 1px black',
          // borderBottom: 'solid 1px black',
          width: '98%',
          marginInline: 'auto',
          marginTop: '10%',
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="border-header">
                  <div
                    {...column.getSortByToggleProps()}
                    // className={
                    //   column.id == 'user_subscribed'
                    //     ? 'last-column'
                    //     : 'normal-column'
                    // }
                    style={{
                      cursor: 'pointer',
                      height: 30,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {column.render('Header')}
                    <div style={{width: 20}}>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </div>
                  </div>
                  <div style={{marginBlock: 10}} className="filter-input-field">
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
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