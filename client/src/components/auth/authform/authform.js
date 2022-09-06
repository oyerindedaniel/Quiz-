import classes from "./authform.module.css";

const AuthForm = ({ htmlFor, id, content, type, onChange, placeholder }) => {
  return (
    <div className={`${classes.inputControl}`}>
      <label className={`${classes.label}`} htmlFor={htmlFor}>
        {content}
      </label>
      <input
        className={`${classes.input}`}
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
      />
    </div>
  );
};

export default AuthForm;
