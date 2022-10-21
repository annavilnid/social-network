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

type AppPropsType = {
   // store: any
   // state: any
   // dispatch: (action: any) => void
}

const App: React.FC<AppPropsType> = (props) => {
  console.log(props);
  // const state = props.store.getState()

  return (
    <div className="wrapper">
      <Header/>
      <Navbar/>
      <Route path='/dialogs' render={() =>
        <DialogsContainer
          // store={props.store}
        />}
      />

      <Route path='/profile' render={() =>
        <Profile
          // store={props.store}
        />}
      />

      <Route path='/news' component={News} />
      <Route path='/music' component={Music} />
      <Route path='/settings' component={Settings} />
    </div>
  );
}

export default App;
