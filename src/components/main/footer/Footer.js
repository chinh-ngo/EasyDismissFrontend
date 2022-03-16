import React from 'react';
import {useTranslation} from 'react-i18next';
import {DateTime} from 'luxon';

const Footer = () => {
    const [t] = useTranslation();

    return (
        <footer className="main-footer">
            <strong>
                <span>Copyright © {DateTime.now().toFormat('y')} </span>
                <a
                    href={process.env.REACT_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {process.env.REACT_APP_NAME}
                </a>
                <span>.</span>
            </strong>
            <div className="float-right d-none d-sm-inline-block">
                <b>{t('footer.version')}</b>
                <span>&nbsp;{process.env.REACT_APP_VERSION}</span>
            </div>
        </footer>
    );
};

export default Footer;
