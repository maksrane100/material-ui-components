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


/*
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
*/


class TabContainer extends Component {
	
	render() {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {this.props.children}
    </Typography>
  );
	}
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    maxWidth: 400,
  },
  cardHeader: {
	   background: theme.palette.common.red,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  paperClass: {
    flexGrow: 1,
	color: "#E74C3C",
    backgroundColor: "#FEF9E7",
	padding: 20,
	margin: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
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

	  handleChange = (event, value) => {
		this.setState({ value });
	  };
	   
	    handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  
  

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };
	
	componentWillMount(){		
		this.setState({ loading: true});			
		//this.getCities();
		this.getRestaurants();
		this.setState({ loading: false});	
	}
	
	
	handleInputChange(e) {

		var newState = {};
		newState =this.state;
		newState[e.target.name] = e.target.value;
		this.setState(newState);
		this.setState({ loading: true});
		this.getRestaurants();
		this.setState({ loading: false});	
	}
	
	showDetails(restaurant, e) {

		this.setState({ selectedRestaurant: restaurant, modalIsOpen: true});	
	}
	
	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};
	
	handleClickOpen = (restaurant, e) => {
		
    this.setState({
      selectedRestaurant: restaurant, openDialog: true,
    });
  };

  handleClickClose = value => {
    this.setState({ selectedRestaurant: value, openDialog: false });
  };
	  
	getCities() {
	
		var url ='http://localhost:4200/restaurants/cities';
	
		axios.get(url)
		.then(response => {

			this.setState({ cities: response.data, totalcities:  response.data.length});			
			let cities = this.state.cities;
			let optionItems = cities.map((city) =>
				<option key={city} value={city}>{city}</option>
			);
			console.log('optionItems:'+optionItems);
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
		const { value } = this.state;
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);
		
		
		return (
		
		
		
		<div className={classes.root}>
        
		<AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" href="#basic-tabs" />
			<Tab label="Item Four" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        
		{value === 0 && <TabContainer>Item One</TabContainer>}
        
		{value === 1 && 
		
			<TabContainer>
				<Badge color="primary" badgeContent={this.state.restaurants.length} className={classes.margin}>
					<Typography className={classes.padding}>Total Restaurants</Typography>
				</Badge>
				  
				{ this.state.restaurants.map(restaurant => (

				<div className={classes.root}>
					<ExpansionPanel>
				
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>{restaurant.title}</Typography>
						</ExpansionPanelSummary>
				
						<ExpansionPanelDetails>
							
							<Typography component="p">
								{restaurant.title}
							</Typography>
							
							<Typography component="p">
								{restaurant.highlight}
							</Typography>
							<Divider />
							   
							<Typography component="p">
								<div className="row">
									<div className="fieldTitleExtra">Stars: {restaurant.star} </div>
									</div>
								<div className="row">
									<div className="fieldTitleExtra">Hours:
									{restaurant.openathour}:{restaurant.openatminute} AM - 
									{restaurant.closeathour}:{restaurant.closeatminute} PM
									</div>
								</div>
							</Typography>
							  
							<Typography paragraph>
								<div className="row">
									<div className="fieldTitle">Location</div>
									<div className="fieldValue">
									{restaurant.address.address1} {restaurant.address.address2} {restaurant.address.city}
									{restaurant.address.state} {restaurant.address.zip} {restaurant.address.country}
									</div>
								</div>	
							</Typography>
						</ExpansionPanelDetails>
					</ExpansionPanel>
			  

				</div>
						
				))}
			</TabContainer>
		
		
		}
        
		
		
		{value === 2 && 
		

					<TabContainer>
				<Badge color="primary" badgeContent={this.state.restaurants.length} className={classes.margin}>
					<Typography className={classes.padding}>Total Restaurants</Typography>
				</Badge>
				  
				{ this.state.restaurants.map(restaurant => (

				<div className={classes.root}>

					<Paper className={classes.paperClass}>		
						<Typography
						  aria-owns={open ? 'mouse-over-popover' : null}
						  aria-haspopup="true"
						  onMouseEnter={this.handlePopoverOpen}
						  onMouseLeave={this.handlePopoverClose}
						>
						
						{restaurant.name}
						</Typography>
					</Paper>
					
					
					<Popover
						id="mouse-over-popover"
						className={classes.popover}
						classes={{
						paper: classes.paper,
						}}
						open={open}
						anchorEl={anchorEl}
						anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
						}}
						transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
						}}
						onClose={this.handlePopoverClose}
						disableRestoreFocus
						>
							<Typography component="p">
								{restaurant.title}
							</Typography>
							
							<Typography component="p">
								{restaurant.highlight}
							</Typography>
							<Divider />
							   
							<Typography component="p">
								<div className="row">
									<div className="fieldTitleExtra">Stars: {restaurant.star} </div>
									</div>
								<div className="row">
									<div className="fieldTitleExtra">Hours:
									{restaurant.openathour}:{restaurant.openatminute} AM - 
									{restaurant.closeathour}:{restaurant.closeatminute} PM
									</div>
								</div>
							</Typography>
							  
							<Typography paragraph>
								<div className="row">
									<div className="fieldTitle">Location</div>
									<div className="fieldValue">
									{restaurant.address.address1} {restaurant.address.address2} {restaurant.address.city}
									{restaurant.address.state} {restaurant.address.zip} {restaurant.address.country}
									</div>
								</div>	
							</Typography>
					</Popover>
			  

				</div>
						
				))}
			</TabContainer>
			
			
		}
		
		 {value === 3 && 
			<div>
				SimpleSnackbar
			</div>}
		
		
      </div>

	   );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);	