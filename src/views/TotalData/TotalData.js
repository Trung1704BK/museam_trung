import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../../api/axios';

function UploadItem() {
  const [posts, setPosts] = useState([]);
  //
  const { item_id } = useParams();
  //

  useEffect(() => {
    getItems();
  }, []);
  //
  const getItems = () => {
    const url = `items/${item_id}`;
    axios.get(url).then((res) => {
      if (res.status === 200) {
        console.log(res.data.items);
        setPosts(res.data.items);
      }
    });
  };
  //

  // Get current posts

  //

  // Change page

  //

  return (
    <div className='container' style={{ marginTop: 100 }}>
      <div className='information_admin'>
        <table className='table table-bordered'>
          <thead>
            <tr className='tr-head'>
              <th scope='col'>Tên vật phẩm</th>
              <th scope='col'>Ảnh hiện vật</th>
              <th scope='col'>Nguồn gốc/xuất sứ</th>
              <th scope='col'>Ngày chỉnh sửa</th>
              <th scope='col'>Trạng thái bài đăng</th>
              <th scope='col'>Xem chi tiết</th>
            </tr>
          </thead>
          {posts.map((value) => {
            const {
              item_id,
              images,
              description,
              feature_image,
              dimension,
              name,
              original,
              updatedAt,
            } = value;
            return (
              <tbody key={item_id}>
                <tr>
                  <td>{dimension}</td>
                  <td>{item_id}</td>
                  <td>
                    <img src={images?.url} style={{ maxWidth: 100 }} />
                  </td>

                  <td>{name}</td>
                  <td>
                    <img src={feature_image} style={{ maxWidth: 100 }} />
                  </td>
                  <td>{original}</td>
                  <td>{updatedAt}</td>
                  <td>{description}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default UploadItem;
