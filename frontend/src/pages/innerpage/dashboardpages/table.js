import React from 'react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';

const ReactTableExample = ({ data }) => {
  // Define columns for your table
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        sortType: 'basic' // Use 'basic' sort type for basic sorting
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
    ],
    []
  );

  // Initialize table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // Initial page index and size
    },
    useFilters, // Use filters hook
    useSortBy, // Use sorting hook
    usePagination // Use pagination hook
  );

  return (
    <div>
      <table {...getTableProps()} style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }} className='text-dark'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ borderBottom: '1px solid black', padding: '8px', background: '#f2f2f2', textAlign: 'left' }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ borderBottom: '1px solid black' }}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} style={{ padding: '8px', textAlign: 'left' }}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ReactTableExample;
