/**
 * News Hash Verifier Embed Script
 * Automatically creates iframe with proper configuration
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        baseUrl: 'https://make-europe.github.io/Open-AI-News-Agency/iframehasher/',
        defaultHeight: 600,
        defaultWidth: '100%',
        defaultTheme: 'light'
    };
    
    // Create iframe element
    function createIframe(options = {}) {
        const iframe = document.createElement('iframe');
        
        // Set attributes
        iframe.src = CONFIG.baseUrl;
        iframe.width = options.width || CONFIG.defaultWidth;
        iframe.height = options.height || CONFIG.defaultHeight;
        iframe.frameBorder = '0';
        iframe.title = 'News Hash Verifier';
        iframe.allow = 'clipboard-write';
        
        // Set styles
        iframe.style.cssText = `
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border: none;
            display: block;
            width: 100%;
            max-width: 100%;
        `;
        
        // Add theme parameter if specified
        if (options.theme) {
            iframe.src += `?theme=${encodeURIComponent(options.theme)}`;
        }
        
        return iframe;
    }
    
    // Initialize all embed containers
    function initializeEmbeds() {
        const containers = document.querySelectorAll('[data-news-hash-verifier]');
        
        containers.forEach(container => {
            // Skip if already initialized
            if (container.querySelector('iframe')) {
                return;
            }
            
            // Get options from data attributes
            const options = {
                height: container.dataset.height || CONFIG.defaultHeight,
                width: container.dataset.width || CONFIG.defaultWidth,
                theme: container.dataset.theme || CONFIG.defaultTheme
            };
            
            // Create and append iframe
            const iframe = createIframe(options);
            container.appendChild(iframe);
            
            // Add loading state
            iframe.addEventListener('load', () => {
                container.classList.add('loaded');
            });
        });
    }
    
    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeEmbeds);
    } else {
        initializeEmbeds();
    }
    
    // Expose global API
    window.NewsHashVerifier = {
        create: createIframe,
        init: initializeEmbeds,
        config: CONFIG
    };
    
})();
