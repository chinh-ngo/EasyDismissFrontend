import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {loginByAuth} from '../../services/AuthService';
import {loginUser} from '../../store/reducers/auth';
import {Input, Checkbox, Button} from '../elements';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';

import * as Yup from 'yup';

const Login = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [t] = useTranslation();

    if (isLoggedIn) navigate('/admin/dashboard');

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const token = await loginByAuth(email, password);
            toast.success('Logged in successfully!');
            setIsLoading(false);
            dispatch(loginUser(token));
            navigate('/admin/dashboard');
        } catch (error) {}
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(30, 'Must be 30 characters or less')
                .required('Required')
        }),
        onSubmit: (values) => {
            login(values.email, values.password);
        }
    });

    document.getElementById('root').classList = 'hold-transition login-page';

    return (
        <div className="login-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <Link to="/" className="h1">
                        <b>Easy</b>
                        <span>Dismiss</span>
                    </Link>
                </div>
                <div className="card-body">
                    <p className="login-box-msg">{t('login.label.signIn')}</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <Input
                                icon={faEnvelope}
                                placeholder="Email"
                                type="email"
                                formik={formik}
                                formikFieldProps={formik.getFieldProps('email')}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                icon={faLock}
                                placeholder="Password"
                                type="password"
                                formik={formik}
                                formikFieldProps={formik.getFieldProps(
                                    'password'
                                )}
                            />
                        </div>

                        <div className="row">
                            <div className="col-8">
                                <Checkbox
                                    checked={false}
                                    label={t('login.label.rememberMe')}
                                />
                            </div>
                            <div className="col-4">
                                <Button
                                    block="true"
                                    type="submit"
                                    isLoading={isLoading}
                                    // disabled={
                                    //     isFacebookAuthLoading ||
                                    //     isGoogleAuthLoading
                                    // }
                                >
                                    {t('login.button.signIn.label')}
                                </Button>
                            </div>
                        </div>
                    </form>
                    {/* <div className="social-auth-links text-center mt-2 mb-3">
                        <Button
                            block
                            icon="facebook"
                            onClick={loginByFacebook}
                            isLoading={isFacebookAuthLoading}
                            disabled={isLoading || isGoogleAuthLoading}
                        >
                            {t('login.button.signIn.social', {
                                what: 'Facebook'
                            })}
                        </Button>
                        <Button
                            block
                            icon="google"
                            theme="danger"
                            onClick={loginByGoogle}
                            isLoading={isGoogleAuthLoading}
                            disabled={isLoading || isFacebookAuthLoading}
                        >
                            {t('login.button.signIn.social', {what: 'Google'})}
                        </Button>
                    </div> */}
                    <p className="mb-1">
                        <Link to="/forgot-password">
                            {t('login.label.forgotPass')}
                        </Link>
                    </p>
                    {/* <p className="mb-0">
                        <Link to="/register" className="text-center">
                            {t('login.label.registerNew')}
                        </Link>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default Login;
