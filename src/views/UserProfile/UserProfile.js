import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.css';
import axios from 'axios';
import validator from 'validator';

function UserProfile() {
  const [err, setErr] = useState({});

  const [collector, setCollector] = useState({});
  //
  useEffect(() => {
    axios
      .get('auth/collector')
      .then((res) => {
        console.log('check', res);
        setCollector(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    // setCollector({
    //   ...collector,
    //   [e.target.name]: e.target.value,
    // });

    setCollector((collector) => {
      return {
        ...collector,
        [e.target.name]: e.target.value,
      };
    });
    //
  };
  //

  const Validate = () => {
    const err = {};

    if (collector.full_name === '') {
      err.full_name = 'Họ tên không được để trống';
    }
    const testEmail = collector.email;
    if (!validator.isEmail(testEmail) || testEmail === '') {
      err.email = 'Sai địa chỉ email';
    }
    if (collector.birth_date === '') {
      err.birth_date = 'Ngày sinh không được để trống';
    }

    if (collector.sex === '') {
      err.sex = 'Giới tính không được để trống';
    }
    if (collector.districtId === '') {
      err.districtId = 'Quận/huyện không được để trống';
    }
    if (collector.provinceId === '') {
      err.provinceId = 'Tỉnh/Thành phố không được để trống';
    }
    if (collector.address === '') {
      err.address = 'Tỉnh/Thành phố không được để trống';
    }

    return err;
  };

  //

  //

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(Validate(collector)).length !== 0) {
      setErr(Validate(collector));
      return;
    } else {
      setErr({});
    }
    axios
      .put(
        `auth/collector/modify`,
        JSON.stringify({
          full_name: collector.full_name,
          email: collector.email,
          address: collector.address,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        if (res.response?.data.message) {
          if (
            res.response.data.message === 'Đã thay đổi thông tin thành công! '
          ) {
            alert('Vui lòng thử lại');
          } else {
            console.log('check', res);
          }

          //alert(res.response.data.message);
        } else {
          alert(res.data.message);
        }

        console.log('checked', res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //

  return (
    <div className='container'>
      {' '}
      <div className='information_admin' style={{ marginTop: 50 }}>
        {' '}
        <form>
          <div className='img_container' style={{ marginBottom: 20 }}>
            {' '}
            <img src={collector.avatar || ''} alt='Avatar' className='avatar' />
          </div>
          <div className='row'>
            <div className='col-xl-6 '>
              <div className='form-collector'>
                <div className='form-group '>
                  <label htmlFor='full_name'>Họ tên:</label>
                  <input
                    value={collector.full_name || ''}
                    autoComplete='off'
                    type='text'
                    className='form-control'
                    id='full_name'
                    name='full_name'
                    onChange={handleChange}
                  />
                  {err.full_name && (
                    <span
                      style={{
                        fontSize: 13,
                        color: 'red',
                        fontWeight: 500,
                      }}
                    >
                      {err.full_name}
                    </span>
                  )}
                </div>
                <div className='form-group'>
                  <label htmlFor='mobile'>Số điện thoại:</label>
                  <input
                    defaultValue={collector.mobile || ''}
                    type='tel'
                    className='form-control'
                    id='mobile'
                    disabled
                    name='mobile'
                  />
                  <span
                    style={{ fontSize: 13, color: 'red', fontWeight: 500 }}
                  ></span>
                </div>
                <div className='form-group'>
                  <label htmlFor='email'>Email:</label>
                  <input
                    value={collector.email || ''}
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    onChange={handleChange}
                  />
                  {err.email && (
                    <span
                      style={{
                        fontSize: 13,
                        color: 'red',
                        fontWeight: 500,
                      }}
                    >
                      {err.email}
                    </span>
                  )}
                </div>
                <div className='form-group'>
                  <label htmlFor='birth_date'>Ngày sinh:</label>
                  <input
                    type='date'
                    value={collector.birth_date || ''}
                    className='form-control'
                    id='birth_date'
                    name='birth_date'
                    onChange={handleChange}
                  />
                  {err.birth_date && (
                    <span
                      style={{
                        fontSize: 13,
                        color: 'red',
                        fontWeight: 500,
                      }}
                    >
                      {err.birth_date}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className='col-xl-6'>
              <div className='form-collector'>
                <div className='form-group '>
                  <label htmlFor='sex'>Giới tính:</label>
                  <input
                    value={collector.sex || ''}
                    type='text'
                    className='form-control'
                    id='sex'
                    name='sex'
                    onChange={handleChange}
                  />
                  {err.sex && (
                    <span
                      style={{
                        fontSize: 13,
                        color: 'red',
                        fontWeight: 500,
                      }}
                    >
                      {err.sex}
                    </span>
                  )}
                </div>
                <div className='form-group'>
                  <label htmlFor='districtId'>Quận/Huyện:</label>
                  <input
                    value={collector.districtId || ''}
                    type='text'
                    className='form-control'
                    id='districtId'
                    name='districtId'
                    onChange={handleChange}
                  />
                  {err.districtId && (
                    <span
                      style={{
                        fontSize: 13,
                        color: 'red',
                        fontWeight: 500,
                      }}
                    >
                      {err.districtId}
                    </span>
                  )}
                </div>
                <div className='form-group'>
                  <label htmlFor='provinceId'>Tỉnh/Thành phố:</label>
                  <input
                    value={collector.provinceId || ''}
                    type='provinceId'
                    className='form-control'
                    id='provinceId'
                    name='provinceId'
                    onChange={handleChange}
                  />
                  {err.provinceId && (
                    <span
                      style={{
                        fontSize: 13,
                        color: 'red',
                        fontWeight: 500,
                      }}
                    >
                      {err.provinceId}
                    </span>
                  )}
                </div>
                <div className='form-group'>
                  <label htmlFor='address'>Địa chỉ:</label>
                  <input
                    type='text'
                    value={collector.address || ''}
                    className='form-control'
                    id='address'
                    name='address'
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group change_pass'>
                  <Link to='/admin/changePass'>
                    <span
                      style={{
                        fontSize: 14,

                        fontWeight: 400,
                      }}
                    >
                      Thay đổi mật khẩu
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <button
            type='submit'
            className='btn btn-primary'
            onClick={(e) => handleSubmit(e)}
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
