import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchEditPass } from '../../../redux/acccount/accountThunkActions';
import { useNavigate } from 'react-router-dom';
import './EditPass.css';

export default function EditPassword() {
  const dispatch = useAppDispatch();
  const [msg, setMsg] = useState();

  const [inputEdit, setInputEdit] = useState({
    login: '',
    keyWorld: '',
    newPassword: '',
  });

  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [passMessage, setPassMessage] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [showMessageSuccess, setShowMessageSuccess] = useState(false);

  const handleChange = (e) => {
    setInputEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.value.length < 8) {
      setPassMessage(true);
    } else {
      setPassMessage(false);
    }
  };

  const navigate = useNavigate();

  const submitHandlerEdit = async (e) => {
    e.preventDefault();

    await dispatch(fetchEditPass(inputEdit))
      .unwrap()
      .then((action) => {
        if (!action.msg) {
          setLoginError('Неверный логин или ключевое слово');
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 2000);
        } else {
          setLoginSuccess('НПароль успешно изменен');
          setShowMessageSuccess(true);
          setTimeout(() => {
            setShowMessageSuccess(false);
            navigate('/login');
          }, 2000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg(null);
        navigate('/login');
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [msg]);

  return (
    <div className='logContainer'>
      <form className='regLogForm' onSubmit={submitHandlerEdit}>
        {showMessageSuccess ? (
          <div className='regLogHeader' style={{ color: 'green' }}>
            Пароль изменен
          </div>
        ) : (
          <div className='regLogHeader'>Восстановить пароль</div>
        )}

        <input
          className='logInput'
          name='login'
          type='text'
          placeholder='Ваш login'
          onChange={handleChange}
          required
          style={{
            backgroundColor: showMessage && '#e04115c5',
            color: showMessage && 'white',
          }}
        />
        <input
          className='logInput'
          name='keyWorld'
          type='text'
          placeholder='Ваше ключевое слово'
          onChange={handleChange}
          required
          style={{
            backgroundColor: showMessage && '#e04115c5',
            color: showMessage && 'white',
          }}
        />

        <input
          className='logInput'
          name='newPassword'
          type='password'
          placeholder='Новый пароль'
          onChange={handleChange}
          required
        />
        {passMessage && (
          <div className='passMsg'>Пароль должен быть не меньше 8 символов</div>
        )}
        {showMessage ? (
          <button type='submit' className='loginButtonError'>
            Неверный логин или ключевое слово
          </button>
        ) : (
          <button type='submit' className='loginButton'>
            Изменить
          </button>
        )}
      </form>
    </div>
  );
}
