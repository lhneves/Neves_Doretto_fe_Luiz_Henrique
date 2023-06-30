export interface Team {
    id: string;
    name: string;
}

export interface TeamOverview {
    id: string;
    teamLeadId: string;
    teamMemberIds: string[];
}

export interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    location: string;
    avatar: string;
}

export interface CardItem {
    id: string;
    title: string;
    name: string;
    location?: string;
    navigateTo?: string;
    navigationProps?: UserData | Team;
}
