import 'dotenv/config';
import fs from 'fs';
import crypto from 'crypto';
import { Connection, Keypair, clusterApiUrl, Transaction } from '@solana/web3.js';
import { createMemoInstruction } from '@solana/spl-memo';

const RPC = process.env.SOLANA_RPC_URL || clusterApiUrl(process.env.NETWORK || 'devnet');
const KEYPAIR_PATH = process.env.SOLANA_KEYPAIR_PATH || './solana_daily/publisher.json';

const textPath = process.argv[2] || './artifacts/today.txt';
if (!fs.existsSync(textPath)) { console.error(`Missing text file: ${textPath}`); process.exit(1); }
if (!fs.existsSync(KEYPAIR_PATH)) { console.error(`Missing keypair at ${KEYPAIR_PATH}`); process.exit(1); }

const text = fs.readFileSync(textPath, 'utf-8').replace(/\r\n/g, '\n');
const sha256 = crypto.createHash('sha256').update(text, 'utf8').digest('hex');

const secret = Uint8Array.from(JSON.parse(fs.readFileSync(KEYPAIR_PATH, 'utf-8')));
const payer = Keypair.fromSecretKey(secret);
const connection = new Connection(RPC, 'confirmed');

const payload = { v: 1, sha256, label: 'AIAN daily' };
const ix = createMemoInstruction(JSON.stringify(payload));
const tx = new Transaction().add(ix);

const sig = await connection.sendTransaction(tx, [payer], { skipPreflight: false });
console.log(`✅ Published memo tx: ${sig}`);

fs.mkdirSync('./artifacts', { recursive: true });
fs.writeFileSync('./artifacts/today.sha256', sha256 + '\n');
fs.writeFileSync('./artifacts/today.sig', sig + '\n');
