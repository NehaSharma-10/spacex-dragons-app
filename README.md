# SpaceX Dragons App 🚀

A React + TypeScript web application displaying SpaceX Dragon spacecraft details using the SpaceX API. Built with Mantine UI, React Query, React Router, and Zustand for state management.

## ✨ Features

- Fetch and display Dragon spacecraft data from SpaceX API
- Public & protected routes
- User authentication simulation with Zustand (persisted state)
- View all dragons in card format
- Detailed dragon page with complete info
- Responsive UI with Mantine components
- Simple login/logout flow
- Global header with dynamic Login/Logout button
- "Go Back" navigation from dragon detail page

## 🛠️ Tech Stack

- React 18
- TypeScript
- React Router DOM
- @tanstack/react-query
- Mantine UI
- Zustand (with persist middleware)
- Vite

## 🚀 Getting Started

1. Clone the repository:


```bash
git clone https://github.com/NehaSharma-10/spacex-dragons-app.git
cd spacex-dragons-app
```


2. Install dependencies:  

```bash
npm install
```


3. Start the development server:
```bash
npm run dev
```
4.  Open your browser at http://localhost:5173




## 📁 Project Structure

```
src/
├── App.tsx
├── main.tsx
├── components/
│   └── Header.tsx
├── pages/
│   ├── Landing.tsx
│   ├── LoginPage.tsx
│   ├── DragonCards.tsx
│   └── DragonDetail.tsx
├── store/
│   └── authStore.ts
└── theme.ts
```


## 💡 Notes
This project uses a mock authentication (no real backend/token). Login state persists via Zustand persist.

Data is fetched from SpaceX API.

## 📜 License
MIT License

Made with ❤️ by Neha Sharma