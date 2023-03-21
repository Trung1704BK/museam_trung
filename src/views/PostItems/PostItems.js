import React, { useState } from 'react';
import axios from '../../api/axios';

function PostItems() {
  const [item, setItems] = useState({});
  //

  const handleChange = (e) => {
    setItems((items) => {
      return {
        ...items,
        [e.target.name]: e.target.value,
      };
    });
  };
  //

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    //
    formData.append('name', item.name);
    //
    formData.append('original', item.original);
    //
    //formData.append('ageId', item.ageId);
    //
    formData.append('collected_date', item.collected_date);
    //
    formData.append('audio', item.audio);

    //
    formData.append('description', item.description);
    //
    formData.append('dimension', item.dimension);
    //
    const imageFile = document.querySelector('#images');
    for (let i = 0; i < imageFile.files.length; i++) {
      formData.append('images', imageFile.files[i]);
    }
    //
    const featureImage = document.querySelector('#feature_image');
    formData.append('feature_image', featureImage.files[0]);
    console.log(featureImage.files[0]);

    axios
      .post('items', formData)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
    if (formData) {
      alert('Thành công!');
    }
  };

  return (
    <div className='container' style={{ marginTop: 100 }}>
      <div className='information_admin'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-xl-4'>
              <div className='form-input'>
                <div className='form-group '>
                  <label htmlFor='feature_image'>Ảnh đại diện:</label>
                  <input
                    style={{ width: '85%' }}
                    autoComplete='off'
                    type='file'
                    className='form-control form-inFor'
                    id='feature_image'
                    name='feature_image'
                    required
                  />
                </div>
                <div className='form-group  '>
                  <label htmlFor='ownerType'>Ảnh bộ sưu tập:</label>
                  <input
                    style={{ width: '85%' }}
                    autoComplete='off'
                    type='file'
                    className='form-control form-inForl'
                    id='images'
                    name='images'
                    multiple
                  />
                </div>

                <div className='form-group '>
                  <label htmlFor='name'>Tên hiện vật:</label>
                  <input
                    style={{ width: '85%' }}
                    autoComplete='off'
                    type='text'
                    className='form-control form-inFor'
                    id='name'
                    name='name'
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className='form-group  '>
                  <label htmlFor='ownerType'>Chủ sở hữu:</label>
                  <input
                    style={{ width: '85%' }}
                    autoComplete='off'
                    type='text'
                    className='form-control form-inForl'
                    id='ownerType'
                    name='ownerType'
                  />
                </div>
                <div className='form-group  '>
                  <label htmlFor='materialId'>Chất liệu :</label>
                  <input
                    style={{ width: '85%' }}
                    autoComplete='off'
                    type='text'
                    className='form-control form-inFor'
                    id='materialId'
                    name='materialId'
                  />
                </div>
                <div className='form-group  '>
                  <label htmlFor='original'>Nguồn gốc/xuất sứ:</label>
                  <input
                    style={{ width: '85%' }}
                    autoComplete='off'
                    type='text'
                    className='form-control form-inFor'
                    id='original'
                    name='original'
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-4'>
              <div className='form-input'>
                <div className='form-group '>
                  <label htmlFor='ageId'>Niên đại hiện vật:</label>
                  <input
                    style={{ width: '85%' }}
                    autoComplete='off'
                    type='text'
                    className='form-control form-inFor'
                    id='ageId'
                    name='ageId'
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group  '>
                  <label htmlFor='itemType'>Loại hiện vật:</label>
                  <input
                    style={{ width: '85%' }}
                    autoComplete='off'
                    type='text'
                    className='form-control form-inFor'
                    id='itemType'
                    name='itemType'
                  />
                </div>
                <div className='form-group  '>
                  <label htmlFor='dimension'>Kích thước hiện vật:</label>
                  <input
                    style={{ width: '85%' }}
                    autoComplete='off'
                    type='text'
                    className='form-control form-inFor'
                    id='dimension'
                    name='dimension'
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group '>
                  <label htmlFor='audio'>Audio:</label>
                  <input
                    style={{ width: '85%' }}
                    autoComplete='off'
                    type='file'
                    className='form-control form-inFor'
                    id='audio'
                    name='audio'
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group  '>
                  <label htmlFor='audio'>Ngày sưu tập:</label>
                  <input
                    style={{ width: '85%' }}
                    autoComplete='off'
                    type='date'
                    className='form-control form-inFor'
                    id='collected_date'
                    name='collected_date'
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-4'>
              <div className='form-input'>
                <div className='form-group  '>
                  <label htmlFor=''>Mô tả hiện vật:</label>
                  <textarea
                    style={{ width: '85%' }}
                    autoComplete='off'
                    rows='12'
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

export default PostItems;
