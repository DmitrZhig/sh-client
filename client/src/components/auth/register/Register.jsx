import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchSignUp } from '../../../redux/auth/authThunkActions';

export default function Register() {
  const [data, setData] = useState({
    login: '',
    email: '',
    keyWorld: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [passMessage, setPassMessage] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchSignUp(data))
      .unwrap()
      .then((action) => {
        if (!action.msg) {
          navigate('/');
        } else {
          setLoginError('Логин или эмейл заняты');
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='regLogContainer'>
      <form className='regLogForm' onSubmit={handleSubmit}>
        <div className='regLogHeader'>Регистрация </div>
        <input
          className='regInput'
          name='login'
          type='text'
          placeholder='Логин'
          onChange={(e) => setData({ ...data, login: e.target.value })}
          required
          style={{
            backgroundColor: showMessage && '#e04115c5',
            color: showMessage && 'white',
          }}
        />
        <span />
        <input
          className='regInput'
          name='email'
          type='email'
          placeholder='E-mail'
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
          style={{
            backgroundColor: showMessage && '#e04115c5',
            color: showMessage && 'white',
          }}
        />
        <input
          className='regInput'
          name='keyWorld'
          type='text'
          placeholder='Ключевое слово'
          onChange={(e) => setData({ ...data, keyWorld: e.target.value })}
          required
        />
        <span />
        <span />
        <input
          className='regInput'
          name='password'
          type='password'
          placeholder='Пароль'
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
            if (e.target.value.length < 8) {
              setPassMessage(true);
            } else {
              setPassMessage(false);
            }
          }}
          required
        />
        {passMessage && (
          <div className='passMsg'>Пароль должен быть не меньше 8 символов</div>
        )}{' '}
        <div className='keyWorldDiv'>
          Ключевое слово необходимо для восстановления вашего пароля, запишите
          его
        </div>
        {showMessage ? (
          <button type='submit' className='regButtonError'>
            Логин или эмейл заняты
          </button>
        ) : (
          <button type='submit' className='regButton'>
            Создать
          </button>
        )}
      </form>
      <span />
    </div>
  );
}
