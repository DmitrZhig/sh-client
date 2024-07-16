import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchBuyPostsUser } from '../../../redux/acccount/accountThunkActions';
import { Stack, Pagination } from '@mui/material';

export default function BuyWorkUser() {
  const dispatch = useAppDispatch();
  const buyPosts = useAppSelector((state) => state.accountSlice.buyPosts);

  //! получение всех работ юзера dispatch(fetchBuyPostsUser())
  useEffect(() => {
    dispatch(fetchBuyPostsUser());
  }, [dispatch]);

  const handleDownload = (fileName) => {
    const fileURL = `http://localhost:3000/filesrar/${fileName}`;

    const link = document.createElement('a');
    link.href = fileURL;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  return (
    <div>
      {buyPosts.length ? (
        buyPosts
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((job) => (
            <div key={job.id} className='borderJobAcc'>
              <div className='infoJobAcc'>
                <div className='mainNameJob'>{job.title}</div>
                <div className='mainNameJob'>{job.nameSubject}</div>
              </div>

              <div className='infoJobAcc'>
                <div className='dopInfaJob'>
                  Количество страниц: {job.countpage}
                </div>
                <div className='dopInfaJob'>Год написания: {job.countyear}</div>
                {job.countpercent ? (
                  <div className='dopInfaJob'>
                    Оригинальность: {job.countpercent}%
                  </div>
                ) : (
                  <div className='dopInfaJob'>Оригинальность: не указана</div>
                )}
              </div>
              <div className='infoJobAcc'>
                <div className='dopInfaJob'>{job.subject}</div>
                <div className='dopInfaJob'>{job.typecategor}</div>
              </div>
              <button
                className='btnAccLike'
                onClick={() => handleDownload(job.filerar)}
              >
                Скачать файл
              </button>
            </div>
          ))
      ) : (
        <h4>Вы пока ничего не добавили</h4>
      )}
      <Stack mt={2} style={{ alignItems: 'center' }}>
        <Pagination
          count={Math.ceil(buyPosts.length / itemsPerPage)}
          color='primary'
          variant='outlined'
          page={page}
          onChange={(event, value) => setPage(value)}
          size='small'
          sx={{
            '.MuiPaginationItem-root': {
              fontSize: 'inherit',
              minWidth: '14px',
              minHeight: '10px',
              fontSize: '14px',
              padding: '0',
            },
          }}
        />
      </Stack>
    </div>
  );
}
