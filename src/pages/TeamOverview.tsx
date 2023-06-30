import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {UserData} from 'types';

import {getTeamOverview, getUserData} from '../api';

import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();

    const [teamLead, setTeamLead] = useState<UserData>();
    const [teamMembers, setTeamMembers] = useState<UserData[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const formatMembersToCards = (membersList: UserData[]) => {
        if (membersList.length === 0) {
            return [];
        }

        return membersList.map(member => {
            const name = `${member.firstName} ${member.lastName} (${member.displayName})`;

            return {
                id: member.id,
                title: 'Team Member',
                navigateTo: `/user/${member.id}`,
                location: member.location,
                navigationProps: member,
                name,
            };
        });
    };

    const teamLeadCard = () => {
        const name = `${teamLead.firstName} ${teamLead.lastName} (${teamLead.displayName})`;

        return (
            <Card
                key={teamLead.id}
                id={teamLead.id}
                name={name}
                title="Team Lead"
                location={teamLead.location}
                navigateTo={`/user/${teamLead.id}`}
                navigationProps={teamLead}
            />
        );
    };

    useEffect(() => {
        var getTeamUsers = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const teamLeadData = await getUserData(teamLeadId);

            const teamMembersData = await Promise.all(
                teamMemberIds.map(teamMemberId => getUserData(teamMemberId))
            );

            setTeamLead(teamLeadData);
            setTeamMembers(teamMembersData);
            setIsLoading(false);
        };
        getTeamUsers();
    }, [teamId]);

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {!isLoading && teamLead && teamLeadCard()}
            <List items={formatMembersToCards(teamMembers ?? [])} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
