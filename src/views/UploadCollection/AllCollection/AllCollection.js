import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from '../../../api/axios';

function AllCollection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getItems();
  }, []);
  //
  //
  const getItems = () => {
    axios
      .get('collections')
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setPosts(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get current posts

  //

  //

  return (
    <div className='container' style={{ marginTop: 100 }}>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>STT</th>
            <th scope='col'>Tiêu đề</th>
            <th scope='col'>Ảnh bộ sưu tập</th>

            <th scope='col'>Trạng thái bài đăng</th>
            <th scope='col'>Xem chi tiết</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((value, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>{value.title}</td>
              <td>
                <img src={value.image} style={{ maxWidth: 100 }} />
              </td>
              <td>
                {value.status === 0 ? 'Chưa được duyệt' : 'Đã được duyệt'}
              </td>
              <td>
                <Link to={`/admin/collection/${value.collection_id}`}>
                  Xem chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCollection;
