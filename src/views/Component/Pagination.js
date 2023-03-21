import React from 'react';

import PropTypes from 'prop-types';
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  //
  console.log(typeof paginate);
  console.log(typeof postsPerPage);
  //

  //
  const totalPage = Math.ceil(totalPosts / postsPerPage);
  //
  let i = 1;
  //
  let pageNumbers = [];

  //
  for (i = 1; i <= Math.ceil(totalPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        <span
          style={{
            marginRight: '.5rem',
            padding: '5px',
            color: 'red',
            fontWeight: 400,
          }}
        >
          Trang:
        </span>
        {pageNumbers.map((number) => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  totalPosts: PropTypes.number.isRequired,
};

export default Pagination;
