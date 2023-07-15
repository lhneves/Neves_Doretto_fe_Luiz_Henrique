import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Card from '..';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('Card', () => {
    it('should render card with Title and Name', () => {
        render(<Card id="card-test-id" title="Title Test" name="Name Test" />);

        expect(screen.getByTestId('cardContainer-card-test-id')).toBeInTheDocument();
        expect(screen.getByText('Title Test')).toBeInTheDocument();
        expect(screen.getByText('Name Test')).toBeInTheDocument();
    });

    it('should render card with Title, Name and Location (all texts possible)', () => {
        render(
            <Card id="card-test-id" title="Title Test" name="Name Test" location="Location Test" />
        );

        expect(screen.getByTestId('cardContainer-card-test-id')).toBeInTheDocument();

        expect(screen.getByTestId('cardTitle')).toBeInTheDocument();
        expect(screen.getByText('Title Test')).toBeInTheDocument();

        expect(screen.getByTestId('cardName')).toBeInTheDocument();
        expect(screen.getByText('Name Test')).toBeInTheDocument();

        expect(screen.getByTestId('cardLocation')).toBeInTheDocument();
        expect(screen.getByText('📍Location Test')).toBeInTheDocument();
    });

    it('should navigate when card is clicked and has a navigation link (navigationTo)', () => {
        render(<Card id="card-test-id" title="Title Test" name="Name Test" navigateTo="path" />);

        fireEvent.click(screen.getByTestId('cardContainer-card-test-id'));

        expect(mockUseNavigate).toHaveBeenCalledWith('path', {state: undefined});
    });

    it('should navigate (with state data) when card is clicked and has a navigation link (navigationTo)', () => {
        const navProps = {id: '1', name: 'Test'};

        render(
            <Card
                id="card-test-id"
                title="Title Test"
                name="Name Test"
                navigateTo="path"
                navigationProps={navProps}
            />
        );

        fireEvent.click(screen.getByTestId('cardContainer-card-test-id'));

        expect(mockUseNavigate).toHaveBeenCalledWith('path', {state: navProps});
    });
});
