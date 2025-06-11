
## 🔧 Tech Stack

### Backend
- Python
- FastAPI (implied by the project structure)
- YouTube-DL integration
- Spotify API integration

### Frontend
- React 18.3.1
- TypeScript 5.5.3
- Various Radix UI components for modern UI elements
- TailwindCSS (implied by tailwindcss-animate)
- Vite 5.4.1 as build tool

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Python 3.x
- Spotify Developer Account
- YouTube API credentials

### Installation

1. Clone the repository: 
```
git clone https://github.com/yourusername/techdj-downloader.git
```
2. Set up the backend:
```aiignore
cd api python -m venv .venv source .venv/bin/activate
pip install -r requirements.txt
```

3. Set up the frontend:
```aiignore
cd client  && npm install
```


### Configuration

1. Create necessary environment variables for:
   - Spotify API credentials
   - YouTube API credentials
   - Backend API endpoints

2. Configure your Spotify Developer settings to allow authentication

### Running the Application

1. Start the backend server:
```aiignore
cd api uvicorn main:app --reload
```

2. Start the frontend development server:
```aiignore
cd client npm run dev
```

## 🔒 Security Notes

- Never commit sensitive credentials to the repository
- Use environment variables for all sensitive information
- Follow OAuth 2.0 best practices for Spotify authentication

## 🛣️ Roadmap

- [ ] Add support for playlist synchronization
- [ ] Implement batch downloading
- [ ] Add music format conversion options
- [ ] Include progress tracking for downloads
- [ ] Add support for other music streaming platforms

## ⚖️ Legal Notice

This tool is intended for personal use only. Users are responsible for complying with YouTube's terms of service and respecting copyright laws in their jurisdiction.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

[Add your chosen license here]

---

For questions and support, please open an issue in the repository.

