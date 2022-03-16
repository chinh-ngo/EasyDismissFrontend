export const loginByAuth = async (email, password) => {
    const token = 'SuperScretToken';
    document.getElementById('root').classList.remove('login-page');
    document.getElementById('root').classList.remove('hold-transition');
    return token;
};

export const getProfile = async () => {
    const user = {
        firstName: 'Musa',
        lastName: 'Ugurlu',
        fullName: 'Musa Ugurlu',
        email: 'mu@sa.com',
        picture: null,
        settings: {
            startPage: '/admin/dashboard'
        }
    };

    return user;
};
