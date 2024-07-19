import './App.css';
import AddBook from './components/AddBook';
import BookInfo from './components/BookInfo';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<> <div><h1>Books</h1><AddBook /></div> </>}></Route>
        <Route path='/:book' element={<> <BookInfo /> </>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 