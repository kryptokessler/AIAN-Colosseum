# WordPress Integration Guide

## Quick Integration

### Method 1: Direct iframe (Recommended)
Add this code to your WordPress post/page or theme:

```html
<iframe 
  src="https://make-europe.github.io/Open-AI-News-Agency/iframehasher/" 
  width="100%" 
  height="600" 
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
  title="News Hash Verifier">
</iframe>
```

### Method 2: WordPress Shortcode
Add this to your theme's `functions.php`:

```php
function news_hash_verifier_shortcode($atts) {
    $atts = shortcode_atts(array(
        'height' => '600',
        'width' => '100%'
    ), $atts);
    
    return '<iframe 
        src="https://make-europe.github.io/Open-AI-News-Agency/iframehasher/" 
        width="' . esc_attr($atts['width']) . '" 
        height="' . esc_attr($atts['height']) . '" 
        frameborder="0"
        style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
        title="News Hash Verifier">
    </iframe>';
}
add_shortcode('news_hash_verifier', 'news_hash_verifier_shortcode');
```

Then use `[news_hash_verifier height="500"]` in your posts.

### Method 3: WordPress Plugin
Create a simple plugin file `news-hash-verifier.php`:

```php
<?php
/**
 * Plugin Name: News Hash Verifier
 * Description: Embed blockchain article verification component
 * Version: 1.0.0
 * Author: MAKE Europe GmbH
 */

function nhv_enqueue_scripts() {
    wp_enqueue_script('nhv-iframe', 'https://make-europe.github.io/Open-AI-News-Agency/iframehasher/embed.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'nhv_enqueue_scripts');

function nhv_shortcode($atts) {
    $atts = shortcode_atts(array(
        'height' => '600',
        'width' => '100%',
        'theme' => 'light'
    ), $atts);
    
    return '<div id="news-hash-verifier" 
        data-height="' . esc_attr($atts['height']) . '"
        data-width="' . esc_attr($atts['width']) . '"
        data-theme="' . esc_attr($atts['theme']) . '">
    </div>';
}
add_shortcode('news_hash_verifier', 'nhv_shortcode');
```

## Features

### 🎨 Beautiful UI
- Modern gradient design with glassmorphism effects
- Smooth animations powered by Framer Motion
- Fully responsive for all devices
- Dark/light theme support

### 🔗 Blockchain Integration
- Direct Solana blockchain integration
- Phantom wallet connection
- Real-time transaction verification
- Explorer links for transparency

### 📈 Bond Curve Pricing
- Dynamic pricing based on hash count
- 10% price increase per hash
- Visual pricing display
- Earning mechanism for early adopters

### 🛡️ Security Features
- SHA-256 article hashing
- Immutable blockchain storage
- Transaction verification
- No data collection or storage

## Customization

### Styling
The component automatically adapts to your WordPress theme. You can override styles:

```css
/* Custom styles for the iframe */
.news-hash-verifier-iframe {
    border-radius: 16px !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
}

/* Custom button styles */
.news-hash-verifier-iframe .connect-button {
    background: linear-gradient(135deg, #your-color 0%, #your-color-2 100%) !important;
}
```

### Configuration
Pass parameters via URL:

```
https://make-europe.github.io/Open-AI-News-Agency/iframehasher/?theme=dark&height=500
```

Available parameters:
- `theme`: `light` or `dark`
- `height`: iframe height in pixels
- `width`: iframe width (CSS value)

## Troubleshooting

### Common Issues

1. **Wallet not connecting**
   - Ensure Phantom wallet is installed
   - Check browser permissions
   - Try refreshing the page

2. **Transaction fails**
   - Check SOL balance in wallet
   - Ensure network is set to Solana Devnet
   - Verify wallet is unlocked

3. **Article not detected**
   - Component looks for `.entry-content`, `article`, or `.post-content` classes
   - Manually paste article content if auto-detection fails

### Support
For issues or feature requests, please open an issue on the GitHub repository.

## Security Notice

- The component runs entirely client-side
- No data is sent to external servers (except Solana blockchain)
- Article content is only hashed locally
- Private keys never leave the user's wallet
