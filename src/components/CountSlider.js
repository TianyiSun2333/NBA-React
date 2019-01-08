import React from 'react';
import { Col, InputNumber, Row, Slider } from "antd"

export class CountSlider extends React.Component {
    state = {
        minCount: this.props.defaultValue,
    }

    onChange = (value) => {
        if (!value) {
            return;
        }
        const cleanValue = parseInt(value, 10) ? parseInt(value, 10) : this.state.minCount;
        this.setState({
            minCount: cleanValue,
        });
        this.props.onChange(cleanValue);
    }

    render() {
        const { minCount } = this.state;
        return (
            <Row>
                <Col offset={4} span={12}>
                    <Slider
                        min={2}
                        max={20}
                        onChange={this.onChange}
                        value={minCount}
                    />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={2}
                        max={20}
                        style={{ marginLeft: 16 }}
                        value={minCount}
                        onChange={this.onChange}
                    />
                </Col>
            </Row>
        );
    }
}