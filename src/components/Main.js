import React from 'react';
import { Profile } from './Profile'
import { DataViewContainer } from "./DataViewContainer"
import nba from 'nba';
import { SearchBar } from "./SearchBar"
import { DEFAULT_PLAYER_INFO } from "../constant"

export class Main extends React.Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO
    }

    loadPlayerInfo = (playerName) => {
        const playerId = nba.findPlayer(playerName).playerId;

        nba.stats.playerInfo({
            PlayerID: playerId
        }).then((info) => {
            const playerInfo = Object.assign(
                {}, info.commonPlayerInfo[0], info.playerHeadlineStats[0]
            );
            this.setState({
                playerInfo
            });
        });
    }

    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.playerName);
    }

    render() {
        const { playerInfo } = this.state;
        return (
            <div className="main">
                <SearchBar loadPlayerInfo={this.loadPlayerInfo}/>
                <div className="player">
                    <Profile playerInfo={playerInfo}></Profile>
                    <DataViewContainer playerId={playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}