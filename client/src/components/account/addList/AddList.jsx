import React, { useState } from 'react';
import './addList.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAddSubject } from '../../../redux/addSub/addSubThunkActions';
import types from './typesSub';
import subjects from './subjTypes';
import { useNavigate } from 'react-router-dom';
import { Tooltip, styled, tooltipClasses } from '@mui/material';

export default function AddList() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.authSlice.user);

  const [inputAdd, setInputAdd] = useState({
    fileRar: null,
    title: '',
    nameSubject: '',
    body: '',
    bodyPart: '',
    countPage: '',
    countYear: '',
    countPercent: '',
    selectedSubject: '',
    selectedType: '',
  });
  console.log(inputAdd)

  const [successMessage, setSuccessMessage] = useState(false);
  const [successMessageRar, setSuccessMessageRar] = useState(false);
  const [successMessageFields, setSuccessMessageFields] = useState(false);
  const [successFormat, setSuccessFormat] = useState(false);
  const [controlBtn, setControlBtn] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'fileRar') {
      const file = files?.[0];
      setInputAdd((prev) => ({ ...prev, [name]: file }));
    } else {
      setInputAdd((prev) => ({ ...prev, [name]: value }));
    }
  };

  const navigate = useNavigate();

  const handlerSave = async () => {
    const allowedFileTypes = [
      'application/x-rar-compressed',
      'application/zip',
      'application/x-zip-compressed',
      '',
    ];

    if (!inputAdd.fileRar) {
      setSuccessMessageRar(true);
      setTimeout(() => {
        setSuccessMessageRar(false);
      }, 1500);
      return;
    }

    if (!allowedFileTypes.includes(inputAdd.fileRar.type)) {
      setSuccessFormat(true);
      setTimeout(() => {
        setSuccessFormat(false);
      }, 2500);

      return;
    }
    setControlBtn(false);
    if (
      !inputAdd.title ||
      !inputAdd.nameSubject ||
      !inputAdd.body ||
      !inputAdd.bodyPart ||
      !inputAdd.countPage ||
      !inputAdd.countYear ||
      !inputAdd.selectedSubject ||
      !inputAdd.selectedType
    ) {
      setSuccessMessageFields(true);
      setTimeout(() => {
        setSuccessMessageFields(false);
      }, 1500);
      return;
    }
    const data = new FormData();
    data.append('fileRar', inputAdd.fileRar);
    data.append('title', inputAdd.title);
    data.append('nameSubject', inputAdd.nameSubject);
    data.append('body', inputAdd.body);
    data.append('bodyPart', inputAdd.bodyPart);
    data.append('countPage', inputAdd.countPage);
    data.append('countYear', inputAdd.countYear);
    data.append('countPercent', inputAdd.countPercent);
    data.append('selectedSubject', inputAdd.selectedSubject);
    data.append('selectedType', inputAdd.selectedType);

    try {
      await dispatch(fetchAddSubject(data));
      setSuccessFormat(false);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        user.access ? navigate('/') : navigate('/access');
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const CuxtomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'black',
      padding: '10px',
      boxShadow: theme.shadows[5],
      fontSize: 20,
    },
  }));

  return (
    <>
      {successMessage && (
        <div className='successMessage'>Ваша работа опубликована</div>
      )}
      {successMessageRar && (
        <div className='successMessageRar'>
          ! Вам необходимо загрузить вашу работу !
        </div>
      )}
      {successMessageFields && (
        <div className='successMessageRar'>
          ! Заполните все обязательные (*) поля !
        </div>
      )}
      {successFormat && (
        <div className='successMessageRar'>! Недопустимый формат файла !</div>
      )}
      <form encType='multipart/form-data' className='formAddList'>
        <div className='infoText'>
          <div>
            Заполняйте данные так, как вы бы предпочли видеть в других работах.
          </div>
          <div>Количество загружаемых работ не ограниченно</div>
        </div>
        <label htmlFor='file'>
          <div className='infoTextLabel'>
            Загрузите файл работы, <b>ФОРМАТ: .rar или .zip</b>
            <CuxtomTooltip title='Обязательное поле'>
              <span className='redField'>*</span>
            </CuxtomTooltip>
          </div>

          <input
            type='file'
            name='fileRar'
            onChange={handleChange}
            className='inputList'
          />
        </label>
        <br />
        <label htmlFor='text'>
          <div className='infoTextLabel'>
            Полное название вашей работы:{' '}
            <CuxtomTooltip title='Обязательное поле'>
              <span className='redField'>*</span>
            </CuxtomTooltip>
          </div>

          <input
            className='inputTitle'
            type='text'
            name='title'
            placeholder='Например: Определение несущей способности редуктора'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='text'>
          <div className='infoTextLabel'>
            Название дисциплины (полное название и аббревиатура или сокращение):{' '}
            <CuxtomTooltip title='Обязательное поле'>
              <span className='redField'>*</span>
            </CuxtomTooltip>
          </div>

          <input
            className='inputTitle'
            type='text'
            name='nameSubject'
            placeholder='Например: Детали машин / ДМ'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='text'>
          <div className='infoTextLabel'>
            Описание вашей работы (про что и тд, общая информация):{' '}
            <CuxtomTooltip title='Обязательное поле'>
              <span className='redField'>*</span>
            </CuxtomTooltip>
          </div>

          <textarea
            className='inputBody'
            name='body'
            placeholder='Краткое описание вашей работы, не больше 1 абзаца'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='text'>
          <div className='infoTextLabel'>
            Отрывок из вашей работы (это может быть введение + заключение,
            входные данные, цели и задачи, аннотация, какое-то условие и тд), но
            не более 1-2 абзаца:{' '}
            <CuxtomTooltip title='Обязательное поле'>
              <span className='redField'>*</span>
            </CuxtomTooltip>
          </div>

          <textarea
            className='inputBody'
            name='bodyPart'
            placeholder='Это может быть цели и задачи вашей работы, или введение, либо просто отрывок из вашей работы, который передаст суть'
            onChange={handleChange}
          />
        </label>
        <div className='inputDiv'>
          <label htmlFor='text'>
            <div className='infoTextLabel'>
              Количество страниц:{' '}
              <CuxtomTooltip title='Обязательное поле'>
                <span className='redField'>*</span>
              </CuxtomTooltip>
            </div>

            <input
              className='inputCount'
              type='text'
              name='countPage'
              placeholder='Кол-во страниц'
              onChange={handleChange}
            />
          </label>
          <label htmlFor='text'>
            <div className='infoTextLabel'>
              Год написания работы:{' '}
              <CuxtomTooltip title='Обязательное поле'>
                <span className='redField'>*</span>
              </CuxtomTooltip>
            </div>

            <input
              className='inputCount'
              type='text'
              name='countYear'
              placeholder='Год написания'
              onChange={handleChange}
            />
          </label>
          <label htmlFor='text'>
            <div className='infoTextLabel'>
              Процент уникальности (если имеется):
              <CuxtomTooltip title=''>
                <span className='redField21'>*</span>
              </CuxtomTooltip>
            </div>

            <input
              className='inputCountPercent'
              type='text'
              name='countPercent'
              placeholder='Процент уникальности'
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='inputDiv'>
          <label htmlFor='select'>
            <div className='infoTextLabel'>
              Выберите категорию{' '}
              <CuxtomTooltip title='Обязательное поле'>
                <span className='redField'>*</span>
              </CuxtomTooltip>
            </div>

            <select
              name='selectedSubject'
              className='academicSub'
              value={inputAdd.selectedSubject}
              onChange={handleChange}
            >
              {subjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor='select'>
            <div className='infoTextLabel'>
              {' '}
              Выберите тип работы{' '}
              <CuxtomTooltip title='Обязательное поле'>
                <span className='redField'>*</span>
              </CuxtomTooltip>
            </div>

            <select
              name='selectedType'
              className='academicSub'
              value={inputAdd.selectedType}
              onChange={handleChange}
            >
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className='btnDiv'>
          <div className='divCheckData'>Проверь заполенные данные</div>
          <button
            type='button'
            className={!controlBtn ? 'btnAcc' : 'btnAccDis'}
            onClick={() => {
              setControlBtn(true);
            }}
          >
            Проверил(а)
          </button>
          <button
            type='button'
            className={controlBtn ? 'btnAcc' : 'btnAccDis'}
            onClick={() => {
              handlerSave();
            }}
          >
            Сохранить
          </button>
        </div>
      </form>
    </>
  );
}
