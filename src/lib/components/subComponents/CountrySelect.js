import React, { Component } from 'react';
import * as countries from './data/countries.json';

var handleChangeData = {countryData: {}};
class CountrySelect extends Component {
    constructor(props) {
        super(props);

        let selectedCountryCode = '';
        countries.countries.filter(countriesData => {
            if (props.selectedCountryCode && countriesData.sortname === props.selectedCountryCode)
                selectedCountryCode = countriesData;
        })
        let flagData = (selectedCountryCode.phoneCode != 44 && selectedCountryCode.id !== 8 && selectedCountryCode.phoneCode != 673 && (selectedCountryCode.phoneCode != 0 || (selectedCountryCode.id == 29 || selectedCountryCode.id == 78 || selectedCountryCode.id == 174 || selectedCountryCode.id == 203)) && selectedCountryCode.id != 232) ? selectedCountryCode.sortname : undefined;
        this.state = { selectedCountry: selectedCountryCode?selectedCountryCode.id:'', dropData: { data: selectedCountryCode?selectedCountryCode.name:'select a country', flag: flagData?flagData:null, phoneCode: selectedCountryCode?selectedCountryCode.phoneCode:null }, countries: countries.countries }

    }
    setCountryData = (data, flag) => {
        let flagData = (data.phoneCode != 44 && data.id !== 8 && data.phoneCode != 673 && (data.phoneCode != 0 || (data.id == 29 || data.id == 78 || data.id == 174 || data.id == 203)) && data.id != 232) ? flag : undefined;
        this.setState({ dropData: { data: data.name, flag: flagData, phoneCode: data.phoneCode }, selectedCountry: data.id, selectedState: 'select a state', selectedCity: 'select a city' });
        handleChangeData.countryData = { data };
        this.props.handleChange(handleChangeData);
    }

    changeData = (e) => {
        let newCountry = countries.countries.filter(data => data.name.toLowerCase().includes(e.target.value.toLowerCase()) || parseInt(data.phoneCode, 10) === parseInt(e.target.value, 10));
        this.setState({ countries: newCountry });
    }

    render() {
        return (
            <div>
                <span className="dropdown">
                    <button style={((!this.props.isFlag && !this.props.isPhoneCode) || (!this.state.dropData.flag || !this.state.dropData.phoneCode)) ? { padding: '6px 20px 6px 10px', minWidth: 200 } : { minWidth: 200 }}>{this.props.isFlag ? (this.state.dropData.flag ? <img width='30' height='30' style={{ padding: '3%' }} src={this.state.dropData.flag && require(`./flags/${this.state.dropData.flag.toLowerCase()}.svg`) ? require(`./flags/${this.state.dropData.flag.toLowerCase()}.svg`) : require(`./flags/noFlag.svg`)} alt={require(`./flags/noFlag.svg`)} /> : '') : ''}{this.state.dropData.data}{this.props.isPhoneCode ? (this.state.dropData.phoneCode ? <span>{` (+${this.state.dropData.phoneCode})`}</span> : '') : ''}</button>
                    <label>
                        <input type="checkbox" />
                        <ul>
                            <li style={{ marginTop: '-5px' }}><input style={{ width: '-webkit-fill-available', borderRadius: 6, padding: 5 }} placeholder='Search...' type='text' onChange={(e) => { this.changeData(e) }} /></li>
                            <div style={{ maxHeight: '343px', overflowY: 'auto', minHeight: '41px', marginTop: '-4px', paddingTop: '15px', paddingLeft: '10px', textAlign: '-webkit-auto' }}>
                                {
                                    this.state.countries.length ? this.state.countries.map((data, idx) => {
                                        return <li key={idx} onClick={() => { this.setCountryData(data, data.sortname) }} style={{
                                            cursor: 'pointer', textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            width: '90%',
                                            height: '1.6em',
                                            whiteSpace: 'nowrap',
                                            fontFamily: 'none',
                                        }}>{this.props.isFlag ? <img width='30' height='30' style={{ padding: '3%' }} src={(data.phoneCode != 44 && data.id !== 8 && data.phoneCode != 673 && (data.phoneCode != 0 || (data.id == 29 || data.id == 78 || data.id == 174 || data.id == 203)) && data.id != 232) ? require(`./flags/${data.sortname.toLowerCase()}.svg`) : require(`./flags/noFlag.svg`)} alt={require(`./flags/noFlag.svg`)} /> : ''}{data.name}{this.props.isPhoneCode ? <span>{` (+${data.phoneCode})`}</span> : ''}</li>
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

export default CountrySelect;
