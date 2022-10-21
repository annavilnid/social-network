import {combineReducers, createStore} from "redux"
import dialogsReduser from "./dialogs-reduser";
import profileReduser from "./profle-reduser";
import sidebarReduser from "./sidebar-reduser";

let redusers = combineReducers({
  profilePage: profileReduser,
  dialogsPage: dialogsReduser,
  sidebarPage: sidebarReduser,
});

export type RootState = ReturnType<typeof redusers>;
//
let store = createStore(redusers);
//
export default store;