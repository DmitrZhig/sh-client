import './modal.css';

export default function ModalPostAbout({ isOpen, post, onClose }) {
  if (!isOpen || !post) return null;

  return (
    <div className='modalContainer'>
      <div className='modalContent'>
        <span className='closeButton' onClick={onClose}>
          &times;
        </span>
        <div className='mainsubDiscript'>
          <div>{post.title}</div>
          <div>{post.nameSubject}</div>
        </div>

        <div className='scrollModal'>
          <div>Описание: {post.body}</div>
          <div style={{ marginTop: '20px' }}>Отрывок: {post.bodypart}</div>
        </div>

        <div className='borderJobModal'>
          <div>Количество страниц: {post.countpage}</div>
          <div>Год написания: {post.countyear}</div>
          {post.countpercent ? (
            <div>
              <b>Оригинальность:</b> {post.countpercent}%
            </div>
          ) : (
            <div>Оригинальность: не указана</div>
          )}
        </div>
        <div className='borderJobModal'>
          <p>Категория: {post.subject}</p>
          <p>Тип работы: {post.typecategor}</p>
        </div>
      </div>
    </div>
  );
}
