var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import * as countries from './data/countries.json';
import * as states from './data/states.json';

var stateValue = [];
var handleChangeData = { stateData: {}, countryData: {} };

var StateSelect = function (_Component) {
    _inherits(StateSelect, _Component);

    function StateSelect(props) {
        _classCallCheck(this, StateSelect);

        var _this = _possibleConstructorReturn(this, (StateSelect.__proto__ || Object.getPrototypeOf(StateSelect)).call(this, props));

        _initialiseProps.call(_this);

        var countryId = countries.countries.filter(function (countriesData) {
            return countriesData.sortname.toLowerCase() === props.countryCode.toLowerCase();
        });
        var stateData = countryId.length ? states.states.filter(function (statesData) {
            return parseInt(statesData.country_id) === countryId[0].id;
        }) : [];
        stateValue = stateData;
        _this.state = { selectedState: 'select a state', stateData: stateData.length ? stateData : states.states, countryCode: countryId };
        return _this;
    }

    _createClass(StateSelect, [{
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
                        this.state.selectedState
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
                                        _this2.changeStateData(e);
                                    } })
                            ),
                            React.createElement(
                                'div',
                                { style: { maxHeight: '343px', overflowY: 'auto', minHeight: '41px', marginTop: '-4px', paddingTop: '15px', paddingLeft: '10px', textAlign: '-webkit-auto' } },
                                this.state.stateData.length ? this.state.stateData.map(function (data, idx) {
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
                                }) : 'No data found'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return StateSelect;
}(Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.setStateData = function (data) {
        _this3.setState({ selectedState: data.name });
        handleChangeData.countryData = _this3.props.countryCode ? { 'data': _this3.state.countryCode && _this3.state.countryCode[0] } : '';
        handleChangeData.stateData = { data: data };
        _this3.props.handleChange(handleChangeData);
    };

    this.changeStateData = function (e) {
        var stateData = stateValue.filter(function (data) {
            return data.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        _this3.setState({ stateData: stateData });
    };
};

export default StateSelect;