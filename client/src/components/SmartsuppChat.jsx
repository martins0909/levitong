import { useEffect } from 'react';

const SmartsuppChat = () => {
    useEffect(() => {
        // Prevent re-initialization
        if (document.getElementById('smartsupp-script')) return;

        // Initialize variables
        window._smartsupp = window._smartsupp || {};
        window._smartsupp.key = 'f652fdff265a6639ff86355f8891ffe082ead7d0';

        // Add the Smartsupp function to window
        window.smartsupp = window.smartsupp || function() {
            (window.smartsupp._ = window.smartsupp._ || []).push(arguments);
        };

        // Create and append the script
        const script = document.createElement('script');
        script.id = 'smartsupp-script';
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.src = 'https://www.smartsuppchat.com/loader.js?';
        
        // Append to head or body
        document.body.appendChild(script);

        // Cleanup: remove script on unmount? 
        // Usually chat widgets want to persist across navigation.
        return () => {
            // Optional cleanup logic
        };
    }, []);

    return null;
};

export default SmartsuppChat;
