import './sass/main.scss';

import detectUrlChange from 'detect-url-change';
import showApplication from './app/showApplication';

// For tests
detectUrlChange.on('change', () => {
  // console.log(`URL changed: ${newUrl}`);
});

showApplication();
