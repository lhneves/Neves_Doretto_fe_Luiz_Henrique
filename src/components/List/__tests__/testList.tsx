import React from 'react';
import {render, screen} from '@testing-library/react';
import {ICardItem} from 'types';
import List from '..';

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => jest.fn(),
}));

describe('List', () => {
    it('should render spinner and not render items when it is loading', () => {
        const items = [
            {
                id: 'test-id',
                title: 'Test Title',
                name: 'Test Name',
                location: 'Location Test',
                navigateTo: 'path',
                navigationProps: {id: '1', name: 'Test'},
            },
        ] as ICardItem[];
        render(<List isLoading items={items} />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        expect(screen.queryByTestId('cardContainer-test-id')).not.toBeInTheDocument();
    });

    it('should not render spinner and render items when it is not loading', () => {
        const items = [
            {
                id: 'test-id',
                title: 'Test Title',
                name: 'Test Name',
                location: 'Location Test',
                navigateTo: 'path',
                navigationProps: {id: '1', name: 'Test'},
            },
        ] as ICardItem[];
        render(<List isLoading={false} items={items} />);

        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-test-id')).toBeInTheDocument();
    });

    it('should render multiple cards when multiple items is passed', () => {
        const items = [
            {
                id: 'test-id-1',
                title: 'Test Title 1',
                name: 'Test Name 1',
                location: 'Location Test 1',
                navigateTo: 'path',
                navigationProps: {id: '1', name: 'Test'},
            },
            {
                id: 'test-id-2',
                title: 'Test Title 2',
                name: 'Test Name 2',
                location: 'Location Test 2',
                navigateTo: 'path',
                navigationProps: {id: '1', name: 'Test'},
            },
        ];
        render(<List isLoading={false} items={items} />);

        expect(screen.getByTestId('cardContainer-test-id-1')).toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-test-id-2')).toBeInTheDocument();
    });
});
