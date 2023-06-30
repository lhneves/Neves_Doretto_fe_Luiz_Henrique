import React from 'react';
import {
    fireEvent,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react';
import {SWRConfig} from 'swr';
import userEvent from '@testing-library/user-event';
import TeamOverview from '../TeamOverview';
import * as API from '../../api';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
    useLocation: () => ({
        state: {name: 'Name Test'},
    }),
    useParams: () => {
        return {
            teamId: '1001',
        };
    },
}));

describe('TeamOverview', () => {
    const asyncGetData = jest.spyOn(API, 'getData');
    const asyncGetUserData = jest.spyOn(API, 'getUserData');
    const renderTeamOverview = () =>
        render(
            <SWRConfig value={{provider: () => new Map()}}>
                <TeamOverview />
            </SWRConfig>
        );

    beforeEach(() => {
        asyncGetData
            .mockResolvedValue({})
            .mockResolvedValueOnce({
                id: '1',
                teamLeadId: '2',
                teamMemberIds: ['3', '4', '5'],
            })
            .mockResolvedValueOnce({
                id: '2',
                firstName: 'Lead',
                lastName: 'Name',
                displayName: 'test',
                location: '',
                avatar: '',
            });

        asyncGetUserData.mockResolvedValue({
            id: '3',
            firstName: 'FirstName',
            lastName: 'LastName',
            displayName: 'test',
            location: '',
            avatar: '',
        });
    });

    it('should render page with team name from location state and spinner while loading', async () => {
        renderTeamOverview();

        await waitFor(() => {
            expect(screen.getByText('Team Name Test')).toBeInTheDocument();
        });
        expect(screen.getByTestId('spinner')).toBeInTheDocument();

        await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'));
    });

    it('should call all API endpoints and render the team member and lead cards', async () => {
        renderTeamOverview();

        await waitFor(() => {
            expect(asyncGetData).toHaveBeenCalledWith('teams/1001');
        });

        await waitFor(() => {
            expect(asyncGetUserData).toHaveBeenCalledTimes(3);
        });

        expect(asyncGetUserData).toHaveBeenCalledWith('3');
        expect(asyncGetUserData).toHaveBeenCalledWith('4');
        expect(asyncGetUserData).toHaveBeenCalledWith('5');

        await waitFor(() => {
            expect(asyncGetData).toHaveBeenCalledWith('users/2');
        });

        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        });

        expect(screen.getByText('Lead Name (test)')).toBeInTheDocument();
        expect(screen.queryAllByText('FirstName LastName (test)')).toHaveLength(3);
    });

    it('should filter results of team members when name is searched', async () => {
        renderTeamOverview();

        await waitFor(() => {
            expect(screen.getByTestId('search-icon')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId('search-icon'));
        const input = screen.getByTestId('search');

        await userEvent.type(input, 'Lead');

        await waitFor(() => {
            expect(screen.getByText('Lead Name (test)')).toBeInTheDocument();
        });

        expect(screen.queryAllByText('FirstName LastName (test)')).toHaveLength(0);
    });
});
