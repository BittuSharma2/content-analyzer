# 🚀 Social Media Content Analyzer

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Frontend](https://img.shields.io/badge/Frontend-React-blue)](frontend)
[![Backend](https://img.shields.io/badge/Backend-Node.js-brightgreen)](backend)
[![Deploy](https://img.shields.io/badge/Deploy-Render-orange)](https://render.com)

A **full-stack web application** that extracts and analyzes text from PDFs and images to help improve social media posts. Upload your file, get the text extracted via OCR or PDF parsing, and receive actionable insights on readability, hashtags, emojis, and call-to-action suggestions.  

**Live Demo:** [Click Here](https://content-analyzer-sigma.vercel.app/)

---

## 🌟 Features

- Upload **PDFs** and **images** (JPG, PNG)
- Extract text using **OCR** (Tesseract.js) and **PDF parsing**
- Analyze content for:
  - Word count & sentence structure
  - Hashtags & emoji usage
  - Call-to-Action (CTA) presence
  - Readability & engagement suggestions
- Real-time upload progress bar
- Responsive and user-friendly interface

---

## 🛠 Tech Stack

- **Frontend:** React.js, Vite, TailwindCSS  
- **Backend:** Node.js, Express, Tesseract.js, pdf-parse  
- **Deployment:** Render

---

## 📂 Project Structure

```txt
backend/                         # Node.js backend
├── config/                      # configs
├── uploads/                     # Uploaded PDF & image files
├── controllers/                 # Controller logic
├── middleware/                  # Middleware
├── routes/                      # API route definitions
│   ├── ocr.js
│   └── pdfExtractor.js
├── utils/                       # Utility functions
│   ├── ocr.js
│   └── pdfExtractor.js
├── eng.traineddata              # Tesseract OCR language file
├── app.js                       # Express app setup
└── index.js                     # Backend entry point

frontend/                        # React frontend
└── src/
   ├── api/                     # API helpers
   │   ├── analyzeApi.js
   │   └── uploadApi.js
   ├── components/              # UI components
   │   ├── ErrorBox.jsx
   │   ├── FileUpload.jsx
   │   ├── Loader.jsx
   │   └── ResultBox.jsx
   ├── hooks/                   # Custom hooks
   │   └── useFileProcessor.js
   ├── pages/                   # Pages
   │   └── Home.jsx
   ├── utils/                   # Utility files
   │   └── config.js            # Backend URL config
   ├── App.jsx
   ├── index.css
   └── main.jsx


```
---

## ⚡ Installation & Setup

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend

2. Install dependencies:

        npm install
   
3. Create a .env file with:

        PORT=5000
   
4. Start the backend server:

        npm start

### Frontend

1. Navigate to the frontend folder:

        cd frontend


2. Install dependencies:

        npm install


3. Create a .env file with:

        VITE_BACKEND_URL=http://localhost:5000


4. Start the frontend:

        npm run dev

 ---
 
## 🚀 Usage

**Demo Video:** [Click Here](https://drive.google.com/file/d/12jY6oQ417V_ssU8YB-VcTSVxerR6EKSw/view)

---

## 📝 License

This project is licensed under the MIT License.

---

## 👤 Author

### Bittu Sharma
