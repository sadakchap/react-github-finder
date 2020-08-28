import React, { Component } from 'react'
import Alert from './Alert';
import PropTypes from 'prop-types'


class UserSearch extends Component {

    state = {
        text: '',
        alert: false
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onFormSubmit(e) {
        e.preventDefault();
        if(this.state.text){
            this.props.searchUsers(this.state.text);
            this.setState({
                text: '',
                alert: false
            });
        }else{
            // handle empty request
            this.setState({ alert: true })
        }
    }

    render() {
        return (
            <div>
                {this.state.alert ? <Alert /> : ''}
                <form className="form" onSubmit={this.onFormSubmit.bind(this)}>
                    <input type="text" name="text" id="" placeholder="Search Users..." value={this.state.text}  onChange={this.handleChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
            </div>
        )
    }
}

UserSearch.propTypes = {
    searchUsers: PropTypes.func.isRequired,
}

export default UserSearch
