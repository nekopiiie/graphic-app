import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => setCount(count + 1);
  const handleReset = () => setCount(0);
  const changeLanguage = (lng: 'en' | 'ru') => i18n.changeLanguage(lng);

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <div className="btn-group mb-3" role="group">
        <button
          type="button"
          onClick={() => changeLanguage('en')}
          className={`btn mb-3 ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
          data-testid='en'
        >
          English
        </button>
        <button
          type="button"
          onClick={() => changeLanguage('ru')}
          className={`btn mb-3 ${i18n.language === 'ru' ? 'btn-primary' : 'btn-outline-primary'}`}
          data-testid='ru'
        >
          Русский
        </button>
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        className="btn btn-info mb-3 align-self-center"
        data-testid='counter'
      >
        {i18n.language === 'en' 
          ? `${count} click${count !== 1 ? 's' : ''}` 
          : count === 0 
            ? t('clicks.zero') 
            : count === 1 
              ? t('clicks.one') 
              : count > 1 && count < 5 
                ? t('clicks.few', { count }) 
                : t('clicks.many', { count })}
      </button>

      <button
        type="button"
        onClick={handleReset}
        className="btn btn-warning"
        data-testid='reset'
      >
        {t('reset')}
      </button>
    </div>
  );
};

export default App;

