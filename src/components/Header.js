import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles';
import '../App.css';

const styles = {
    appbar: {
      alignItems: 'center',
    }
  };

function Header (props) {
    const { classes } = props;
    return(
        <div id="header">
        <AppBar 
        className={classes.appbar} 
        position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit">
                Insights.gg Technical Assignment 
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default withStyles(styles)(Header);