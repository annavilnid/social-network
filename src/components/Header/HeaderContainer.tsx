import {Component} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {
  initialStateType, dataType,
} from "../../redux/auth-reduser";
import {AppStateType} from "../../redux/redux-store";
import {Header} from "./Header";
import {
  setAuthUserData, getUserInfo, signOut
} from "./../../redux/auth-reduser";
import {usersAPI} from "../../api/api";

export type MapStatePropsType = {
  login: string | null
  isAuth: boolean
}

export type MapDispatchPropsType = {
  // setAuthUserData: (data: dataType) => void;
  // getUserInfo: () => void
  signOut: () => void
}

export type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType

export class HeaderContainer extends Component <HeaderContainerPropsType> {
  // componentDidMount() {
  //   this.props.getUserInfo()
  //   // this.props.toggleLoader(!this.props.isLoading)
  //   usersAPI.getUserInfo()
  //     .then((response) => {
  //       console.log(response)
  //       if (response.data.resultCode === 0) {
  //         console.log('data')
  //         console.log(response.data.data)
  //         let userData = response.data.data;
  //         console.log('1')
  //         console.log(this.props);
  //         let userAuthData: dataType = {
  //           userId: response.data.data.id,
  //           login: response.data.data.login,
  //           email: response.data.data.email,
  //         }
  //         this.props.setAuthUserData(userAuthData)
  //       }
  //     })
  //     .catch((err) => {
  //       // console.log(err)
  //     })
  //     .finally(() => {
  //       // this.props.toggleLoader(!this.props.isLoading)
  //     });
  // }

  render() {
    return <Header {...this.props} />
  }
}

export let mapStateToProps  = (state: AppStateType ): MapStatePropsType   => {
  return {
    login: state.auth.login,
    isAuth: state.auth.isAuth,
  }
}

export default connect(mapStateToProps,{signOut})(HeaderContainer);

