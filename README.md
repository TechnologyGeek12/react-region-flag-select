# react-region-flag-select
Dynamic and custom react country, state, city select drop-down with flag and phone code options 


<img src="https://img.shields.io/badge/Licence-MIT-blue.svg" alt="Licence" data-canonical-src="https://img.shields.io/badge/Licence-MIT-blue.svg" style="max-width:100%;"/>
<img src="https://img.shields.io/badge/Version-0.1.1-brightgreen.svg" alt="npm Version" data-canonical-src="https://img.shields.io/badge/Version-0.1.1-brightgreen.svg" style="max-width:100%;"/>

A Node.js React package that gives dynamic and custom country, state, city select drop down with flag and phone code option.
RegionSelect gives the max possible options to use country, state, city select dropdown with diffrent possible combinations of all with optional country flag and phone code options.
RegionSelect can be used to show all country name list dropdown and also custom options of country name using its country code like 'IN' for india, 'AS' for American Samoa, 'AU' for australia etc.



## Installation
The package can be installed via NPM:
```
npm install react-region-flag-select --save
```
react-region-flag-select can be imported as follows

```javascript
var RegionSelect = require('react-region-flag-select');

OR

import RegionSelect from 'react-region-flag-select';

```


## Usage

All country Codes Can Be Check Here: [Country Codes](https://github.com/TechnologyGeek12/react-region-flag-select/blob/master/src/lib/components/subComponents/data/countryCodes.txt)


# Default country, state, city select with flag and phone code
```javascript
    <RegionSelect />
```

# Default props with handleChange method
```javascript

    handleChangeMethod=(data)=>{
        console.log('Result',data);
    }


    <RegionSelect 
     handleChange={this.handleChangeMethod}
    />
```

# Default props with handleChange method in React
```javascript
import React, {Component} from 'react';
import RegionSelect from 'react-region-flag-select';
 
class App extends Component {
 

     handleChangeMethod=(data)=>{
        console.log('Result',data);
    }
    render() {
        return (
              <RegionSelect 
                handleChange={this.handleChangeMethod}
             />  
        );
    }
}
 
export default App;
```

# For country, state, city select without flag
```javascript
    <RegionSelect 
    isFlag={false} />
```

# For country, state, city select without phone code
```javascript
    <RegionSelect 
    isPhoneCode={false} />
```

# For only country and state select 
```javascript
    <RegionSelect 
    isCity={false}/>
```

# For only country and city select 
```javascript
    <RegionSelect 
    isState={false} />
```

# For custom country and city select 
```javascript
    <RegionSelect 
    isState={false} 
    countryCode={'IN'}/>
```

# For only state(all states in world) and city select 
```javascript
    <RegionSelect 
    isCountry={false} />
```

# For only state(Given country code states only) and city select 
```javascript
    <RegionSelect 
    isCountry={false} 
    countryCode={'IN'}/>
```

# For only country select 
```javascript
    <RegionSelect 
    countryOnly={true} />
```

# For pre-selected only country select 
```javascript
    <RegionSelect 
    countryOnly={true}
    selectedCountryCode={'IN'} />
```

# For only state select 
```javascript
    <RegionSelect 
    stateOnly={true} />
```

# For only custom country state(Given country code states only) select 
```javascript
    <RegionSelect 
    stateOnly={true}
    countryCode={'IN'} />
```

# For only city select 
```javascript
    <RegionSelect 
    cityOnly={true} />
```

# For only custom country city(Given country code city only) select 
```javascript
    <RegionSelect 
    cityOnly={true}
    countryCode={'IN'} />
```

# For only custom country select 
```javascript
    <RegionSelect 
    customCountryOnly={true}
    customCountryCode={['IN','AS','AU']}/>
```

# For pre-selected only custom country select 
```javascript
    <RegionSelect 
    customCountryOnly={true}
    customCountryCode={['IN','AS','AU']}
    selectedCountryCode={'IN'} />
```

## User will get these Output/data in handleChange method

```javascript
        {"countryData":
                {
                    "data": {
                    "id": 101,"sortname":"IN","name":"India","phoneCode":91
                }
                },
        "stateData":{
                    "data": {
                    "id": "10","name":"Delhi","country_id":"101"
                }
                },
        "cityData":{
                    "data": {
                    "id": "707","name":"New Delhi","state_id":"10"
                }
                }
                }
```

# Default parameter options value
```javascript
    isFlag: true,
    isPhoneCode: true,
    customCountryCode: [],
    countryCode: '',
    stateOnly: false,
    countryOnly: false,
    cityOnly: false,
    customCountryOnly: false,
    isCity: true,
    isState: true,
    isCountry: true,
    selectedCountryCode: ''
```

# Available options list
```javascript
    isFlag: Boolean,
    isPhoneCode: Boolean,
    customCountryCode: [],
    countryCode: String,
    stateOnly: Boolean,
    countryOnly: Boolean,
    cityOnly: Boolean,
    customCountryOnly: Boolean,
    isCity: Boolean,
    isState: Boolean,
    isCountry: Boolean,
    selectedCountryCode: String,
    handleChange: Function
```





## License
MIT Licensed. Copyright (c) Gaurav Tanwar 2019.