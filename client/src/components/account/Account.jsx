import { useState } from 'react';
import './acc.css';
import { useAppSelector } from '../../redux/hooks';
import ModalEditAcc from './modalEditAcc';
import AddList from './addList/AddList';
import AllWorkUser from './allWorkUser/AllWorkUser';
import BuyWorkUser from './buyWorkUser/BuyWorkUser';

export default function Account() {
  const user = useAppSelector((state) => state.authSlice.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedUser, setselectedUser] = useState(null);

  const openModal = (user) => {
    setselectedUser(user);
    setIsModalOpen(true);
  };

  const posts = useAppSelector((state) => state.accountSlice.posts);
  const buyPosts = useAppSelector((state) => state.accountSlice.buyPosts);

  return (
    <>
      <div className='mainBlock'>
        <div className='userAcc'>
          <div>
     {user.avatar ? (
            <img
              src={`http://localhost:3000/images/${user.avatar}`}
              alt='Стандартное фото'
              className='previewImageAcc'
            />
          ) : (
            <img
              src='imageCar/defaultAvatar.jpg'
              alt='Стандартное фото'
              className='previewImageAcc'
            />
          )}

          <div className='naviLogin'>Добро пожаловать, {user.login}</div>
          <button
            type='button'
            className='btnAccPhoto'
            onClick={() => openModal(user)}
          >
            Изменить фото
          </button>

          </div>
     
          <div className='countJob'>
            <div className='dopka'>
              <div className='textCount'>Ваши работы</div>
              <div className='countjobik'>{posts.length}</div>
            </div>
            <div className='dopka'>
              <div className='textCount'>Избранные работы</div>
              <div className='countjobik'>{buyPosts.length}</div>
            </div>
          </div>
        </div>
        <div className='info'>
          <AddList />
        </div>
      </div>
      <div className='workDo'>
        <div className='yourJob'>
          <div>Ваши работы</div>
          <div>
            <AllWorkUser />
          </div>
        </div>
        <div className='payJob'>
          <div>Избранные работы</div>
          <div>
            <BuyWorkUser />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='overlay' onClick={() => setIsModalOpen(false)} />
      )}
      {isModalOpen && (
        <ModalEditAcc
          isOpen={isModalOpen}
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
