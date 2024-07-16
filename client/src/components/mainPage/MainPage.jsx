import { useEffect, useState } from 'react';
import './mainPage.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAllJobs } from '../../redux/jobsMain/jobsMainThunkActions';
import Carusel from './Carusel';
import imgRost from '../../../public/rost.png';
import imgDown from '../../../public/down.png';
import FilterCategors from './filterCatedor/FilterCategors';
import { fetchBuyPosts } from '../../redux/acccount/accountThunkActions';
import { fetchBuyPostsUser } from '../../redux/acccount/accountThunkActions';
import ModalPostAbout from './modalAbout/ModalPostAbout';
import types from '../account/addList/typesSub';
import { useNavigate } from 'react-router-dom';
import { Stack, Pagination } from '@mui/material';

export default function MainPage() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.authSlice.user);
  const dispatch = useAppDispatch();
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedJobs, setSortedJobs] = useState([]);
  console.log('sortedJobs==>', sortedJobs);

  //! State для отслеживания выбранной категории
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);

  const handleCategoryClick = (category, index) => {
    setSelectedCategory(category);
    setSelectedCategoryIndex(index);
  };

  //! для отправки избранной работы в бд
  const [buyWork, setBuyWork] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryTitle, setSearchQueryTitle] = useState('');
  const [filterQueryType, setFilterQueryType] = useState('');

  //! состояние для отслеживания открытия модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  //! работы из splice
  const jobReady = useAppSelector((state) => state.jobsMainSlice.jobs);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  useEffect(() => {
    if (jobReady.length > 0) {
      const sorted = [...jobReady].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.countyear - b.countyear;
        } else {
          return b.countyear - a.countyear;
        }
      });
      setSortedJobs(sorted);
    }
  }, [jobReady, sortOrder]);

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const getCategoryCounts = () => {
    const counts = {};

    jobReady.forEach((job) => {
      counts[job.subject] = (counts[job.subject] || 0) + 1;
    });

    return counts;
  };

  const handleBuy = async (job) => {
    const updatedBuyWork = [...buyWork, job];
    setBuyWork(updatedBuyWork);
    try {
      await dispatch(fetchBuyPosts(job));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = (fileName) => {
    const fileURL = `${import.meta.env.VITE_URL}/filesrar/${fileName}`;

    const link = document.createElement('a');
    link.href = fileURL;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearchNameSubject = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredResult = jobReady.filter((item) => {
      const nameSubject = item.nameSubject.toLowerCase();
      return nameSubject.includes(query);
    });
    setSortedJobs(filteredResult);
  };

  const handleSearchTitle = (e) => {
    const queryTitle = e.target.value.toLowerCase();
    setSearchQueryTitle(queryTitle);
    const filteredResultTitle = jobReady.filter((item) => {
      const titleSubject = item.title.toLowerCase();
      return titleSubject.includes(queryTitle);
    });
    setSortedJobs(filteredResultTitle);
  };

  const handleFilterType = (e) => {
    setFilterQueryType(e.target.value);
    const resultFilter = jobReady.filter((item) => {
      const filterType = item.typecategor;
      return filterType.includes(e.target.value);
    });
    setSortedJobs(resultFilter);
  };
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const filteredJobs = sortedJobs.filter(
    (job) => !selectedCategory || job.subject === selectedCategory
  );

  const [jobRender, setJobRender] = useState(false);
  console.log(jobRender);

  //! получение всех работ юзера dispatch(fetchBuyPostsUser())
  const buyPosts = useAppSelector((state) => state.accountSlice.buyPosts);
  console.log('buyPosts==>', buyPosts);
  useEffect(() => {
    dispatch(fetchBuyPostsUser());
  }, [jobRender]);

  return (
    <div className='main'>
      <div className='postForMobile'>
        Для удобства рекомендуется использовать версию с ПК
      </div>
      <div>
        <Carusel />
      </div>
      {user.login ? (
        <div>
          {user.access ? (
            <div className='allJobsInfo'>
              Доступно работ для скачивания: {jobReady.length}
            </div>
          ) : (
            <div className='allJobsInfo'>
              Доступно работ для скачивания: {jobReady.length}
              <div>Для скачивания осталось получить доступ</div>
            </div>
          )}
        </div>
      ) : (
        <div className='allJobsInfo'>
          Доступно работ для скачивания: {jobReady.length}
          <div>
            Войдите в аккаунт и получите доступ, что бы скачать нужную себе
            работу
          </div>
        </div>
      )}

      <div className='mainFlexBox'>
        <div className='fullScreen'>
          <FilterCategors
            onSelectCategory={filterByCategory}
            categoryCounts={getCategoryCounts()}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
        </div>

        <div className='posts'>
          <div className='filterSortSearch'>
            <div className='sortDiv' onClick={handleSort}>
              {sortOrder === 'asc' ? (
                <img className='imgSort' src={imgDown} alt='Убывание' />
              ) : (
                <img className='imgSort' src={imgRost} alt='Возрастание' />
              )}
            </div>
            <div className='flexMobileFilter'>
              <div className='mobileScreen'>
                <FilterCategors
                  onSelectCategory={filterByCategory}
                  categoryCounts={getCategoryCounts()}
                  selectedCategory={selectedCategory}
                  onCategoryClick={handleCategoryClick}
                />
              </div>
              <div className='selectTypeDiv'>
                <select
                  name='selectedType'
                  className='academicSubMain'
                  value={filterQueryType}
                  onChange={handleFilterType}
                >
                  {types.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='inputSearchKey'>
              <input
                type='text'
                placeholder='Поиск по предмету'
                value={searchQuery}
                className='searchInputMain'
                onChange={(e) => handleSearchNameSubject(e)}
              />

              <input
                type='text'
                placeholder='Поиск по названию'
                value={searchQueryTitle}
                className='searchInputMain'
                onChange={(e) => handleSearchTitle(e)}
              />
            </div>
          </div>

          <div className='readyJob'>
            {sortedJobs.length ? (
              sortedJobs
                .filter(
                  (job) => !selectedCategory || job.subject === selectedCategory
                )
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((job) => (
                  <div key={job.id} className='borderJob'>
                    <div className='infoJob'>
                      <div className='nameSubject'>{job.title}</div>
                      <div className='nameSubject'>{job.nameSubject}</div>
                    </div>

                    <div className='aboutJob'>
                      Описание:{' '}
                      {job.body.length > 70
                        ? job.body.substring(0, 70) + '...'
                        : job.body}
                    </div>
                    <div className='aboutJob'>
                      Отрывок:{' '}
                      {job.bodypart.length > 70
                        ? job.bodypart.substring(0, 70) + '...'
                        : job.bodypart}
                    </div>

                    <div className='infoJob' id='mobileInfo'>
                      <div>Количество страниц: {job.countpage}</div>
                      <div>Год написания: {job.countyear}</div>
                      {job.countpercent ? (
                        <div>
                          <b>Оригинальность:</b> {job.countpercent}%
                        </div>
                      ) : (
                        <div>Оригинальность: не указана</div>
                      )}
                    </div>
                    <div className='infoJob' id='mobileInfo'>
                      <div>Категория: {job.subject}</div>
                      <div>Тип работы: {job.typecategor}</div>
                    </div>

                    {user.login ? (
                      <div>
                        {user.access ? (
                          <div className='redBTN'>
                            {buyPosts.length &&
                            buyPosts.find(
                              (post) => post.title === job.title
                            ) ? (
                              <button className='btnMainOptionsDis'>✔️</button>
                            ) : (
                              <button
                                className='btnMainOptions'
                                onClick={() => {
                                  handleBuy(job);
                                  setJobRender(true);

                                  setTimeout(() => {
                                    setJobRender(false);
                                  }, 1000);
                                }}
                              >
                                В избранное
                              </button>
                            )}

                            <button
                              className='btnMainOptions'
                              onClick={() => handleDownload(job.filerar)}
                            >
                              Скачать
                            </button>
                            <button
                              className='btnMainOptions'
                              type='submit'
                              onClick={() => openModal(job)}
                            >
                              Больше
                            </button>
                          </div>
                        ) : (
                          <div className='accessDanger'>
                            <button
                              className='btnMainOptions'
                              onClick={() => navigate('/access')}
                            >
                              Получить доступ
                            </button>
                            <button
                              className='btnMainOptions'
                              type='submit'
                              onClick={() => openModal(job)}
                            >
                              Больше про работу
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className='accessDanger'>
                        <button
                          className='btnMainOptions'
                          onClick={() => navigate('/login')}
                        >
                          Скачать
                        </button>
                        <button
                          className='btnMainOptions'
                          type='submit'
                          onClick={() => openModal(job)}
                        >
                          Больше про работу
                        </button>
                      </div>
                    )}
                  </div>
                ))
            ) : (
              <h4>По вашему поиску результатов нет</h4>
            )}
          </div>

          <Stack mt={2} style={{ alignItems: 'center' }}>
            <Pagination
              count={Math.ceil(filteredJobs.length / itemsPerPage)}
              color='primary'
              variant='outlined'
              page={page}
              onChange={(event, value) => setPage(value)}
              size='small'
              sx={{
                '.MuiPaginationItem-root': {
                  fontSize: 'inherit',
                  minWidth: '20px',
                  minHeight: '15px',
                },
              }}
            />
          </Stack>
        </div>
      </div>
      {isModalOpen}
      <ModalPostAbout
        isOpen={isModalOpen}
        post={selectedPost}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
