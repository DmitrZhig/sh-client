import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAllWorksUser } from '../../../redux/acccount/accountThunkActions';
import { Stack, Pagination } from '@mui/material';
import './allWorkAcc.css';

export default function AllWorkUser() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.accountSlice.posts);

  //! получение всех работ юзера dispatch(fetchAllWorksUser())
  useEffect(() => {
    dispatch(fetchAllWorksUser());
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  return (
    <div>
      {posts.length ? (
        posts
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
            </div>
          ))
      ) : (
        <h4>Ваших работ пока нет</h4>
      )}{' '}
      <Stack mt={2} style={{ alignItems: 'center' }}>
        <Pagination
          count={Math.ceil(posts.length / itemsPerPage)}
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
              fontSize:'14px',
              padding: '0'
            },
          }}
        />
      </Stack>
    </div>
  );
}
