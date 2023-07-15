import React from 'react';
import {useNavigate} from 'react-router-dom';
import {ICardItem} from 'types';
import {Container, InfoText, Title} from './styles';

const Card = ({id, title, name, location, navigateTo, navigationProps}: ICardItem) => {
    const navigate = useNavigate();

    const onCardClick = e => {
        e.preventDefault();
        if (navigateTo) {
            navigate(navigateTo, {state: navigationProps});
        }
    };

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            onClick={onCardClick}
            navigateTo={!!navigateTo}
        >
            <Title data-testid="cardTitle">{title}</Title>
            <InfoText data-testid="cardName">{name}</InfoText>
            {location ? <InfoText data-testid="cardLocation">📍{location}</InfoText> : null}
        </Container>
    );
};

export default Card;
