import React from 'react';
import {
    fireEvent,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SWRConfig} from 'swr';
import Teams from '../Teams';
import * as API from '../../api';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('Teams', () => {
    const asyncGetData = jest.spyOn(API, 'getData');
    const renderTeams = () => {
        render(
            <SWRConfig value={{provider: () => new Map()}}>
                <Teams />
            </SWRConfig>
        );
    };

    beforeEach(() => {
        asyncGetData.mockResolvedValue([
            {
                id: 'test-id-1',
                name: 'Team1',
            },
            {
                id: 'test-id-2',
                name: 'Team2',
            },
        ]);
    });

    it('should render header and spinner while loading', async () => {
        renderTeams();

        expect(screen.getByText('Teams')).toBeInTheDocument();
        expect(screen.getByTestId('spinner')).toBeInTheDocument();

        await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'));
    });

    it('should render teams list and search filter', async () => {
        renderTeams();

        expect(screen.getByTestId('spinner')).toBeInTheDocument();

        expect(asyncGetData).toHaveBeenCalledWith('teams');

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.getByText('Team2')).toBeInTheDocument();

        expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('should filter results of teams when name is searched', async () => {
        renderTeams();

        await waitFor(() => {
            expect(screen.getByTestId('search-icon')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId('search-icon'));
        const input = screen.getByTestId('search');

        await userEvent.type(input, 'Team1');

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.queryByText('Team2')).not.toBeInTheDocument();
    });

    it('should navigate to team overview page', async () => {
        const navProps = {id: 'test-id-1', name: 'Team1'};

        renderTeams();

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId('cardContainer-test-id-1'));

        expect(mockUseNavigate).toHaveBeenCalledWith('/team/test-id-1', {state: navProps});
    });
});
