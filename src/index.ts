import './normalize.css';
import './style.scss';
import detectUrlChange from 'detect-url-change';
import showApplication from './app/showApplication';

detectUrlChange.on('change', (newUrl) => {
  console.log(`URL changed: ${newUrl}`);
});

showApplication();
