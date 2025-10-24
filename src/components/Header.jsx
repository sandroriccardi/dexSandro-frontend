import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>{t('header.logo')}</h1>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                {t('header.navigation.home')}
              </Link>
            </li>
            <li>
              <Link 
                to="/all-tasks" 
                className={`nav-link ${location.pathname === '/all-tasks' ? 'active' : ''}`}
              >
                {t('header.navigation.allTasks')}
              </Link>
            </li>
            <li>
              <Link 
                to="/ai" 
                className={`nav-link ${location.pathname === '/ai' ? 'active' : ''}`}
              >
                {t('header.navigation.ai')}
              </Link>
            </li>
            <li><a href="#services" className="nav-link">{t('header.navigation.services')}</a></li>
            <li>
              <Link 
                to="/talks" 
                className={`nav-link ${location.pathname === '/talks' ? 'active' : ''}`}
              >
                {t('header.navigation.talks')}
              </Link>
            </li>
            <li><a href="#contact" className="nav-link">{t('header.navigation.contact')}</a></li>
          </ul>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;