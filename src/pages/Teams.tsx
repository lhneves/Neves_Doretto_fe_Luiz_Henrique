import React, {useEffect, useState} from 'react';
import {Team} from 'types';

import {getTeams} from '../api';

import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

const Teams = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const formatTeamsToCards = (teamList: Team[]) => {
        if (teamList === undefined) {
            return [];
        }

        return teamList.map(team => {
            return {
                id: team.id,
                title: 'Team Name',
                name: team.name,
                navigateTo: `/team/${team.id}`,
                navigationProps: team,
            };
        });
    };

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await getTeams();
            setTeams(response);
            setIsLoading(false);
        };
        fetchTeams();
    }, []);

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List items={formatTeamsToCards(teams)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
