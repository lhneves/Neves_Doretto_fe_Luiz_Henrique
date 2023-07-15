import React from 'react';

import {ICardItem} from 'types';

import Card from '../Card';
import {Spinner} from '../Spinner';

import {Container} from './styles';

interface ListProps {
    items: ICardItem[];
    isLoading: boolean;
}

const List = ({items, isLoading}: ListProps) => {
    return (
        <Container>
            {isLoading && <Spinner />}
            {!isLoading &&
                items.map(({id, title, name, location, navigateTo, navigationProps}, index) => {
                    return (
                        <Card
                            key={`${id}-${index}`}
                            id={id}
                            name={name}
                            title={title}
                            location={location}
                            navigateTo={navigateTo}
                            navigationProps={navigationProps}
                        />
                    );
                })}
        </Container>
    );
};

export default List;
