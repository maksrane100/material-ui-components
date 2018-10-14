import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import './App.css';


const styles = {
  root: {
    flexGrow: 1,
  },
};

class App_Card extends React.Component {
  state = {
    completed: 0,
    buffer: 10,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed > 100) {
      this.setState({ completed: 0, buffer: 10 });
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
    }
  };

  render() {
    const { classes } = this.props;
    const { completed, buffer } = this.state;
    return (
	
	<div>
        <Card className="card">
		  <CardActionArea>
			<CardMedia
			  className={classes.media}
			  image="/static/images/cards/contemplative-reptile.jpg"
			  title="Contemplative Reptile"
			/>
			<CardContent>
			  <Typography gutterBottom variant="h5" component="h2">
				Employee
			  </Typography>
			  <Typography component="p">
				<Typography gutterBottom className="fieldTitle">
				 Name:
				</Typography>
				<Typography gutterBottom className="fieldValue">
				 Nitin Patil
				</Typography>
				
				<Typography gutterBottom className="fieldTitle">
				 Profession:
				</Typography>
				<Typography gutterBottom className="fieldValue">
				 Software Engineer
				</Typography>
				
				
			  </Typography>
			</CardContent>
		  </CardActionArea>
		  <CardActions>
			
			<Button size="small" color="primary">
			  Details
			</Button>
		  </CardActions>
		</Card>
	
		<Card className="card">
		  <CardActionArea>
			<CardMedia
			  className={classes.media}
			  image="/static/images/cards/contemplative-reptile.jpg"
			  title="Contemplative Reptile"
			/>
			<CardContent>
			  <Typography gutterBottom variant="h5" component="h2">
				Employee
			  </Typography>
			  <Typography component="p">
				<Typography gutterBottom className="fieldTitle">
				 Name:
				</Typography>
				<Typography gutterBottom className="fieldValue">
				 Sameer Patil
				</Typography>
				
				<Typography gutterBottom className="fieldTitle">
				 Profession:
				</Typography>
				<Typography gutterBottom className="fieldValue">
				 Manager
				</Typography>
				
				
			  </Typography>
			</CardContent>
		  </CardActionArea>
		  <CardActions>
			
			<Button size="small" color="primary">
			  Details
			</Button>
		  </CardActions>
		</Card>
	
	
		        <Card className="card">
		  <CardActionArea>
			<CardMedia
			  className={classes.media}
			  image="/static/images/cards/contemplative-reptile.jpg"
			  title="Contemplative Reptile"
			/>
			<CardContent>
			  <Typography gutterBottom variant="h5" component="h2">
				Employee
			  </Typography>
			  <Typography component="p">
				<Typography gutterBottom className="fieldTitle">
				 Name:
				</Typography>
				<Typography gutterBottom className="fieldValue">
				 Ganesh Patil
				</Typography>
				
				<Typography gutterBottom className="fieldTitle">
				 Profession:
				</Typography>
				<Typography gutterBottom className="fieldValue">
				 Software Engineer
				</Typography>
				
				
			  </Typography>
			</CardContent>
		  </CardActionArea>
		  <CardActions>
			
			<Button size="small" color="primary">
			  Details
			</Button>
		  </CardActions>
		</Card>
	
		<Card className="card">
		  <CardActionArea>
			<CardMedia
			  className={classes.media}
			  image="/static/images/cards/contemplative-reptile.jpg"
			  title="Contemplative Reptile"
			/>
			<CardContent>
			  <Typography gutterBottom variant="h5" component="h2">
				Employee
			  </Typography>
			  <Typography component="p">
				<Typography gutterBottom className="fieldTitle">
				 Name:
				</Typography>
				<Typography gutterBottom className="fieldValue">
				 Sunil Patil
				</Typography>
				
				<Typography gutterBottom className="fieldTitle">
				 Profession:
				</Typography>
				<Typography gutterBottom className="fieldValue">
				 Programmer
				</Typography>
				
				
			  </Typography>
			</CardContent>
		  </CardActionArea>
		  <CardActions>
			
			<Button size="small" color="primary">
			  Details
			</Button>
		  </CardActions>
		</Card>
		
	</div>
    );
  }
}

App_Card.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App_Card);
