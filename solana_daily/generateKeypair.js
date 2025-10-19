import { Keypair } from '@solana/web3.js';
import fs from 'fs';
const kp = Keypair.generate();
fs.writeFileSync('publisher.json', JSON.stringify(Array.from(kp.secretKey)));
console.log('Public key:', kp.publicKey.toBase58());
