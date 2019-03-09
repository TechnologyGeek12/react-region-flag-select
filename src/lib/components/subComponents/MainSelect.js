import React, { Component } from 'react';
import * as cities from './data/cities.json';
import * as countries from './data/countries.json';
import * as states from './data/states.json';

var stateValue = [];
var citiesValue = [];
var handleChangeData = { countryData: {}, stateData: {}, cityData: {} };
class MainSelect extends Component {
    constructor(props) {
        super(props);

        //for custom country only
        let customCountries = [];
        countries.countries.filter(countriesData => {
            props.customCountryCode.map(customCountriesData => {
                if (countriesData.sortname === customCountriesData.toUpperCase())
                    customCountries.push(countriesData);
            });
        })
        //for state only
        let stateArray = [];
        let countryData = '';
        if (!props.isCountry) {
            if (props.countryCode) {
                countryData = countries.countries.filter(countriesData => countriesData.sortname === props.countryCode);
                stateArray = states.states.filter(statesData => parseInt(statesData.country_id) === countryData[0].id);
            }
            else {
                stateArray = states.states;
            }
        }

        this.state = { completeCountryCode: null, completeStateCode: null, data: '', selectedCountry: '', selectedState: 'select a state', selectedCity: 'select a city', dropData: { data: 'select a country', flag: null, phoneCode: null }, countries: customCountries.length ? customCountries : countries.countries, stateData: stateArray.length ? stateArray : [], cityData: citiesValue, countryCode: countryData }

    }
    setCountryData = (data, flag) => {
        let flagData = (data.phoneCode != 44 && data.id !== 8 && data.phoneCode != 673 && (data.phoneCode != 0 || (data.id == 29 || data.id == 78 || data.id == 174 || data.id == 203)) && data.id != 232) ? flag : undefined;
        this.setState({ dropData: { data: data.name, flag: flagData, phoneCode: data.phoneCode }, selectedCountry: data.id, selectedState: 'select a state', selectedCity: 'select a city' });
        let stateData = states.states.filter(statesData => parseInt(statesData.country_id) === data.id);
        stateValue = stateData;
        this.setState({ stateData: stateData, completeCountryCode: data });
        let newCityData = [];
        if (!this.props.isState && this.props.isCity) {
            cities.cities.filter(citiesData1 => {
                stateData.map(stateValues1 => {
                    if (stateValues1.id === citiesData1.state_id) {
                        newCityData.push(citiesData1);
                    }
                });
            })
            this.setState({ cityData: newCityData });
            citiesValue = newCityData;
        }
        else
            citiesValue = [];

        handleChangeData.countryData = { data };
        handleChangeData.stateData = {};
        handleChangeData.cityData = {};
        this.props.handleChange(handleChangeData);
    }

    setStateData = (data) => {
        this.setState({ selectedState: data.name });
        let cityData = cities.cities.filter(citiesData => citiesData.state_id === data.id);
        citiesValue = cityData;
        this.setState({ cityData: cityData, selectedCity: 'select a city', completeStateCode: data });
        handleChangeData.countryData = this.state.completeCountryCode ? { 'data': this.state.completeCountryCode } : { 'data': this.state.countryCode && this.state.countryCode[0] };
        handleChangeData.stateData = { data };
        handleChangeData.cityData = {};
        this.props.handleChange(handleChangeData);
    }


    setCityData = (data) => {
        this.setState({ selectedCity: data.name });
        handleChangeData.countryData = this.state.completeCountryCode ? { 'data': this.state.completeCountryCode } : { 'data': this.state.countryCode && this.state.countryCode[0] };
        handleChangeData.stateData = { 'data': this.state.completeStateCode };
        handleChangeData.cityData = { data };
        this.props.handleChange(handleChangeData);
    }

    changeData = (e) => {
        let newCountry = countries.countries.filter(data => data.name.toLowerCase().includes(e.target.value.toLowerCase()) || parseInt(data.phoneCode, 10) === parseInt(e.target.value, 10));
        this.setState({ countries: newCountry, selectedState: 'select a state' });
    }

    changeStateData = (e) => {
        let stateData = stateValue.filter(data => data.name.toLowerCase().includes(e.target.value.toLowerCase()));
        this.setState({ stateData: stateData });
    }

    changeCityData = (e) => {
        let cityData = citiesValue.filter(data => data.name.toLowerCase().includes(e.target.value.toLowerCase()));
        this.setState({ cityData: cityData });
    }


