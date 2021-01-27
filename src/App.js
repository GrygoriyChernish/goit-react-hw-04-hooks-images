import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import RenderImagesApi from './components/RenderImagesApi/RenderImagesApi';
import './App.css';

function App() {
  const [imageName, setImageName] = useState('');

  function handleSearchFormSubmit(imageName) {
    setImageName(imageName);
  }
  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchFormSubmit} />
      <RenderImagesApi imageName={imageName} />
      <ToastContainer />
    </div>
  );
}

export default App;
