import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';

import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';






function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  console.log('inputValue:'+inputValue);
  console.log('inputLength:'+inputLength);
  
  let count = 0;

  /*return inputLength === 0
    ? []
    : this.state.suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
	*/
	//alert('here');
	//alert(this.state.suggestions);
	
	return 
	suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });

}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});




/**********************************************************************************************************************************************/
/****************************** Demonstration of ExpansionPanel of Material UI **************************************************/
/*** In the first tab, we will use Material UI's Paper component. Paper can be used to build surface or other elements for your application. **/
/*** In the second tab, we will display restaurants using REST API using Material UI's Card component. ****************************************/
/*** In the third tab, we will display restaurants using REST API using Material UI's Card component (same as second tab), ********************/
/*** but additionally when user hover on a restaurant Card, it will display Material UI's tooltip. ********************************************/
/*** In the fourth tab, we will demonstrate usage of Material UI's Dialog component. **********************************************************/
/**********************************************************************************************************************************************/


class App extends Component {
	
	
	  constructor(props) {
      
		super(props);

		this.state = {
			restaurants:[], 
			selectedRestaurant: {},
			single: '',
			popper: '',
			suggestions: [],
			indents: [],
			cities: [],
			totalcities: 0,
			city:'',
			modalIsOpen: false,
			openDialog: false,
			loading: true,
			
		value: 0,
		expanded: false,
		   anchorEl: null
	  }
	  };

	  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };
	
	componentWillMount(){		
		this.setState({ loading: true});			
		this.getCities();
		this.getRestaurants();
		this.setState({ loading: false});	
	}
	
	
	  
	getCities() {
	
		var url ='http://localhost:4200/restaurants/cities';
	
		axios.get(url)
		.then(response => {

			this.setState({ cities: response.data, totalcities:  response.data.length});			
			let cities = this.state.cities;
			var arr=[];
			var str='';
			let optionItems = cities.map((city) =>
				 //str=str+ '{ label: "'+city+'" }';
				 //arr.push(str);
				 arr.push('{ label: "'+city+'" }')
			);
			str = str.substring(0, str.length - 1);
			this.setState({ suggestions: arr});
			console.log('str:'+str);
			this.setState({ optionItems: optionItems});
		})
		.catch(function (error) {
			console.log(error);
		});	  
	}	
	
	getRestaurants() {
		
		axios.post('http://localhost:4200/restaurants/search', {
		 "city": "South Rowenaland"
		})
		.then(response => {
			console.log('response.data.length:'+response.data.length);
			this.setState({ restaurants: response.data, totalrestaurants:  response.data.length});						
		})
		.catch(function (error) {
			console.log(error);
		});
	  
		console.log('restaurants length:'+this.state.restaurants.length);	  
	}
	
	render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div className={classes.root}>
	  
	   <div>{this.state.suggestions}</div>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Search a country (start with a)',
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
        
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);	