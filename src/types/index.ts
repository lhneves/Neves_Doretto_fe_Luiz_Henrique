export interface ITeam {
    id: string;
    name: string;
}

export interface ITeamOverview {
    id: string;
    teamLeadId: string;
    teamMemberIds: string[];
}

export interface IUserData {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    location: string;
    avatar: string;
}

export interface ICardItem {
    id: string;
    title: string;
    name: string;
    location?: string;
    navigateTo?: string;
    navigationProps?: IUserData | ITeam;
}
