import {Redirect} from "react-router-dom";
import React, {Component, ComponentType, FC, FunctionComponent} from "react";
import {DialogsPropsType} from "../components/Dialogs/DialogsContainer";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";
// import {MapStatePropsType} from "../components/Dialogs/DialogsContainer";

export type MapStatePropsTypeForRedirect = {
  isAuth: boolean
}


export let mapStateToPropsForRedirect  = (state: AppStateType ): MapStatePropsTypeForRedirect  => {
  return {
    isAuth: state.auth.isAuth
  }
}

// export function withAuthRedirect (Component: FunctionComponent) {
//   class RedirectComponent extends React.Component<MapStatePropsTypeForRedirect> {
//     render() {
//       if (!this.props.isAuth) return <Redirect to={'/login'}/>
//
//       return <Component {...this.props}/>
//     }
//   }
//
//   let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
//
//   return ConnectedAuthRedirectComponent



export function withAuthRedirect<Props>(Component: React.FC<Props>) {
  const RedirectComponent: FC<MapStatePropsTypeForRedirect> = (props) => {
      let {isAuth, ...restProps} = props
      if (!isAuth) return <Redirect to={'/login'}/>

      return <Component {...restProps as Props}/>
  }

  let ConnectedAuthRedirectComponent = connect<MapStatePropsTypeForRedirect, {}, any, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent)

  return ConnectedAuthRedirectComponent
}