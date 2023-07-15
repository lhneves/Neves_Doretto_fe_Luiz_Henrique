import React, {useEffect, useState} from 'react';
import {ITeam} from 'types';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useSWR from 'swr';
import {getData} from '../api';

import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

const Teams = () => {
    const [searchTeam, setSearchTeam] = useState('');
    const [teamsFiltered, setTeamsFiltered] = useState<ITeam[]>();
    const {data: teams, isLoading, error} = useSWR<ITeam[]>('teams', getData);

    useEffect(() => {
        if (!!error || teams === null) {
            toast.error('Something went wrong, try again!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    }, [teams, error]);

    const formatTeamsToCards = (teamList: ITeam[]) => {
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

    const handleTeamSearch = (teamName: string) => {
        setSearchTeam(teamName);
        if (teamName === '') {
            setTeamsFiltered(undefined);
            return;
        }

        const teamFilter = teams.filter(team => {
            if (team.name.toLowerCase().includes(teamName.toLowerCase())) {
                return team;
            }
            return false;
        });

        setTeamsFiltered(teamFilter);
    };

    return (
        <Container>
            <Header
                title="Teams"
                showBackButton={false}
                searchInput={teams && !error && {value: searchTeam, onChange: handleTeamSearch}}
            />
            <List items={formatTeamsToCards(teamsFiltered ?? teams ?? [])} isLoading={isLoading} />
            <ToastContainer />
        </Container>
    );
};

export default Teams;
