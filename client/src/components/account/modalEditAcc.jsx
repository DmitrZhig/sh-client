import React, { useState } from 'react';
import './modalEdit.css';
import { fetchEditAcc } from '../../redux/acccount/accountThunkActions';
import { useAppDispatch } from '../../redux/hooks';

export default function modalEditAcc({ isOpen, user, onClose }) {
  const dispatch = useAppDispatch();
  if (!isOpen || !user) return null;
  const [inputs, setInputs] = useState({
    name: '',
    avatar: null,
    password: '',
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      const file = e.target.files[0];
      if (file) {
        setInputs((prev) => ({ ...prev, avatar: file }));
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
      } else {
        console.error('No file selected.');
      }
    } else {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const submitHandlerEdit = async () => {
    const data = new FormData();

    data.append('id', user.id);
    data.append('avatar', inputs.avatar);
    try {
      await dispatch(fetchEditAcc(data));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    window.location.href = '/acc';
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        {previewImage ? (
          <img src={previewImage} alt='Предпросмотр' className='previewImage' />
        ) : (
          <img
            src='imageCar/defaultAvatar.jpg'
            alt='Стандартное фото'
            className='previewImage'
          />
        )}

        <form encType='multipart/form-data' className='formEditMaster'>
          <label htmlFor='photo'>
            <div className='infoTextLabel'>
              {' '}
              Выберите новое фото:
              <input
                type='file'
                name='avatar'
                onChange={handleChange}
                className='inputUser'
              />
            </div>
          </label>
          <img
            src='imageCar/hm.png'
            alt='Стандартное фото'
            className='hmImage'
          />
          <button
            type='button'
            className='btnAcc'
            onClick={() => {
              submitHandlerEdit();
              reset();
            }}
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
