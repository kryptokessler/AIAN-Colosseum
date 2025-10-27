import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock Solana Web3
global.window.solanaWeb3 = {
  Connection: jest.fn(),
  PublicKey: jest.fn(),
  Transaction: jest.fn(),
  SystemProgram: {
    transfer: jest.fn()
  },
  clusterApiUrl: jest.fn(() => 'https://api.devnet.solana.com')
};

// Mock crypto.subtle
global.crypto = {
  subtle: {
    digest: jest.fn(() => Promise.resolve(new ArrayBuffer(32)))
  }
};

test('renders news hash verifier title', () => {
  render(<App />);
  const titleElement = screen.getByText(/News Hash Verifier/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders connect wallet button initially', () => {
  render(<App />);
  const connectButton = screen.getByText(/Connect Phantom Wallet/i);
  expect(connectButton).toBeInTheDocument();
});

test('displays bond curve pricing section', () => {
  render(<App />);
  const bondCurveTitle = screen.getByText(/Bond Curve Pricing/i);
  expect(bondCurveTitle).toBeInTheDocument();
});

test('shows current and next price', () => {
  render(<App />);
  const currentPrice = screen.getByText(/Current Price/i);
  const nextPrice = screen.getByText(/Next Price/i);
  expect(currentPrice).toBeInTheDocument();
  expect(nextPrice).toBeInTheDocument();
});
