import React, { useState, useEffect } from 'react';

import axios from '../../../api/axios';

function Collections() {
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
          console.log(res.data.data);
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
      <div className='row'>
        {posts?.map((value, index) => (
          <div
            className='col-4 card'
            style={{ maxWidth: '22rem', marginBottom: 40, marginRight: 20 }}
            key={index}
          >
            <img src={value.image} alt='image' style={{ height: 300 }} />
            <div className='card-body'>
              <h5 className='card-title'>{value.title}</h5>
              <p className='card-text'>{value.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;
