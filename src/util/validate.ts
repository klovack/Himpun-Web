import * as Yup from 'yup';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(PASSWORD_REGEX, { message: 'Must have minimum one lowercase and one uppercase character, one number and one special character.' })
    .required('Required'),
  firstname: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  lastname: Yup.string()
    .min(2, 'Too Short!')
    .required('Required')
});

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export {
  RegisterSchema,
  LoginSchema
}