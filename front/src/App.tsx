import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SocketPong from './pages/Game/socketpong';
import Chat from './pages/Chat/chat';
import { Profil } from './pages/Profil/Profil';
import { TopBar } from "./pages/topBar/topBar";
import Testfriends from './pages/friend/testfriends';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          {/*<Route path='/' element={<TopBar />} >*/}
          <Route path='pong' element={<SocketPong />} />
          <Route path='testfriends' element={<Testfriends />} />
          <Route path='chat' element={<Chat />} />
          <Route path='profil' element={<Profil />} />
        </Route >
      </Routes >
    </BrowserRouter >
  );
};

export default App;