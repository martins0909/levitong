import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEOControl = () => {
    const location = useLocation();
    const path = location.pathname;

    // Define routes that should NOT be indexed by search engines
    const noIndexRoutes = [
        '/admin/login'
    ];

    // Check if current path matches any excluded route or starts with /admin
    const shouldNoIndex = noIndexRoutes.includes(path) || path.startsWith('/admin');

    return (
        <Helmet>
            {shouldNoIndex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow" />
            )}
        </Helmet>
    );
};

export default SEOControl;
