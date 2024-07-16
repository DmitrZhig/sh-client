import React from 'react';
import subjects from '../../account/addList/subjTypes';
import './filterCategor.css';

export default function FilterCategors({
  onSelectCategory,
  categoryCounts,
  selectedCategory,
  onCategoryClick,
}) {
  return (
    <div className='boxFilter'>
      <div className='aboutMain'>Выберите категорию</div>
      <div className='boxFlex'>
        {subjects.map((el) => (
          <div
            key={el.value}
            className={`filter-item ${
              selectedCategory === el.value ? 'selected' : ''
            }`}
            onClick={() => {
              {
                onSelectCategory(el.value);
              }
            }}
          >
            <div className='boxLabel'>
              {el.label === 'Все категории' ? (
                <span className='spanText'>{el.label}</span>
              ) : (
                <span>{el.label}</span>
              )}
              {el.label !== 'Все категории' && (
                <>
                  <span style={{ marginLeft: 'auto' }}>
                    <h4>({categoryCounts[el.value] || 0})</h4>
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className='boxFlex2'>
        <select
          className='selectCategorMobile'
          value={selectedCategory}
          onChange={(e) => {
            onSelectCategory(e.target.value);
          }}
        >
          <option value=''>Все категории</option>
          {subjects.map((el) => (
            <option key={el.value} value={el.value}>
              {el.label} ({categoryCounts[el.value] || 0})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
