import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchSignIn } from '../../../redux/auth/authThunkActions';

export default function Login() {
  const [data, setData] = useState({
    login: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [passMessage, setPassMessage] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchSignIn(data))
      .unwrap()
      .then((action) => {
        if (!action.msg) {
          navigate('/');
        } else {
          setLoginError('Неверный логин или пароль');
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
    <div className='logContainer'>
      <form className='regLogForm' onSubmit={handleSubmit}>
        <div className='regLogHeader'>Авторизация</div>
        <input
          className='logInput'
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

        <input
          className='logInput'
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
          style={{
            backgroundColor: showMessage && '#e04115c5',
            color: showMessage && 'white',
          }}
        />
        {passMessage && (
          <div className='passMsg'>Пароль должен быть не меньше 8 символов</div>
        )}
        {showMessage ? (
          <button type='submit' className='loginButtonError'>
            Неверный логин или пароль
          </button>
        ) : (
          <button type='submit' className='loginButton'>
            Войти
          </button>
        )}

        <div className='dopBtn'>
          <button
            type='button'
            className='secondaryButton'
            onClick={() => navigate('/register')}
          >
            Создать аккаунт
          </button>
          <button
            type='button'
            className='secondaryButton'
            onClick={() => navigate('/editPassword')}
          >
            Новый пароль
          </button>
        </div>
      </form>
    </div>
  );
}
