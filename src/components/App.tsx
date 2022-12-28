import React from 'react';
import './App.css';
import {Header} from './Header/Header';
import {Navbar} from './NavBar/Navbar';
import {Profile} from './Profile/Profile';
import {Dialogs} from './Dialogs/Dialogs';
import {Route, withRouter} from 'react-router-dom';
import {News} from './News/News';
import {Music} from './Music/Music';
import {Settings} from './Settings/Settings';
import {StoreType} from '../redux/store';
import {DialogsContainer} from "./Dialogs/DialogsContainer";
import LoginPage from "./Login/Login";
import {Users} from "./Users/Users";
import UsersContainer from "./Users/UsersContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import HeaderContainer from "./Header/HeaderContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "../redux/app-reduser";
import {AppStateType} from "../redux/redux-store";
import Preloader from "./Preloader/Preloader";

type AppPropsType = {
   // store: any
   // state: any
   // dispatch: (action: any) => void
}

export type MapDispatchPropsType = {
  initializeApp: () => void
}

export type MapStatePropsType = {
  initialized: boolean
}

class App extends React.Component<MapDispatchPropsType&MapStatePropsType> {
    componentDidMount() {
      // if (!this.props.initialized) {
        this.props.initializeApp()
      // }
    }

    render() {
       if (!this.props.initialized) {
         return <Preloader/>
       } else {

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

             <Route path='/login'
                    render={() => <LoginPage/>}
             />

             <Route path='/news' component={News}/>
             <Route path='/music' component={Music}/>
             <Route path='/settings' component={Settings}/>
           </div>
         );
       }
    }
}

export let mapStateToProps  = (state: AppStateType ): MapStatePropsType  => {
  return {
    initialized: state.app.initialized,
  }
}

export default compose(
  withRouter,
  (connect(mapStateToProps ,{initializeApp})))(App);

