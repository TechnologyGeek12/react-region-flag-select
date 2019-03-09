import React, { Component } from 'react';
import MainSelect from './subComponents/MainSelect';
import StateSelect from './subComponents/StateSelect';
import CountrySelect from './subComponents/CountrySelect';
import CustomCountrySelect from './subComponents/CustomCountrySelect';
import CitySelect from './subComponents/CitySelect';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';


class RegionSelect extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (data) => {
        this.props.handleChange && this.props.handleChange(data);
    }
    render() {
        return (
            <div>
                {!this.props.stateOnly && !this.props.countryOnly && !this.props.cityOnly && !this.props.customCountryOnly && <div>
                    <MainSelect
                        isFlag={this.props.isFlag}
                        isPhoneCode={this.props.isPhoneCode}
                        customCountryCode={this.props.customCountryCode}
                        isCity={this.props.isCity}
                        isState={this.props.isState}
                        isCountry={this.props.isCountry}
                        countryCode={this.props.countryCode}
                        handleChange={this.handleChange}
                    />
                </div>}
                {this.props.stateOnly && !this.props.countryOnly && !this.props.cityOnly && !this.props.customCountryOnly && <div>
                    <StateSelect
                        countryCode={this.props.countryCode}
                        handleChange={this.handleChange}
                    />
                </div>}
                {!this.props.stateOnly && this.props.countryOnly && !this.props.cityOnly && !this.props.customCountryOnly && <div>
                    <CountrySelect
                        isFlag={this.props.isFlag}
                        isPhoneCode={this.props.isPhoneCode}
                        selectedCountryCode={this.props.selectedCountryCode}
                        handleChange={this.handleChange} />
                </div >}
                {!this.props.stateOnly && !this.props.countryOnly && this.props.cityOnly && !this.props.customCountryOnly &&
                    <CitySelect
                        countryCode={this.props.countryCode}
                        handleChange={this.handleChange}
                    />
                }
                {!this.props.stateOnly && !this.props.countryOnly && !this.props.cityOnly && this.props.customCountryOnly && <div>
                    <CustomCountrySelect
                        isFlag={this.props.isFlag}
                        isPhoneCode={this.props.isPhoneCode}
                        customCountryCode={this.props.customCountryCode}
                        selectedCountryCode={this.props.selectedCountryCode}
                        handleChange={this.handleChange} />
                </div>}
            </div >
        );
    }
}

RegionSelect.defaultProps = {
    isFlag: true,
    isPhoneCode: true,
    customCountryCode: [],
    countryCode: 'IN',
    stateOnly: false,
    countryOnly: false,
    cityOnly: false,
    customCountryOnly: false,
    isCity: true,
    isState: true,
    isCountry: true,
    selectedCountryCode: 'IN'
};

export default RegionSelect;
