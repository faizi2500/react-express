import React, {useMemo, useState} from 'react';
import {Button} from 'react-bootstrap';
import {useTable, useSortBy, useFilters} from 'react-table';
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
    Header: 'User Name',
    accessor: 'user_name',
  },
  {
    Header: 'User Email',
    accessor: 'user_email',
  },
];

const TableMobileComponent = (props) => {
  const data = useMemo(() => props.data, [props.data]);
  const [person, setPerson] = useState([]);
  const [show, setShow] = useState(false);
  const [newShow, setNewShow] = useState(false);
  const [addShow, setAddShow] = useState(false);

  const changeShowToTrue = (action, value = '') => {
    if (action === 'DELETE-MODAL-BOX') {
      const person2 = data.filter((obj) => obj.user_name == value);
      console.log(person2);
      setPerson(person2[0]);
      setShow(true);
    } else if (action === 'ADD') {
      setAddShow(true);
    }
  };

  const changeShowToFalse = (action) => {
    if (action === 'ADD') {
      setAddShow(false);
      props.handleUpdate();
    } else if (action === 'DELETE') {
      setShow(false);
      props.handleUpdate();
    } else if (action === 'CLOSE-DELTE-MODAL') {
      setShow(false);
    }
  };

  let keyVal = 0;

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const handleModalShow = () => {
    console.log('working');
  };

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
        id='mobile-table'
        style={{
          width: '80vw',
          marginLeft: '10px',
          marginTop: '10%',
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="border-header-mobile">
                  <div
                    {...column.getSortByToggleProps()}
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
                    console.log('row', row);
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
                          {cell.value.includes('@') ? (
                            <>
                              <td>
                                <UserModalNew
                                  value={row.values.user_name}
                                  data={data}
                                  changeShowToTrue={changeShowToTrue}
                                  changeShowToFalse={changeShowToFalse}
                                  show={show}
                                  person={person}
                                />
                              </td>
                            </>
                          ) : (
                            <>
                            </>
                          )}
                        </>
                      );
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

export default TableMobileComponent