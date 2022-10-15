import React, { Component } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { logoutUser } from './../store/redux/Actions/ActionCreators/AuthActions';
class HomeLayout extends Component {
    render() {
        return (
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                            </Typography> {
                                this.props.isAuthenticated ? <Button variant="contained" onClick={() => this.props.logoutUser()}>logout </Button>
                                    : (<> <Link
                                        to="/login"
                                        class="nav-item"
                                    >
                                        Login
                                    </Link>  <Link
                                        to="/register"
                                        class="nav-item"
                                    >
                                            Register
                                        </Link></>)}

                        </Toolbar>
                    </AppBar>
                </Box>
                {this.props.children}
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeLayout));
