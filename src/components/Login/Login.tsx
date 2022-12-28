import {reduxForm, Field, InjectedFormProps, FormSubmitHandler, SubmitHandler} from "redux-form";
import {dataType, signIn, signOut} from "./../../redux/auth-reduser";
import {connect, useDispatch} from "react-redux";
import {Input} from "../common/FormControl/FormControl";
import {maxLength30, required} from "../../utils/validation/validation";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
// import {AppDispatch} from "../../redux/redux-store";
import s from "../common/FormControl/FormControle.module.css"

type FormDataType = {
  login: string
  password: string
  rememberMe: boolean
}

type MapStatePropsType = {
  isAuth: boolean
}

type MapDispatchPropsType = {
  signIn: (formData: dataType) => void
  signOut: () => void
}

type IProps = any

export type LoginContainerPropsType = MapStatePropsType & MapDispatchPropsType

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
        <Field
          placeholder={"Login"}
          name={"email"}
          component={Input}
          validate={[ required, maxLength30 ]}
        />
        <Field
          placeholder={"Password"}
          name={"password"}
          component={Input}
          validate={[ required, maxLength30 ]}
        />
        <Field
          type={"checkbox"}
          component={"input"}
          name={'rememberMe'}
        />
        <span>remember me</span>
        {props.error && <div className={s.formControl_error_sum}>{props.error}</div>}
        <button>login</button>
      </form>
  );
}

const LoginReduxForm = reduxForm<FormDataType>({
  // a unique name for the form
  form: 'login'
})(LoginForm)


const Login: React.FC<LoginContainerPropsType> = (props) => {
  const handleSubmit = (formData: any) => {
    props.signIn(formData)
  }

  if (props.isAuth) {
    return <Redirect to={'/profile'}/>
  }

  return (
    <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={handleSubmit}/>
    </div>

  );
}

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth
  };
}

export default connect(mapStateToProps, {signIn, signOut})(Login)