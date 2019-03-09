var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import * as cities from './data/cities.json';
import * as countries from './data/countries.json';
import * as states from './data/states.json';

var citiesValue = [];
var handleChangeData = { cityData: {}, countryData: {} };

var CitySelect = function (_Component) {
    _inherits(CitySelect, _Component);

    function CitySelect(props) {
        _classCallCheck(this, CitySelect);

        //for city only
        var _this = _possibleConstructorReturn(this, (CitySelect.__proto__ || Object.getPrototypeOf(CitySelect)).call(this, props));

        _initialiseProps.call(_this);

        var citiesValue = [];
        var stateArray = [];
        var countryData = '';
        if (props.countryCode) {
            var newCityData = [];
            countryData = countries.countries.filter(function (countriesData) {
                return countriesData.sortname === props.countryCode;
            });
            stateArray = states.states.filter(function (statesData) {
                return parseInt(statesData.country_id) === countryData[0].id;
            });
            cities.cities.filter(function (citiesData1) {
                stateArray.map(function (stateValues1) {
                    if (stateValues1.id === citiesData1.state_id) {
                        newCityData.push(citiesData1);
                    }
                });
            });
            citiesValue = newCityData;
        } else {
            citiesValue = cities.cities;
        }
        _this.state = { selectedCity: 'select a city', cityData: citiesValue, countryCode: countryData };

        return _this;
    }

    _createClass(CitySelect, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'span',
                    { className: 'dropdown' },
                    React.createElement(
                        'button',
                        { style: { padding: '6px 20px 6px 10px' } },
                        this.state.selectedCity
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
                                        _this2.changeCityData(e);
                                    } })
                            ),
                            React.createElement(
                                'div',
                                { style: { maxHeight: '343px', overflowY: 'auto', minHeight: '41px', marginTop: '-4px', paddingTop: '15px', paddingLeft: '10px', textAlign: '-webkit-auto' } },
                                this.state.cityData.length ? this.state.cityData.map(function (data, idx) {
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
                                }) : 'No data found'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CitySelect;
}(Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.setCityData = function (data) {
        _this3.setState({ selectedCity: data.name });
        handleChangeData.countryData = _this3.props.countryCode ? { 'data': _this3.state.countryCode && _this3.state.countryCode[0] } : '';
        handleChangeData.cityData = { data: data };
        _this3.props.handleChange(handleChangeData);
    };

    this.changeCityData = function (e) {
        var cityData = citiesValue.filter(function (data) {
            return data.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        _this3.setState({ cityData: cityData });
    };
};

export default CitySelect;