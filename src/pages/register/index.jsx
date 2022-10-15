import React, { Component } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux'
import { withRouter, Redirect } from "react-router-dom";
import { registerUser } from '../../store/redux/Actions/ActionCreators/AuthActions';
import { clearError } from './../../store/redux/Actions/ActionCreators/AuthActions';
class Index extends Component {
    state = {
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    };
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
        this.props.clearError();
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.registerUser(
            {
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.first_name,
                last_name: this.state.last_name
            }
        ).then(res => {
            if (res.status === 200)
                this.props.history.push("/login")
        })
    }
    render() {
        const { email, password, first_name, last_name } = this.state;
        if (this.props.isAuthenticated) {
            return <Redirect to="/home" />
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <h5 style={{ color: 'red' }}>{this.props.errMess?.email?.message}</h5>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                    >
                        <TextValidator
                            label="First Name"
                            onChange={this.handleChange}
                            name="first_name"
                            value={first_name}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            style={{ marginBottom: '10px' }}
                        />
                        <TextValidator
                            label="Last Name"
                            onChange={this.handleChange}
                            name="last_name"
                            value={last_name}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            style={{ marginBottom: '10px' }}
                        />
                        <TextValidator
                            label="Email"
                            onChange={this.handleChange}
                            name="email"
                            value={email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                            style={{ marginBottom: '10px' }}
                        />
                        <TextValidator
                            label="Password"
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            value={password}
                        />
                        <Button type="submit">Submit</Button>
                    </ValidatorForm>
                </Box>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        errMess: state.Auth.errMess,
    }
}

const mapDispatchToProps = (dispatch) => ({
    registerUser: (data) => dispatch(registerUser(data)),
    clearError: () => dispatch(clearError())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
