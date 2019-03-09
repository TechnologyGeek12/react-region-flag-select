import React, { Component } from 'react';
import * as cities from './data/cities.json';
import * as countries from './data/countries.json';
import * as states from './data/states.json';

var citiesValue = [];
var handleChangeData = {cityData: {},countryData:{} };
class CitySelect extends Component {
    constructor(props) {
        super(props);

        //for city only
        let citiesValue = []
        let stateArray = [];
        let countryData='';
        if (props.countryCode) {
            let newCityData = [];
            countryData = countries.countries.filter(countriesData => countriesData.sortname === props.countryCode);
            stateArray = states.states.filter(statesData => parseInt(statesData.country_id) === countryData[0].id);
            cities.cities.filter(citiesData1 => {
                stateArray.map(stateValues1 => {
                    if (stateValues1.id === citiesData1.state_id) {
                        newCityData.push(citiesData1);
                    }
                });
            })
            citiesValue = newCityData;
        }
        else {
            citiesValue = cities.cities;
        }
        this.state = { selectedCity: 'select a city', cityData: citiesValue,countryCode:countryData }

    }

    setCityData = (data) => {
        this.setState({ selectedCity: data.name });
        handleChangeData.countryData = this.props.countryCode ? {'data':this.state.countryCode && this.state.countryCode[0]} : '';
        handleChangeData.cityData = { data };
        this.props.handleChange(handleChangeData);
    }

    changeCityData = (e) => {
        let cityData = citiesValue.filter(data => data.name.toLowerCase().includes(e.target.value.toLowerCase()));
        this.setState({ cityData: cityData });
    }


    render() {
        return (
            <div>
                <span className="dropdown">
                    <button style={{ padding: '6px 20px 6px 10px' }}>{this.state.selectedCity}</button>
                    <label>
                        <input type="checkbox" />
                        <ul>
                            <li style={{ marginTop: '-5px' }}><input style={{ width: '-webkit-fill-available', borderRadius: 6, padding: 5 }} placeholder='Search...' type='text' onChange={(e) => { this.changeCityData(e) }} /></li>
                            <div style={{ maxHeight: '343px', overflowY: 'auto', minHeight: '41px', marginTop: '-4px', paddingTop: '15px', paddingLeft: '10px', textAlign: '-webkit-auto' }}>
                                {
                                    this.state.cityData.length ? this.state.cityData.map((data, idx) => {
                                        return <li key={idx} onClick={() => this.setCityData(data)} style={{
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

export default CitySelect;
