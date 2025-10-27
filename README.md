# 📰 AI News Email Summarizer

This script fetches your latest Gmail message and summarizes it using Google Cloud Vertex AI (Gemini), with the tone and style determined by a configurable agent persona.

## ✅ Requirements

- Python 3.9 or newer
- Google Cloud project with:
  - Vertex AI API enabled
  - Gmail API enabled

## 🛠 Setup

```bash
python3 -m venv venv
source venv/bin/activate
pip install google-auth google-auth-oauthlib google-api-python-client google-cloud-aiplatform python-dotenv
````

1. Place `main.py` in your project folder.
2. Download `client_secret.json` from Google Cloud Console.
3. Enable the Gmail API for your project.
4. Set your desired prompt in `agents/lisa_luckas.txt`.
5. Run the script:

```bash
python3 main.py
```

## 📄 Files

| File                     | Description                                |
| ------------------------ | ------------------------------------------ |
| `main.py`                | Main script                                |
| `client_secret.json`     | OAuth credentials (keep private)           |
| `token.json`             | Auto-generated after authentication        |
| `agents/lisa_luckas.txt` | Prompt for Lisa Luckas, your AI news agent |

## 🧠 Workflow

1. Authenticates with Gmail.
2. Fetches the latest unread email.
3. Loads the persona-based prompt from `agents/`.
4. Sends content to Vertex AI (Gemini).
5. Outputs a concise, publishable news-style summary.

## 🛡️ News Hash Verifier Component

This project now includes a beautiful React component for blockchain article verification:

### Features
- **Blockchain Integration**: Hash news articles to Solana blockchain
- **Bond Curve Pricing**: Dynamic pricing with earning mechanism
- **Beautiful UI**: Modern design with smooth animations
- **WordPress Ready**: Easy iframe integration
- **Auto-Deployment**: GitHub Actions for smooth deployment

### Quick Start
```bash
cd iframehasher
npm install
npm start
```

### WordPress Integration
```html
<iframe 
  src="https://make-europe.github.io/Open-AI-News-Agency/iframehasher/" 
  width="100%" 
  height="600" 
  frameborder="0">
</iframe>
```

See [iframehasher/README.md](./iframehasher/README.md) for detailed documentation.

## 📌 Notes

* Do not share `client_secret.json` or `token.json`.
* Ensure the Gemini model is available in your region (e.g., `us-central1`).
* You can create additional agent prompt files in `agents/`, e.g., `cheng_li.txt` or `sofia_orfeo.txt`.

## 🛑 Troubleshooting

* Ensure billing is enabled on your Google Cloud project.
* Use a supported model name and region.
* 429 errors from Vertex AI mean your quota was temporarily exceeded.

## 📜 License

MIT License © [MAKE Europe GmbH](https://make-europe.com)