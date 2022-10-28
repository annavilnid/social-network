import React from 'react';
import './App.css';
import {Header} from './Header/Header';
import {Navbar} from './NavBar/Navbar';
import {Profile} from './Profile/Profile';
import {Dialogs} from './Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import {News} from './News/News';
import {Music} from './Music/Music';
import {Settings} from './Settings/Settings';
import {StoreType} from '../redux/store';
import {DialogsContainer} from "./Dialogs/DialogsContainer";
import {Users} from "./Users/Users";
import UsersContainer from "./Users/UsersContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import HeaderContainer from "./Header/HeaderContainer";

type AppPropsType = {
   // store: any
   // state: any
   // dispatch: (action: any) => void
}

const App: React.FC<AppPropsType> = (props) => {

  return (
    <div className="wrapper">
      <HeaderContainer/>
      <Navbar/>
      <Route path='/dialogs'
             render={() => <DialogsContainer/>}
      />

      <Route path='/profile/:userId?'
             render={() => <ProfileContainer/>}
      />

      <Route path='/users'
             render={() => <UsersContainer/>}
      />

      <Route path='/news' component={News} />
      <Route path='/music' component={Music} />
      <Route path='/settings' component={Settings} />
    </div>
  );
}

export default App;
