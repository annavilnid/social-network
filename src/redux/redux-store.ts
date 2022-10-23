import {combineReducers, createStore} from "redux"
import dialogsReducer from "./dialogs-reduser";
import profileReducer from "./profle-reduser";
import sidebarReducer from "./sidebar-reduser";
import usersReducer from "./users-reduser";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebarPage: sidebarReducer,
  usersPage: usersReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;
//
let store = createStore(rootReducer);

//
// window.store = store;
//
export default store;