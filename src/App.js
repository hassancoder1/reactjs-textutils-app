import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import { useState, useCallback } from 'react';
import Alert from './components/Alert';
import LoadingBar from 'react-top-loading-bar';

function App() {
  const [themeMode, setThemeMode] = useState('light');
  const [textColor, setTextColor] = useState('dark');
  const [customThemeColor, setCustomThemeColor] = useState('#777');
  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(0);

  const showAlert = useCallback((message, type)=>{
      setAlert({
        text: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  },[setAlert]);


  const toggleThemeMode = ()=>{
    if (themeMode === 'light') {
      setThemeMode("dark");
      setTextColor('light');
      showAlert('Dark Mode Activated', 'success');
    }else{
      setThemeMode("light");
      setTextColor('dark');
      showAlert('Light Mode Activated', 'success');
    }
  }
  return (
    <div className={`App bg-${themeMode} pb-3`} style={{background: `linear-gradient(180deg, ${customThemeColor}, ${themeMode === 'light'?'#fff':'#212529'}`}}>
      <BrowserRouter>
      <LoadingBar
    color='#ff0000'
    height={2}
    progress={progress}
    onLoaderFinished={()=>setProgress(0)}
    />
      <Navbar toggleThemeMode={toggleThemeMode} themeMode={themeMode} setCustomThemeColor={setCustomThemeColor} />
      <Alert alert={alert} />
      <div className="container">
        <Routes>
          <Route path="/" element={<TextForm themeMode={themeMode} textColor={textColor} showAlert={showAlert} setProgress={setProgress} />} />
          <Route path="/about" element={<About textColor={textColor}  setProgress={setProgress} />} />
      </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
