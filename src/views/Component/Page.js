import { useEffect, useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Page.css';

import ReactPaginate from 'react-paginate';
export default function Page({ data }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log('test', newOffset);
    //
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset},${data.length}`
    );

    setItemOffset(newOffset);
  };
  return (
    <>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>STT</th>
            <th scope='col'>Tên vật phẩm</th>
            <th scope='col'>Ảnh hiện vật</th>
            <th scope='col'>Nguồn gốc/xuất sứ</th>

            <th scope='col'>Trạng thái bài đăng</th>
            <th scope='col'>Xem chi tiết</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((image, index) => (
            <tr key={image.item_id}>
              <td>{itemOffset + index + 1}</td>
              <td>{image.name}</td>
              <td>
                <img src={image.feature_image} style={{ maxWidth: 100 }} />
              </td>

              <td>{image.original}</td>

              <td>
                {image.status === 0 ? 'Chưa được duyệt' : 'Đã được duyệt'}
              </td>
              <td>
                <Link to={`/admin/upload/${image.item_id}`}>Xem chi tiết</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel='...'
        nextLabel='>>'
        nextClassName='page-link next-page'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel='<<'
        previousClassName='page-link'
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageLinkClassName='page-link'
        nextLinkClassName='page-num'
        previousLinkClassName='page-num'
        activeLinkClassName='active'
        pageClassName='page-item'
      />
    </>
  );
}
Page.propTypes = {
  data: PropTypes.array.isRequired,
};
