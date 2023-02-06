import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import LoginPage from '../src/component/page/LoginPage';
import WritePage from './component/page/WritePage';
//import MainPage from './component/page/MainPage';
import SearchPage from './component/page/SearchPage';
import SettingPage from './component/page/SettingPage';
import FriendPage from './component/page/FriendPage';
//import FirstPage from './component/page/FirstPage';

function App() {
   const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <div>
            백엔드에서 가져온 데이터입니다 : {hello}
        </div>
    );
}

export default App;