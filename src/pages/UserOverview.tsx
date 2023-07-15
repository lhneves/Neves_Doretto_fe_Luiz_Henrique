import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import {ToastContainer, toast} from 'react-toastify';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';

const UserOverview = () => {
    const location = useLocation();
    const [name, setName] = useState('');

    useEffect(() => {
        if (!location.state) {
            toast.error('Something went wrong, try again!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            setName(`${location.state.firstName} ${location.state.lastName}`);
        }
    }, [location]);

    return (
        <Container>
            <Header title={`User ${name}`} />
            {!!location.state && (
                <Card
                    id={location.state.id}
                    title=""
                    name={`${name} (${location.state.displayName})`}
                    location={location.state.location}
                />
            )}
            <ToastContainer />
        </Container>
    );
};

export default UserOverview;
