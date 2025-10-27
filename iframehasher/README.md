# 🛡️ News Hash Verifier

A beautiful React component that allows readers to hash news articles to the Solana blockchain with a bond curve pricing mechanism. This creates an immutable, verifiable record of article content while providing an earning mechanism for early adopters.

## ✨ Features

### 🎨 Beautiful UI
- Modern gradient design with glassmorphism effects
- Smooth animations powered by Framer Motion
- Fully responsive for all devices
- Auto-detects article content from WordPress pages

### 🔗 Blockchain Integration
- Direct Solana blockchain integration
- Phantom wallet connection
- Real-time transaction verification
- Explorer links for transparency

### 📈 Bond Curve Pricing
- Dynamic pricing based on hash count
- 10% price increase per hash (configurable)
- Visual pricing display with current/next price
- Earning mechanism for early adopters

### 🛡️ Security Features
- SHA-256 article hashing
- Immutable blockchain storage
- Transaction verification
- No data collection or storage

## 🚀 Quick Start

### Local Development

```bash
cd iframehasher
npm install --legacy-peer-deps
npm start
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
```

The built files will be in the `build/` directory, ready for deployment.

### Test the Component

Open `test.html` in your browser to see the component in action with a sample news article.

## 🌐 Deployment

### GitHub Pages (Automatic)
The component automatically deploys to GitHub Pages when you push to the main branch:

- **Live URL**: `https://make-europe.github.io/Open-AI-News-Agency/iframehasher/`
- **Deployment**: Automatic via GitHub Actions
- **Branch**: `main` or `feature/solana-daily`

### WordPress Integration

#### Method 1: Direct iframe
```html
<iframe 
  src="https://make-europe.github.io/Open-AI-News-Agency/iframehasher/" 
  width="100%" 
  height="600" 
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>
```

#### Method 2: WordPress Shortcode
```php
[news_hash_verifier height="500"]
```

See [wordpress-integration.md](./wordpress-integration.md) for detailed integration instructions.

## 💰 Bond Curve Mechanism

The pricing follows a bond curve model where each hash becomes more expensive:

- **Base Price**: 0.001 SOL
- **Multiplier**: 1.1x (10% increase per hash)
- **Formula**: `price = basePrice * (multiplier ^ hashCount)`

This creates:
- Early adopter rewards (lower prices)
- Scarcity value (higher prices for later hashes)
- Sustainable earning mechanism

## 🔧 Configuration

### Environment Variables
```bash
# .env.local
REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_FEE_WALLET=5TWWTqFfnketLRyYAYWJZmdJGRMd8iuTPBY5U7gEAC4Z
REACT_APP_BASE_PRICE=0.001
REACT_APP_PRICE_MULTIPLIER=1.1
```

### Customization
- Modify `calculateBondPrice()` in `App.js` for different pricing
- Update styling in `App.css`
- Configure Solana network in `App.js`

## 📱 Responsive Design

The component is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Embedded iframes

## 🔒 Security

- **Client-side only**: No data sent to external servers
- **Wallet integration**: Private keys never leave user's device
- **Immutable storage**: All hashes stored on Solana blockchain
- **Transparent**: All transactions visible on Solana Explorer

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Phantom wallet (for testing)

### Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Project Structure
```
iframehasher/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js          # Main component
│   ├── App.css         # Styles
│   ├── index.js        # Entry point
│   └── index.css       # Global styles
├── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License © [MAKE Europe GmbH](https://make-europe.com)

## 🆘 Support

For issues or questions:
- Open an issue on GitHub
- Check the [WordPress Integration Guide](./wordpress-integration.md)
- Review the troubleshooting section

---

**Built with ❤️ by MAKE Europe GmbH**
