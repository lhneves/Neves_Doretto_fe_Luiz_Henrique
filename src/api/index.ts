import {ITeam, ITeamOverview, IUserData} from 'types';

export const getData = async (path = '') => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/${path}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
};

export const getTeams = (): Promise<ITeam[]> => {
    return getData('teams');
};

export const getTeamOverview = (teamId: string): Promise<ITeamOverview> => {
    return getData(`teams/${teamId}`);
};

export const getUserData = (userId: string): Promise<IUserData> => {
    return getData(`users/${userId}`);
};
