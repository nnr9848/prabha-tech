import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // If navigating back via 'POP' (browser back or navigate(-1)), let browser restore previous scroll position
    if (navType === 'POP') {
      return;
    }

    // If there is an anchor hash in the URL, scroll to that specific element smoothly
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Otherwise immediately scroll to top of the page on forward navigation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [pathname, search, hash, navType]);

  return null;
};
