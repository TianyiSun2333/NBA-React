import React from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import nba from 'nba';
import {PROFILE_IMG_URL_PREFIX} from "../constant"

const Option = AutoComplete.Option;

export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    handleSearch = (value) => {
        if (value) {
            const players = nba.searchPlayers(value);
            this.setState({
                dataSource: players.map(({fullName, playerId}) =>
                    <Option key={`${playerId}`} value={`${fullName}`}>
                        <img
                            className="player-option-image"
                            src={`${PROFILE_IMG_URL_PREFIX}/${playerId}.png`}
                            alt={`${fullName}`}
                        />
                        <span className="player-option-label">{`${fullName}`}</span>
                    </Option>
                )
            });
        } else {
            this.setState({
               dataSource: []
            });
        }
    }

    onSelect = (value) => {
        this.props.loadPlayerInfo(value);
    }

    render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
                className="search-bar"
                dataSource={dataSource}
                style={{ width: '100%' }}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search NBA player"
                size="large"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" />} />
            </AutoComplete>
        );
    }
}
