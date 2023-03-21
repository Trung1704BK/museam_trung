import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../../../api/axios';

function ItemDetail() {
  console.log('render');
  const [data, setData] = useState({});
  //
  //

  const { collection_id } = useParams();

  //

  useEffect(() => {
    getData();
  }, []);
  //
  const getData = () => {
    const url = `collections/${collection_id}`;
    axios.get(url).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data.data);
      }
    });
  };

  // Get current posts
  const handleChange = (e) => {
    setData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    //
    const formData = new FormData();
    //
    formData.append('title', data.title);
    formData.append('description', data.description);
    //
    const imageFile = document.querySelector('#image');
    formData.append('image', imageFile.files[0]);
    //
    const url = `collections/${collection_id}`;
    const result = await axios.put(url, formData);
    if (result) {
      return alert('Thay đổi thành công !');
    }
  };

  //

  return (
    <div className='container' style={{ marginTop: 50 }}>
      <div className='information_collection'>
        <form className='form_collection'>
          <div className='row'>
            <div className='col-12'>
              <span style={{ fontWeight: 500 }}>Ảnh album:</span>
              <br />

              <img
                src={data.image}
                alt=''
                style={{ maxWidth: 150, marginTop: 10, marginBottom: 10 }}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-6 col-sm-12'>
              <div className='form-group '>
                <label htmlFor='feature_image'>Thay đổi ảnh :</label>
                <input
                  style={{ width: 200 }}
                  autoComplete='off'
                  type='file'
                  className='form-control form-inFor'
                  id='image'
                  name='image'
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-6 col-sm-12'>
              <div className='form-input'>
                <div className='form-group  '>
                  <label htmlFor='title'>Tiêu đề:</label>
                  <textarea
                    style={{ width: '100%' }}
                    autoComplete='off'
                    value={data.title || ''}
                    rows='3'
                    type='text'
                    className='form-control form-inFor'
                    id='title'
                    name='title'
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <nav className='row'>
            <div className='col-12 col-md-6 col-sm-12'>
              <div className='form-input'>
                <div className='form-group  '>
                  <label htmlFor='description'>Mô tả hiện vật:</label>
                  <textarea
                    style={{ width: '100%' }}
                    autoComplete='off'
                    value={data.description || ''}
                    rows='6'
                    type='text'
                    className='form-control form-inFor'
                    id='description'
                    name='description'
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </nav>
          <div className='row'>
            <div className='col-12'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleSubmit}
              >
                Gửi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemDetail;
