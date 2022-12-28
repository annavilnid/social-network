import s from "../FormControl/FormControle.module.css"

export const FormControl = ({input, meta, child, ...props}) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={s.formControl + ' ' + (hasError ? s.error : "")}>
      {props.children}
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const TextArea = (props: any) => {
  const {input, meta, child, ...restProps} = props;
  return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};

export const Input = (props: any) => {
  const {input, meta, child, ...restProps} = props;
  return  <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};
