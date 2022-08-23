import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './styles.css'

const PaginationCity = ({ data }) => {
  // const [currentPage, setCurrentPage] = useState(0);
  const [paginate, setPaginate] = useState({
    offset: 0,
    data: data,
    perPage: 10,
    currentPage: 0,
    pageCount: 0,
    postdata: [],
  })

  useEffect(() => {
    const slice = data.slice(
      paginate.offset,
      paginate.offset + paginate.perPage
    );
    setPaginate({
      ...paginate,
      pageCount: Math.ceil(data.length / paginate.perPage),
      postdata: slice,
    });
  }, [paginate.offset])

  const handleCityClick = (e) => {
    console.log(e)
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * paginate.perPage;

    setPaginate({
      ...paginate,
      currentPage: selectedPage,
      offset: offset,
    })
  };
  console.log(paginate.postdata)
  return (
    <div>
      <div className="button-display-flex">
        {paginate.postdata.map((pd, index) => {    
          return (
            <button onClick={() => handleCityClick(index)} type="button" className="rounded-pill px-4 py-2">
              {pd}
            </button>
          )
        })}
      </div>
      <ReactPaginate
        previousLabel={'prev'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={paginate.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(e) => handlePageClick(e)}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default PaginationCity