    render() {
        return (
            <div>
                {this.props.isCountry && <span className="dropdown">
                    <button style={((!this.props.isFlag && !this.props.isPhoneCode) || (!this.state.dropData.flag || !this.state.dropData.phoneCode)) ? { padding: '6px 20px 6px 10px', minWidth: 200 } : { minWidth: 200 }}>{this.props.isFlag ? (this.state.dropData.flag ? <img width='30' height='30' style={{ padding: '3%' }} src={this.state.dropData.flag && require(`./flags/${this.state.dropData.flag.toLowerCase()}.svg`) ? require(`./flags/${this.state.dropData.flag.toLowerCase()}.svg`) : require(`./flags/noFlag.svg`)} alt={require(`./flags/noFlag.svg`)} /> : '') : ''}{this.state.dropData.data}{this.props.isPhoneCode ? (this.state.dropData.phoneCode ? <span>{` (+${this.state.dropData.phoneCode})`}</span> : '') : ''}</button>
                    <label>
                        <input type="checkbox" />
                        <ul>
                            <li style={{ marginTop: '-5px' }}><input style={{ width: '-webkit-fill-available', borderRadius: 6, padding: 5 }} placeholder='Search...' type='text' onChange={(e) => { this.changeData(e) }} /></li>
                            <div style={{ maxHeight: '343px', overflowY: 'auto', minHeight: '41px', marginTop: '-4px', paddingTop: '15px', paddingLeft: '10px', textAlign: '-webkit-auto' }}>
                                {
                                    this.state.countries.map((data, idx) => {
                                        return <li key={idx} onClick={() => { this.setCountryData(data, data.sortname) }} style={{
                                            cursor: 'pointer', textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            width: '90%',
                                            height: '1.6em',
                                            whiteSpace: 'nowrap',
                                            fontFamily: 'none',
                                        }}>{this.props.isFlag ? <img width='30' height='30' style={{ padding: '3%' }} src={(data.phoneCode != 44 && data.id !== 8 && data.phoneCode != 673 && (data.phoneCode != 0 || (data.id == 29 || data.id == 78 || data.id == 174 || data.id == 203)) && data.id != 232) ? require(`./flags/${data.sortname.toLowerCase()}.svg`) : require(`./flags/noFlag.svg`)} alt={require(`./flags/noFlag.svg`)} /> : ''}{data.name}{this.props.isPhoneCode ? <span>{` (+${data.phoneCode})`}</span> : ''}</li>
                                    })
                                }
                            </div>
                        </ul>
                    </label>
                </span>}

                {this.props.isState && <span className="dropdown">
                    <button style={!this.state.selectedCountry ? { padding: '6px 20px 6px 10px', opacity: '0.65' } : { padding: '6px 20px 6px 10px' }}>{this.state.selectedState}</button>
                    <label>
                        <input type="checkbox" style={!this.state.selectedCountry ? { cursor: 'not-allowed' } : {}} />
                        {!this.state.selectedCountry ? '' : <ul>
                            <li style={{ marginTop: '-5px' }}><input style={{ width: '-webkit-fill-available', borderRadius: 6, padding: 5 }} placeholder='Search...' type='text' onChange={(e) => { this.changeStateData(e) }} /></li>
                            <div style={{ maxHeight: '343px', overflowY: 'auto', minHeight: '41px', marginTop: '-4px', paddingTop: '15px', paddingLeft: '10px', textAlign: '-webkit-auto' }}>
                                {
                                    (this.state.selectedCountry || !this.props.isCountry) ?
                                        this.state.stateData.length ? this.state.stateData.map((data, idx) => {
                                            return <li key={idx} onClick={() => this.setStateData(data)} style={{
                                                cursor: 'pointer', textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                width: '90%',
                                                height: '1.6em',
                                                whiteSpace: 'nowrap',
                                                fontFamily: 'none',
                                            }}>{data.name}</li>
                                        }) : 'No data found' : 'No data found'
                                }
                            </div>
                        </ul>}
                    </label>
                </span>}

                {this.props.isCity && <span className="dropdown">
                    <button style={(this.state.selectedState === 'select a state' && this.props.isState) || !this.state.selectedCountry ? { padding: '6px 20px 6px 10px', opacity: '0.65' } : { padding: '6px 20px 6px 10px' }}>{this.state.selectedCity}</button>
                    <label>
                        <input type="checkbox" style={(this.state.selectedState === 'select a state' && this.props.isState) || !this.state.selectedCountry ? { cursor: 'not-allowed' } : {}} />
                        {((this.state.selectedState === 'select a state' && this.props.isState) || !this.state.selectedCountry) ? '' : <ul>
                            <li style={{ marginTop: '-5px' }}><input style={{ width: '-webkit-fill-available', borderRadius: 6, padding: 5 }} placeholder='Search...' type='text' onChange={(e) => { this.changeCityData(e) }} /></li>
                            <div style={{ maxHeight: '343px', overflowY: 'auto', minHeight: '41px', marginTop: '-4px', paddingTop: '15px', paddingLeft: '10px', textAlign: '-webkit-auto' }}>
                                {
                                    ((this.state.selectedState && this.state.selectedState !== 'select a state') || !this.props.isState) ?
                                        this.state.cityData.length ? this.state.cityData.map((data, idx) => {
                                            return <li key={idx} onClick={() => this.setCityData(data)} style={{
                                                cursor: 'pointer', textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                width: '90%',
                                                height: '1.6em',
                                                whiteSpace: 'nowrap',
                                                fontFamily: 'none',
                                            }}>{data.name}</li>
                                        }) : 'No data found' : 'No data found'
                                }
                            </div>
                        </ul>}
                    </label>
                </span>}
            </div>
        );
    }
}

export default MainSelect;
