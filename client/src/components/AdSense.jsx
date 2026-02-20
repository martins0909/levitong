import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AdSense = () => {
  const location = useLocation();

  useEffect(() => {
    // Current path
    const path = location.pathname;

    // Define routes where ads should NOT be shown
    // - Admin dashboard (/admin/*)
    // - Login/Signup (/signin, /signup, /admin/login)
    const blockedRoutes = [
      '/signin',
      '/signup',
      '/admin/login' 
    ];

    const isBlocked = blockedRoutes.includes(path) || path.startsWith('/admin');

    if (!isBlocked) {
      // Check if script is already injected to avoid duplicates
      if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        
        // Exact URL from user request
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7853565734078503";
        script.crossOrigin = "anonymous";
        
        document.head.appendChild(script);
      }
    } else {
        // Remove script if present on blocked routes
        const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
        if (existingScript) {
            existingScript.remove();
        }
    }
  }, [location]);

  return null;
};

export default AdSense;
