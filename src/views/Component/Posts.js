import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
function Posts({ props }) {
  const { data } = props;
  return (
    <>
      {data.map((value) => {
        const {
          name,
          item_id,
          status,
          feature_image,
          original,
          updatedAt,
        } = value;

        return (
          <tbody key={item_id}>
            <tr>
              <td>{name}</td>
              <td>{item_id}</td>
              <td>
                <img src={feature_image} style={{ maxWidth: 100 }} />
              </td>
              <td>{original}</td>
              <td>{updatedAt}</td>
              <td>{status === 0 ? 'Chưa được duyệt' : 'Đã được duyệt'}</td>

              <td>
                <Link to={`totalData/${item_id}`}>{item_id}</Link>
              </td>
            </tr>
          </tbody>
        );
      })}
    </>
  );
}
Posts.propTypes = {
  data: PropTypes.array.isRequired,
  props: PropTypes.func.isRequired,
};

export default Posts;
