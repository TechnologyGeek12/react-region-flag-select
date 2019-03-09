import React, { Component } from 'react';
import * as countries from './data/countries.json';
import * as states from './data/states.json';

var stateValue = [];
var handleChangeData = {stateData: {},countryData:{}};
class StateSelect extends Component {
    constructor(props) {
        super(props);
        let countryId = countries.countries.filter(countriesData =>
            countriesData.sortname.toLowerCase() === props.countryCode.toLowerCase()
        );
        let stateData = countryId.length ? states.states.filter(statesData => parseInt(statesData.country_id) === countryId[0].id) : [];
        stateValue = stateData;
        this.state = { selectedState: 'select a state', stateData: stateData.length ? stateData : states.states,countryCode:countryId }
    }

    setStateData = (data) => {
        this.setState({ selectedState: data.name });
        handleChangeData.countryData = this.props.countryCode ? {'data':this.state.countryCode && this.state.countryCode[0]} : '';
        handleChangeData.stateData = { data };
        this.props.handleChange(handleChangeData);
    }

    changeStateData = (e) => {
        let stateData = stateValue.filter(data => data.name.toLowerCase().includes(e.target.value.toLowerCase()));
        this.setState({ stateData: stateData });
    }

    render() {
        return (
            <div>
                <span className="dropdown">
                    <button style={{ padding: '6px 20px 6px 10px' }}>{this.state.selectedState}</button>
                    <label>
                        <input type="checkbox" />
                        <ul>
                            <li style={{ marginTop: '-5px' }}><input style={{ width: '-webkit-fill-available', borderRadius: 6, padding: 5 }} placeholder='Search...' type='text' onChange={(e) => { this.changeStateData(e) }} /></li>
                            <div style={{ maxHeight: '343px', overflowY: 'auto', minHeight: '41px', marginTop: '-4px', paddingTop: '15px', paddingLeft: '10px', textAlign: '-webkit-auto' }}>
                                {

                                    this.state.stateData.length ? this.state.stateData.map((data, idx) => {
                                        return <li key={idx} onClick={() => this.setStateData(data)} style={{
                                            cursor: 'pointer', textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            width: '90%',
                                            height: '1.6em',
                                            whiteSpace: 'nowrap',
                                            fontFamily: 'none',
                                        }}>{data.name}</li>
                                    }) : 'No data found'
                                }
                            </div>
                        </ul>
                    </label>
                </span>
            </div>
        );
    }
}

export default StateSelect;
