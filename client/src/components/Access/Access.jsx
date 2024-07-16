import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchEditStatus } from '../../redux/auth/authThunkActions';
import './access.css';
import { fetchAllWorksUser } from '../../redux/acccount/accountThunkActions';

export default function Access() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.accountSlice.posts);

  useEffect(() => {
    dispatch(fetchAllWorksUser());
  }, [dispatch]);

  const navigate = useNavigate();

  const handlerAccess = () => {
    navigate('/acc');
  };

  const [accessMsg, setAccessMsg] = useState(false);
  const [accessMsgErr, setAccessMsgErr] = useState(false);

  const handlerBuy = async () => {
    try {
      await dispatch(fetchEditStatus({ userAccess: true }));
      setAccessMsg(true);
      setTimeout(() => {
        setAccessMsg(false);
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      setAccessMsgErr(true);
      setTimeout(() => {
        setAccessMsgErr(false);
      }, 1500);
    }
  };

  return (
    <div className='mainAccess'>
      {accessMsg && (
        <div className='successMessage'>Безлимитный доступ успешно получен</div>
      )}
      {accessMsgErr && (
        <div className='successMessage'>Ошибка получения доступа</div>
      )}
      <h2>Для получения доступа необходимо выполнить два шага:</h2>
      <div className='boxAccess'>
        <div className='addJob'>
          <h2>1. Опубликовать в базу знаний одну из своих учебных работ</h2>
          {posts.length > 0 ? (
            <div className='boxBlockAccess'>
              <img src='/addJob2.jpg' alt='Успех' className='imgJob2' />
              <button className='btnAcc' style={{ backgroundColor: 'gray' }}>
                Загрузить работу
              </button>
            </div>
          ) : (
            <div className='boxBlockAccess'>
              <img
                src='/addJob.jpg'
                alt='Загрузить работу'
                className='imgJob'
              />{' '}
              <button
                className='btnAcc'
                onClick={() => {
                  handlerAccess();
                }}
              >
                Загрузить работу
              </button>
            </div>
          )}
        </div>
        <div className='buyAccess'>
          <h2>
            2. Получить безлимитный доступ к базе знаний, оплатив подписку 1000
            р
          </h2>
          {posts.length === 0 ? (
            <div className='boxBlockAccess'>
              <img
                src='/buyJobGray.jpg'
                alt='Загрузить работу'
                className='imgJobNoAccess'
              />
              <button className='btnAcc' style={{ backgroundColor: 'gray' }}>
                Оплатить
              </button>
            </div>
          ) : (
            <div className='boxBlockAccess'>
              {' '}
              <img
                src='/buyJob.jpg'
                alt='Загрузить работу'
                className='imgJob'
              />
              <button
                className='btnAcc'
                onClick={() => {
                  handlerBuy();
                }}
              >
                Оплатить
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
