import {createContext, ReactNode} from "react";
import {StoreType} from "./redux/store";
import {RootState} from "./redux/redux-store";

const StoreContext = createContext({} as StoreType);

export type ProviderType = {
  store: any
  children: ReactNode
}

export const Provider = (props: ProviderType) => {
  return(
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>

  )
}

export default StoreContext