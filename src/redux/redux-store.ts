import {applyMiddleware, combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reduser";
import profileReducer from "./profle-reduser";
import sidebarReducer from "./sidebar-reduser";
import usersReducer from "./users-reduser";
import authReducer from "./auth-reduser";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reduser";

let rootReducer = combineReducers({
  app: appReducer,
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebarPage: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;
//
let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// export type AppRootStateType = ReturnType<typeof rootReducer>
//
// type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
//
// export const AppDispatch = () => useDispatch<AppDispatch>()

//@ts-ignore
window.store = store;

export default store;