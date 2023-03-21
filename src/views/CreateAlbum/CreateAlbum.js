import React, { useState } from 'react';
import axios from '../../api/axios';

function CreateAlbum() {
  const [collection, setCollection] = useState({});
  //

  const handleChange = (e) => {
    setCollection({
      ...collection,
      [e.target.name]: e.target.value,
    });
  };
  //

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    //

    const image = document.querySelector('#image');
    formData.append('image', image.files[0]);
    console.log(image.files[0]);
    //
    formData.append('title', collection.title);
    formData.append('description', collection.description);

    axios
      .post('collections', formData)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
    if (formData) {
      alert('Thành Công!');
    }
  };

  return (
    <div className='container' style={{ marginTop: 100 }}>
      <div className='information_admin'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-12 col-md-5 col-sm-12'>
              <div className='form-input'>
                <div className='form-group '>
                  <label htmlFor='image'>Ảnh album:</label>
                  <input
                    autoComplete='off'
                    type='file'
                    className='form-control form-inFor'
                    id='image'
                    name='image'
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-6 col-sm-12'>
              <div className='form-input'>
                <div className='form-group  '>
                  <label htmlFor='title'>Tiêu đề:</label>
                  <textarea
                    autoComplete='off'
                    rows={'2'}
                    type='text'
                    className='form-control form-inFor'
                    id='title'
                    name='title'
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-6 col-sm-12'>
              <div className='form-input'>
                <div className='form-group  '>
                  <label htmlFor='description'>Mô tả:</label>
                  <textarea
                    autoComplete='off'
                    rows={'5'}
                    type='text'
                    className='form-control form-inFor'
                    id='description'
                    name='description'
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAlbum;
