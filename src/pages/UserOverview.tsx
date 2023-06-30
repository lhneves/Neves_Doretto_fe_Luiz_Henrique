import React from 'react';
import {useLocation} from 'react-router-dom';

import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';

const UserOverview = () => {
    const location = useLocation();
    const name = `${location.state.firstName} ${location.state.lastName}`;
    return (
        <Container>
            <Header title={`User ${location.state.firstName} ${location.state.lastName}`} />
            <Card
                id={location.state.id}
                title=""
                name={`${name} (${location.state.displayName})`}
                location={location.state.location}
            />
        </Container>
    );
};

export default UserOverview;
