import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hash, 
  Wallet, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  TrendingUp,
  Coins,
  Shield
} from 'lucide-react';
import './App.css';

// Bond curve calculation
const calculateBondPrice = (hashCount) => {
  const basePrice = 0.001; // 0.001 SOL base price
  const multiplier = 1.1; // 10% increase per hash
  return basePrice * Math.pow(multiplier, hashCount);
};

// Solana integration
const connectWallet = async () => {
  if (!window.solana || !window.solana.isPhantom) {
    throw new Error('Phantom wallet not found. Please install Phantom wallet.');
  }
  
  const response = await window.solana.connect();
  return response.publicKey.toString();
};

const hashToSolana = async (articleText, walletAddress, hashCount) => {
  const { Connection, PublicKey, Transaction, SystemProgram } = window.solanaWeb3;
  
  const connection = new Connection(window.solanaWeb3.clusterApiUrl("devnet"));
  const fromPubkey = new PublicKey(walletAddress);
  const feePubkey = new PublicKey("5TWWTqFfnketLRyYAYWJZmdJGRMd8iuTPBY5U7gEAC4Z");
  
  // Calculate price based on bond curve
  const price = calculateBondPrice(hashCount);
  const lamports = Math.floor(price * 1e9); // Convert SOL to lamports
  
  // Hash the article text
  const msgHash = new TextEncoder().encode(articleText);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgHash);
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
  
  // Create memo data with hash and metadata
  const memoData = JSON.stringify({
    v: 1,
    hash: hashHex,
    timestamp: Date.now(),
    hashCount: hashCount + 1
  });
  const bufferData = new TextEncoder().encode(memoData);
  
  // Build transaction
  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey: feePubkey,
      lamports,
    }),
    new window.solanaWeb3.TransactionInstruction({
      keys: [],
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
      data: bufferData,
    })
  );
  
  tx.feePayer = fromPubkey;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  
  // Sign and send
  const signed = await window.solana.signTransaction(tx);
  const signature = await connection.sendRawTransaction(signed.serialize());
  
  return { signature, hash: hashHex, price };
};

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isHashing, setIsHashing] = useState(false);
  const [hashCount, setHashCount] = useState(0);
  const [lastHash, setLastHash] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [articleText, setArticleText] = useState('');
  const [isSolanaLoaded, setIsSolanaLoaded] = useState(false);

  // Load hash count from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('hashCount');
    if (savedCount) {
      setHashCount(parseInt(savedCount, 10));
    }
  }, []);

  // Check if Solana Web3 is loaded
  useEffect(() => {
    const checkSolanaLoaded = () => {
      if (window.solanaWeb3) {
        setIsSolanaLoaded(true);
      } else {
        // Retry after a short delay
        setTimeout(checkSolanaLoaded, 100);
      }
    };
    
    checkSolanaLoaded();
  }, []);

  // Auto-detect article text from WordPress
  useEffect(() => {
    const detectArticleText = () => {
      const articleElement = document.querySelector('.entry-content') || 
                           document.querySelector('article') || 
                           document.querySelector('.post-content');
      
      if (articleElement) {
        setArticleText(articleElement.innerText);
      } else {
        setArticleText(window.location.href);
      }
    };

    // Try immediately and after a short delay
    detectArticleText();
    const timer = setTimeout(detectArticleText, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const address = await connectWallet();
      setWalletAddress(address);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleHashArticle = async () => {
    if (!walletAddress) {
      setError('Please connect your wallet first');
      return;
    }

    setIsHashing(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await hashToSolana(articleText, walletAddress, hashCount);
      
      setLastHash(result);
      setHashCount(prev => {
        const newCount = prev + 1;
        localStorage.setItem('hashCount', newCount.toString());
        return newCount;
      });
      setSuccess(`Article hashed successfully! Cost: ${result.price.toFixed(6)} SOL`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsHashing(false);
    }
  };

  const currentPrice = calculateBondPrice(hashCount);
  const nextPrice = calculateBondPrice(hashCount + 1);

  // Show loading state if Solana Web3 is not loaded
  if (!isSolanaLoaded) {
    return (
      <div className="app">
        <div className="container">
          <motion.div 
            className="main-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <h2>Loading Solana Web3...</h2>
              <p>Please wait while we initialize the blockchain connection.</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div 
          className="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="header-content">
            <Shield className="header-icon" />
            <h1>News Hash Verifier</h1>
            <p>Immutable blockchain verification for news articles</p>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div 
          className="main-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Bond Curve Display */}
          <div className="bond-curve-section">
            <div className="section-header">
              <TrendingUp className="section-icon" />
              <h2>Bond Curve Pricing</h2>
            </div>
            
            <div className="pricing-grid">
              <div className="price-card current">
                <div className="price-label">Current Price</div>
                <div className="price-value">{currentPrice.toFixed(6)} SOL</div>
                <div className="price-desc">Hash #{hashCount + 1}</div>
              </div>
              
              <div className="price-card next">
                <div className="price-label">Next Price</div>
                <div className="price-value">{nextPrice.toFixed(6)} SOL</div>
                <div className="price-desc">Hash #{hashCount + 2}</div>
              </div>
            </div>

            <div className="curve-info">
              <p>Each hash increases the price by 10%</p>
              <div className="total-hashes">
                <Coins className="coin-icon" />
                <span>Total Hashes: {hashCount}</span>
              </div>
            </div>
          </div>

          {/* Article Preview */}
          <div className="article-section">
            <div className="section-header">
              <Hash className="section-icon" />
              <h2>Article Content</h2>
            </div>
            
            <div className="article-preview">
              <textarea
                value={articleText}
                onChange={(e) => setArticleText(e.target.value)}
                placeholder="Article content will be auto-detected from the page..."
                className="article-textarea"
              />
              <div className="char-count">
                {articleText.length} characters
              </div>
            </div>
          </div>

          {/* Wallet Connection */}
          {!walletAddress ? (
            <motion.button
              className="connect-button"
              onClick={handleConnectWallet}
              disabled={isConnecting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Wallet className="button-icon" />
              {isConnecting ? 'Connecting...' : 'Connect Phantom Wallet'}
            </motion.button>
          ) : (
            <div className="wallet-connected">
              <div className="wallet-info">
                <CheckCircle className="success-icon" />
                <span>Connected: {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}</span>
              </div>
              
              <motion.button
                className="hash-button"
                onClick={handleHashArticle}
                disabled={isHashing || !articleText.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Hash className="button-icon" />
                {isHashing ? 'Hashing...' : `Hash Article (${currentPrice.toFixed(6)} SOL)`}
              </motion.button>
            </div>
          )}

          {/* Status Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="status-message error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertCircle className="status-icon" />
                {error}
              </motion.div>
            )}
            
            {success && (
              <motion.div
                className="status-message success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <CheckCircle className="status-icon" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Last Hash Result */}
          {lastHash && (
            <motion.div
              className="hash-result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="result-header">
                <h3>Last Hash Result</h3>
              </div>
              
              <div className="result-details">
                <div className="result-item">
                  <strong>Hash:</strong>
                  <code>{lastHash.hash.slice(0, 16)}...</code>
                </div>
                
                <div className="result-item">
                  <strong>Transaction:</strong>
                  <a 
                    href={`https://explorer.solana.com/tx/${lastHash.signature}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="explorer-link"
                  >
                    View on Explorer
                    <ExternalLink className="link-icon" />
                  </a>
                </div>
                
                <div className="result-item">
                  <strong>Cost:</strong>
                  <span>{lastHash.price.toFixed(6)} SOL</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p>Powered by Solana • Immutable • Decentralized</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
