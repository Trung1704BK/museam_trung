import React, { useState, useEffect } from 'react';
import Page from 'views/Component/Page';

import axios from '../../../api/axios';

function AllItems() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getItems();
  }, []);
  //
  //
  const getItems = () => {
    axios
      .get('items')
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setPosts(res.data.items);
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
      <Page data={posts} />
    </div>
  );
}

export default AllItems;
