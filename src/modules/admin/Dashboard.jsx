import React from 'react';
import {useTranslation} from 'react-i18next';
import {SmallBox} from '../../components/elements';
import Main from '../../components/main/Main';
import {useDispatch, useSelector} from 'react-redux';

const Dashboard = () => {
    const [t] = useTranslation();
    return (
        <Main>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={150}
                            title={t(
                                'administration.dashboard.topBoxes.totalStudents'
                            )}
                            type="info"
                            icon="ion-android-people"
                            navigateTo="/students"
                        />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={53}
                            icon="ion-android-car"
                            title={t(
                                'administration.dashboard.topBoxes.totalCarRiders'
                            )}
                            type="success"
                            navigateTo="/"
                        />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={44}
                            icon="ion-ios-barcode-outline"
                            title={t(
                                'administration.dashboard.topBoxes.totalCarLines'
                            )}
                            type="warning"
                            navigateTo="/"
                        />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={65}
                            icon="ion-ios-monitor"
                            title={t(
                                'administration.dashboard.topBoxes.totalRooms'
                            )}
                            type="danger"
                            navigateTo="/"
                        />
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default Dashboard;
