import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';


const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends React.Component {
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
      <div className={classes.root}>
        <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
        <br />
        <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer} />
		<br />
		
		<Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
		  
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
