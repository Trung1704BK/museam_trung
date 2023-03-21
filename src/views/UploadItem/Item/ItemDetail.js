import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItemDetail.css';
import axios from '../../../api/axios';

function ItemDetail() {
  console.log('render');
  const [item, setItem] = useState({});
  //
  //

  const [deleteImages, setDeleteImages] = useState([]);
  const { item_id } = useParams();

  //

  useEffect(() => {
    getItem();
  }, []);
  //
  const getItem = () => {
    const url = `items/${item_id}`;
    axios.get(url).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setItem(res.data.item);
      }
    });
  };

  // Get current posts
  const handleChange = (e) => {
    setItem((item) => {
      return {
        ...item,
        [e.target.name]: e.target.value,
      };
    });
  };
  //
  const handleDelete = async () => {
    if (deleteImages.length === 0) {
      return alert('Bạn chưa chọn ảnh !');
    }
    const url = `items/${item_id}/images`;
    if(confirm('Bạn có muốn xóa ảnh không !')===true){

    
    const res = await axios.delete(url, {
      data: {
        deleteImages: deleteImages,
      },
    });

    //Set lai item
    const newItem = { ...item };

    newItem.images = newItem.images.filter((value) => {
      return !deleteImages.includes(value.image_id);
    });

    if (res.message) {
      alert('Không được phép thay đổi !');
    } else {
      setItem(newItem);
      setDeleteImages([]);
    }
  }
    //

    //
  };

  // const addOrRemoveDeleteImages = (image_id) => {
  //   const cloneDeleteImages = [...deleteImages];
  //   const findImageIndex = cloneDeleteImages.indexOf(image_id);
  //   console.log(image_id);
  //   console.log('check', findImageIndex);
  //   if (findImageIndex !== -1) {
  //     cloneDeleteImages.splice(findImageIndex, 1);
  //   } else {
  //     cloneDeleteImages.push(image_id);
  //   }
  //   setDeleteImages(cloneDeleteImages);
  // };
  // const handleDelete = async () => {
  //   const url = `items/${item_id}/images`;
  //   await axios.delete(url, {
  //     data: {
  //       deleteImages: deleteImages,
  //     },
  //   });
  //   //
  //   const newItem = { ...item };
  //   newItem.images = newItem.images.filter((value) => {
  //     return !deleteImages.includes(value.image_id);
  //   });
  //   setItem(newItem);
  //   //
  //   setDeleteImages([]);
  // };

  //
  const addOrRemoveDeleteImages = (image_id) => {
    console.log(image_id);
    const cloneDeleteImages = [...deleteImages];
    //
    // const checkIndexofImages = cloneDeleteImages.indexOf(image_id);
    // console.log(checkIndexofImages);
    // if (checkIndexofImages === -1) {
    //   cloneDeleteImages.push(image_id);
    // }
    cloneDeleteImages.push(image_id);
    console.log(cloneDeleteImages);

    //

    setDeleteImages(cloneDeleteImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    //
    formData.append('name', item.name);
    //
    formData.append('ownerType', item.ownerType);
    //
    formData.append('itemType', item.itemType);
    //
    formData.append('collected_date', item.collected_date);
    //
    formData.append('description', item.description);
    //
    const featureImage = document.querySelector('#feature_image');
    formData.append('feature_image', featureImage.files[0]);
    //
    const imageFile = document.querySelector('#images');
    for (let i = 0; i < imageFile.files.length; i++) {
      formData.append('images', imageFile.files[i]);
    }
    //
    const audio = document.querySelector('#audio');
    formData.append('audio', audio.files[0]);

    axios
      .put(`items/${item_id}`, formData)
      .then((responsive) => {
        console.log(responsive);
      })
      .catch((err) => {
        console.log(err);
      });

    //
  };

  //

  // Change page

  //

  return (
    <div className='container' style={{ marginTop: 100 }}>
      <div className='information_admin'>
        <form className='form_data'>
          <div className='row'>
            <div className='col-12'>
              <span style={{ fontWeight: 500 }}>Ảnh đại diện:</span>
              <br />
              <img
                src={item.feature_image}
                alt=''
                style={{ maxWidth: 150, marginTop: 10, marginBottom: 10 }}
              />
              <div className='form-group '>
                <label htmlFor='feature_image'>Thay đổi ảnh đại diện :</label>
                <input
                  style={{ width: '31%' }}
                  autoComplete='off'
                  type='file'
                  className='form-control form-inFor'
                  id='feature_image'
                  name='feature_image'
                />
              </div>
            </div>
            <div className='col-12'>
              <span style={{ fontWeight: 500 }}>Ảnh hiện vật:</span>
            </div>
            <div className='col-12  items-image    '>
              {item.images?.map((value) => {
                return (
                  <div key={value.image_id} className='image_id'>
                    <img
                      src={value.url}
                      alt=''
                      style={{
                        width: '100px',
                        height: '120px',
                        marginRight: 30,
                      }}
                    />
                    <br />
                    <input
                      type='checkbox'
                      onClick={() => addOrRemoveDeleteImages(value.image_id)}
                    />
                  </div>
                );
              })}
            </div>
            <div className='col-12'>
              <div style={{ marginTop: 10 }}>
                <span style={{ color: 'red' }}>
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={handleDelete}
                  >
                    Xóa
                  </button>
                </span>
              </div>
            </div>
            <div className='col-12'>
              <div className='form-group '>
                <label htmlFor='images'>Thay đổi ảnh hiện vật :</label>
                <input
                  style={{ width: '30%' }}
                  autoComplete='off'
                  type='file'
                  className='form-control form-inFor'
                  id='images'
                  name='images'
                  multiple
                />
              </div>
            </div>

            <div className='col-12'>
              <div className='row'>
                <div className='col-4'>
                  <div className='form-group  '>
                    <label htmlFor='name'>Tên vật phẩm:</label>
                    <input
                      style={{ width: '100%' }}
                      value={item.name || ''}
                      autoComplete='off'
                      type='text'
                      className='form-control form-inFor'
                      id='name'
                      name='name'
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-4'>
                  <div className='form-group  '>
                    <label htmlFor='ownerType'>Chủ sở hữu:</label>
                    <input
                      style={{ width: '100%' }}
                      value={item.ownerType || ''}
                      autoComplete='off'
                      type='text'
                      className='form-control form-inFor'
                      id='ownerType'
                      name='ownerType'
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-4'>
                  <div className='form-group  '>
                    <label htmlFor='materialId'>Chất liệu:</label>
                    <input
                      style={{ width: '100%' }}
                      value={item.materialId || ''}
                      autoComplete='off'
                      type='text'
                      className='form-control form-inFor'
                      id='materialId'
                      name='materialId'
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12'>
              <div className='row'>
                <div className='col-4'>
                  <div className='form-group  '>
                    <label htmlFor='original'>Nguồn gốc/xuất sứ:</label>
                    <input
                      style={{ width: '100%' }}
                      value={item.original || ''}
                      autoComplete='off'
                      type='text'
                      className='form-control form-inFor'
                      id='original'
                      name='original'
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-4'>
                  <div className='form-group  '>
                    <label htmlFor='ageId'>Niên đại hiện vật:</label>
                    <input
                      style={{ width: '100%' }}
                      value={item.ageId || ''}
                      autoComplete='off'
                      type='text'
                      className='form-control form-inFor'
                      id='ageId'
                      name='ageId'
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-4'>
                  <div className='form-group  '>
                    <label htmlFor='itemType'>Loại hiện vật:</label>
                    <input
                      style={{ width: '100%' }}
                      value={item.itemType || ''}
                      autoComplete='off'
                      type='text'
                      className='form-control form-inFor'
                      id='itemType'
                      name='itemType'
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <nav className='col-12'>
              <div className='row'>
                <div className='col-4'>
                  <div className='form-group  '>
                    <label htmlFor='dimension'>Kích thước hiện vật:</label>
                    <input
                      style={{ width: '100%' }}
                      value={item.dimension || ''}
                      autoComplete='off'
                      type='text'
                      className='form-control form-inFor'
                      id='dimension'
                      name='dimension'
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-4'>
                  <div className='form-group  '>
                    <label htmlFor='audio'>Audio:</label>
                    <input
                      style={{ width: '100%' }}
                      autoComplete='off'
                      type='file'
                      className='form-control form-inFor'
                      id='audio'
                      name='audio'
                    />
                  </div>
                </div>

                <div className='col-4'>
                  <div className='form-group  '>
                    <label htmlFor='collected_date'>Ngày sưu tập:</label>
                    <input
                      style={{ width: '100%' }}
                      value={item.collected_date || ''}
                      autoComplete='off'
                      type='text'
                      className='form-control form-inFor'
                      id='collected_date'
                      name='collected_date'
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </nav>
            <div className='col-12'>
              <div className='row'>
                <div className='col-8'>
                  <div className='form-input'>
                    <div className='form-group  '>
                      <label htmlFor=''>Mô tả hiện vật:</label>
                      <textarea
                        style={{ width: '100%' }}
                        autoComplete='off'
                        value={item.description || ''}
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
              </div>
            </div>

            <div className='col-3'>
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
