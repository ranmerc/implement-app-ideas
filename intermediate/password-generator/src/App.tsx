import Header from './components/Header';
import Main from './components/Main';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Toaster
        toastOptions={{
          style: {
            background: "var(--cyan1)",
            border: "1px solid var(--slate9)",
            borderRadius: "5px",
            color: "var(--cyan12)",
            fontFamily: "Inter, sans-serif",
            fontSize: "1.2rem",
            boxShadow: "none",
          },
        }}
      />
    </div>
  );
}

export default App;
