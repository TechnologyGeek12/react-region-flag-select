var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import * as countries from './data/countries.json';

var handleChangeData = { countryData: {} };

var CountrySelect = function (_Component) {
    _inherits(CountrySelect, _Component);

    function CountrySelect(props) {
        _classCallCheck(this, CountrySelect);

        var _this = _possibleConstructorReturn(this, (CountrySelect.__proto__ || Object.getPrototypeOf(CountrySelect)).call(this, props));

        _initialiseProps.call(_this);

        var selectedCountryCode = '';
        countries.countries.filter(function (countriesData) {
            if (props.selectedCountryCode && countriesData.sortname === props.selectedCountryCode) selectedCountryCode = countriesData;
        });
        var flagData = selectedCountryCode.phoneCode != 44 && selectedCountryCode.id !== 8 && selectedCountryCode.phoneCode != 673 && (selectedCountryCode.phoneCode != 0 || selectedCountryCode.id == 29 || selectedCountryCode.id == 78 || selectedCountryCode.id == 174 || selectedCountryCode.id == 203) && selectedCountryCode.id != 232 ? selectedCountryCode.sortname : undefined;
        _this.state = { selectedCountry: selectedCountryCode ? selectedCountryCode.id : '', dropData: { data: selectedCountryCode ? selectedCountryCode.name : 'select a country', flag: flagData ? flagData : null, phoneCode: selectedCountryCode ? selectedCountryCode.phoneCode : null }, countries: countries.countries };

        return _this;
    }

    _createClass(CountrySelect, [{
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
                                this.state.countries.length ? this.state.countries.map(function (data, idx) {
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
                                }) : 'No data found'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CountrySelect;
}(Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.setCountryData = function (data, flag) {
        var flagData = data.phoneCode != 44 && data.id !== 8 && data.phoneCode != 673 && (data.phoneCode != 0 || data.id == 29 || data.id == 78 || data.id == 174 || data.id == 203) && data.id != 232 ? flag : undefined;
        _this3.setState({ dropData: { data: data.name, flag: flagData, phoneCode: data.phoneCode }, selectedCountry: data.id, selectedState: 'select a state', selectedCity: 'select a city' });
        handleChangeData.countryData = { data: data };
        _this3.props.handleChange(handleChangeData);
    };

    this.changeData = function (e) {
        var newCountry = countries.countries.filter(function (data) {
            return data.name.toLowerCase().includes(e.target.value.toLowerCase()) || parseInt(data.phoneCode, 10) === parseInt(e.target.value, 10);
        });
        _this3.setState({ countries: newCountry });
    };
};

export default CountrySelect;