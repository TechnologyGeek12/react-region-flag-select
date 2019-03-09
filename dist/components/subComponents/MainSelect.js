var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import * as cities from './data/cities.json';
import * as countries from './data/countries.json';
import * as states from './data/states.json';

var stateValue = [];
var citiesValue = [];
var handleChangeData = { countryData: {}, stateData: {}, cityData: {} };

var MainSelect = function (_Component) {
    _inherits(MainSelect, _Component);

    function MainSelect(props) {
        _classCallCheck(this, MainSelect);

        //for custom country only
        var _this = _possibleConstructorReturn(this, (MainSelect.__proto__ || Object.getPrototypeOf(MainSelect)).call(this, props));

        _this.setCountryData = function (data, flag) {
            var flagData = data.phoneCode != 44 && data.id !== 8 && data.phoneCode != 673 && (data.phoneCode != 0 || data.id == 29 || data.id == 78 || data.id == 174 || data.id == 203) && data.id != 232 ? flag : undefined;
            _this.setState({ dropData: { data: data.name, flag: flagData, phoneCode: data.phoneCode }, selectedCountry: data.id, selectedState: 'select a state', selectedCity: 'select a city' });
            var stateData = states.states.filter(function (statesData) {
                return parseInt(statesData.country_id) === data.id;
            });
            stateValue = stateData;
            _this.setState({ stateData: stateData, completeCountryCode: data });
            var newCityData = [];
            if (!_this.props.isState && _this.props.isCity) {
                cities.cities.filter(function (citiesData1) {
                    stateData.map(function (stateValues1) {
                        if (stateValues1.id === citiesData1.state_id) {
                            newCityData.push(citiesData1);
                        }
                    });
                });
                _this.setState({ cityData: newCityData });
                citiesValue = newCityData;
            } else citiesValue = [];

            handleChangeData.countryData = { data: data };
            handleChangeData.stateData = {};
            handleChangeData.cityData = {};
            _this.props.handleChange(handleChangeData);
        };

        _this.setStateData = function (data) {
            _this.setState({ selectedState: data.name });
            var cityData = cities.cities.filter(function (citiesData) {
                return citiesData.state_id === data.id;
            });
            citiesValue = cityData;
            _this.setState({ cityData: cityData, selectedCity: 'select a city', completeStateCode: data });
            handleChangeData.countryData = _this.state.completeCountryCode ? { 'data': _this.state.completeCountryCode } : { 'data': _this.state.countryCode && _this.state.countryCode[0] };
            handleChangeData.stateData = { data: data };
            handleChangeData.cityData = {};
            _this.props.handleChange(handleChangeData);
        };

        _this.setCityData = function (data) {
            _this.setState({ selectedCity: data.name });
            handleChangeData.countryData = _this.state.completeCountryCode ? { 'data': _this.state.completeCountryCode } : { 'data': _this.state.countryCode && _this.state.countryCode[0] };
            handleChangeData.stateData = { 'data': _this.state.completeStateCode };
            handleChangeData.cityData = { data: data };
            _this.props.handleChange(handleChangeData);
        };

        _this.changeData = function (e) {
            var newCountry = countries.countries.filter(function (data) {
                return data.name.toLowerCase().includes(e.target.value.toLowerCase()) || parseInt(data.phoneCode, 10) === parseInt(e.target.value, 10);
            });
            _this.setState({ countries: newCountry, selectedState: 'select a state' });
        };

        _this.changeStateData = function (e) {
            var stateData = stateValue.filter(function (data) {
                return data.name.toLowerCase().includes(e.target.value.toLowerCase());
            });
            _this.setState({ stateData: stateData });
        };

        _this.changeCityData = function (e) {
            var cityData = citiesValue.filter(function (data) {
                return data.name.toLowerCase().includes(e.target.value.toLowerCase());
            });
            _this.setState({ cityData: cityData });
        };

        var customCountries = [];
        countries.countries.filter(function (countriesData) {
            props.customCountryCode.map(function (customCountriesData) {
                if (countriesData.sortname === customCountriesData.toUpperCase()) customCountries.push(countriesData);
            });
        });
        //for state only
        var stateArray = [];
        var countryData = '';
        if (!props.isCountry) {
            if (props.countryCode) {
                countryData = countries.countries.filter(function (countriesData) {
                    return countriesData.sortname === props.countryCode;
                });
                stateArray = states.states.filter(function (statesData) {
                    return parseInt(statesData.country_id) === countryData[0].id;
                });
            } else {
                stateArray = states.states;
            }
        }

        _this.state = { completeCountryCode: null, completeStateCode: null, data: '', selectedCountry: '', selectedState: 'select a state', selectedCity: 'select a city', dropData: { data: 'select a country', flag: null, phoneCode: null }, countries: customCountries.length ? customCountries : countries.countries, stateData: stateArray.length ? stateArray : [], cityData: citiesValue, countryCode: countryData };

        return _this;
    }

    _createClass(MainSelect, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                null,
                this.props.isCountry && React.createElement(
                    'span',
                    { className: 'dropdown' },
                    React.createElement(
                        'button',
                        { style: !this.props.isFlag && !this.props.isPhoneCode || !this.state.dropData.flag || !this.state.dropData.phoneCode ? { padding: '6px 20px 6px 10px', minWidth: 200 } : { minWidth: 200 } },
                        this.props.isFlag ? this.state.dropData.flag ? React.createElement('img', { width: '30', height: '30', style: { padding: '3%' }, src: this.state.dropData.flag && require('./flags/' + this.state.dropData.flag.toLowerCase() + '.svg') ? require('./flags/' + this.state.dropData.flag.toLowerCase() + '.svg') : require('./flags/noFlag.svg'), alt: require('./flags/noFlag.svg') }) : '' : '',
                        this.state.dropData.data,
                        this.props.isPhoneCode ? this.state.dropData.phoneCode ? React.createElement(
                            'span',
                            null,
                            ' (+' + this.state.dropData.phoneCode + ')'
                        ) : '' : ''
                    ),
                    React.createElement(
                        'label',
                        null,
                        React.createElement('input', { type: 'checkbox' }),
                        React.createElement(
                            'ul',
                            null,
                            React.createElement(
                                'li',
                                { style: { marginTop: '-5px' } },
                                React.createElement('input', { style: { width: '-webkit-fill-available', borderRadius: 6, padding: 5 }, placeholder: 'Search...', type: 'text', onChange: function onChange(e) {
                                        _this2.changeData(e);
                                    } })
                            ),
                            React.createElement(
                                'div',
                                { style: { maxHeight: '343px', overflowY: 'auto', minHeight: '41px', marginTop: '-4px', paddingTop: '15px', paddingLeft: '10px', textAlign: '-webkit-auto' } },
                                this.state.countries.map(function (data, idx) {
                                    return React.createElement(
                                        'li',
                                        { key: idx, onClick: function onClick() {
                                                _this2.setCountryData(data, data.sortname);
                                            }, style: {
                                                cursor: 'pointer', textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                width: '90%',
                                                height: '1.6em',
                                                whiteSpace: 'nowrap',
                                                fontFamily: 'none'
                                            } },
                                        _this2.props.isFlag ? React.createElement('img', { width: '30', height: '30', style: { padding: '3%' }, src: data.phoneCode != 44 && data.id !== 8 && data.phoneCode != 673 && (data.phoneCode != 0 || data.id == 29 || data.id == 78 || data.id == 174 || data.id == 203) && data.id != 232 ? require('./flags/' + data.sortname.toLowerCase() + '.svg') : require('./flags/noFlag.svg'), alt: require('./flags/noFlag.svg') }) : '',
                                        data.name,
                                        _this2.props.isPhoneCode ? React.createElement(
                                            'span',
                                            null,
                                            ' (+' + data.phoneCode + ')'
                                        ) : ''
                                    );
                                })
                            )
                        )
                    )
                ),
                this.props.isState && React.createElement(
                    'span',
                    { className: 'dropdown' },
                    React.createElement(
                        'button',
                        { style: !this.state.selectedCountry ? { padding: '6px 20px 6px 10px', opacity: '0.65' } : { padding: '6px 20px 6px 10px' } },
                        this.state.selectedState
                    ),
                    React.createElement(
                        'label',
                        null,
                        React.createElement('input', { type: 'checkbox', style: !this.state.selectedCountry ? { cursor: 'not-allowed' } : {} }),
                        !this.state.selectedCountry ? '' : React.createElement(
                            'ul',
                            null,
                            React.createElement(
                                'li',
                                { style: { marginTop: '-5px' } },
                                React.createElement('input', { style: { width: '-webkit-fill-available', borderRadius: 6, padding: 5 }, placeholder: 'Search...', type: 'text', onChange: function onChange(e) {
                                        _this2.changeStateData(e);
                                    } })
                            ),
                            React.createElement(
                                'div',
                                { style: { maxHeight: '343px', overflowY: 'auto', minHeight: '41px', marginTop: '-4px', paddingTop: '15px', paddingLeft: '10px', textAlign: '-webkit-auto' } },
                                this.state.selectedCountry || !this.props.isCountry ? this.state.stateData.length ? this.state.stateData.map(function (data, idx) {
                                    return React.createElement(
                                        'li',
                                        { key: idx, onClick: function onClick() {
                                                return _this2.setStateData(data);
                                            }, style: {
                                                cursor: 'pointer', textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                width: '90%',
                                                height: '1.6em',
                                                whiteSpace: 'nowrap',
                                                fontFamily: 'none'
                                            } },
                                        data.name
                                    );
                                }) : 'No data found' : 'No data found'
                            )
                        )
                    )
                ),
                this.props.isCity && React.createElement(
                    'span',
                    { className: 'dropdown' },
                    React.createElement(
                        'button',
                        { style: this.state.selectedState === 'select a state' && this.props.isState || !this.state.selectedCountry ? { padding: '6px 20px 6px 10px', opacity: '0.65' } : { padding: '6px 20px 6px 10px' } },
                        this.state.selectedCity
                    ),
                    React.createElement(
                        'label',
                        null,
                        React.createElement('input', { type: 'checkbox', style: this.state.selectedState === 'select a state' && this.props.isState || !this.state.selectedCountry ? { cursor: 'not-allowed' } : {} }),
                        this.state.selectedState === 'select a state' && this.props.isState || !this.state.selectedCountry ? '' : React.createElement(
                            'ul',
                            null,
                            React.createElement(
                                'li',
                                { style: { marginTop: '-5px' } },
                                React.createElement('input', { style: { width: '-webkit-fill-available', borderRadius: 6, padding: 5 }, placeholder: 'Search...', type: 'text', onChange: function onChange(e) {
                                        _this2.changeCityData(e);
                                    } })
                            ),
                            React.createElement(
                                'div',
                                { style: { maxHeight: '343px', overflowY: 'auto', minHeight: '41px', marginTop: '-4px', paddingTop: '15px', paddingLeft: '10px', textAlign: '-webkit-auto' } },
                                this.state.selectedState && this.state.selectedState !== 'select a state' || !this.props.isState ? this.state.cityData.length ? this.state.cityData.map(function (data, idx) {
                                    return React.createElement(
                                        'li',
                                        { key: idx, onClick: function onClick() {
                                                return _this2.setCityData(data);
                                            }, style: {
                                                cursor: 'pointer', textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                width: '90%',
                                                height: '1.6em',
                                                whiteSpace: 'nowrap',
                                                fontFamily: 'none'
                                            } },
                                        data.name
                                    );
                                }) : 'No data found' : 'No data found'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return MainSelect;
}(Component);

export default MainSelect;