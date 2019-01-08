import React from 'react';
import { ShotChart } from "./ShotChart";
import { Radio, Switch } from 'antd';
import _ from 'lodash';
import {CountSlider} from "./CountSlider"

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        chartType: "hexbin",
        displayToolTip: true
    }

    onChangeSlider = (value) => {
        this.setState({
            minCount: value,
        });
    }

    onChangeRadio = (e) => {
        this.setState({
            chartType: e.target.value,
        });
    }

    onChangeToolTip = (value) => {
        this.setState({
            displayToolTip: value
        });
    }

    render() {
        const { minCount, chartType, displayToolTip } = this.state;
        return (
            <div className="data-view-container">
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={minCount}
                    displayToolTip={displayToolTip}
                    chartType={chartType}
                />

                {
                    chartType === "hexbin" ?
                        <CountSlider
                            onChange={_.debounce(this.onChangeSlider, 100)}
                            defaultValue={this.state.minCount}
                        />
                        : null
                }

                <RadioGroup onChange={this.onChangeRadio} value={chartType}>
                    <Radio value="hexbin">Hexbin</Radio>
                    <Radio value="scatter">Scatter</Radio>
                </RadioGroup>

                <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked onChange={this.onChangeToolTip}/>
            </div>
        );
    }
}
