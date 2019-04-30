var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import MainSelect from './subComponents/MainSelect';
import StateSelect from './subComponents/StateSelect';
import CountrySelect from './subComponents/CountrySelect';
import CustomCountrySelect from './subComponents/CustomCountrySelect';
import CitySelect from './subComponents/CitySelect';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';

var RegionSelect = function (_Component) {
    _inherits(RegionSelect, _Component);

    function RegionSelect(props) {
        _classCallCheck(this, RegionSelect);

        var _this = _possibleConstructorReturn(this, (RegionSelect.__proto__ || Object.getPrototypeOf(RegionSelect)).call(this, props));

        _this.handleChange = function (data) {
            _this.props.handleChange && _this.props.handleChange(data);
        };

        return _this;
    }

    _createClass(RegionSelect, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                !this.props.stateOnly && !this.props.countryOnly && !this.props.cityOnly && !this.props.customCountryOnly && React.createElement(
                    'div',
                    null,
                    React.createElement(MainSelect, {
                        isFlag: this.props.isFlag,
                        isPhoneCode: this.props.isPhoneCode,
                        customCountryCode: this.props.customCountryCode,
                        isCity: this.props.isCity,
                        isState: this.props.isState,
                        isCountry: this.props.isCountry,
                        countryCode: this.props.countryCode,
                        handleChange: this.handleChange
                    })
                ),
                this.props.stateOnly && !this.props.countryOnly && !this.props.cityOnly && !this.props.customCountryOnly && React.createElement(
                    'div',
                    null,
                    React.createElement(StateSelect, {
                        countryCode: this.props.countryCode,
                        handleChange: this.handleChange
                    })
                ),
                !this.props.stateOnly && this.props.countryOnly && !this.props.cityOnly && !this.props.customCountryOnly && React.createElement(
                    'div',
                    null,
                    React.createElement(CountrySelect, {
                        isFlag: this.props.isFlag,
                        isPhoneCode: this.props.isPhoneCode,
                        selectedCountryCode: this.props.selectedCountryCode,
                        handleChange: this.handleChange })
                ),
                !this.props.stateOnly && !this.props.countryOnly && this.props.cityOnly && !this.props.customCountryOnly && React.createElement(CitySelect, {
                    countryCode: this.props.countryCode,
                    handleChange: this.handleChange
                }),
                !this.props.stateOnly && !this.props.countryOnly && !this.props.cityOnly && this.props.customCountryOnly && React.createElement(
                    'div',
                    null,
                    React.createElement(CustomCountrySelect, {
                        isFlag: this.props.isFlag,
                        isPhoneCode: this.props.isPhoneCode,
                        customCountryCode: this.props.customCountryCode,
                        selectedCountryCode: this.props.selectedCountryCode,
                        handleChange: this.handleChange })
                )
            );
        }
    }]);

    return RegionSelect;
}(Component);

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