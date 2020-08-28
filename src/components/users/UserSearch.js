import React, { Component } from 'react'
import PropTypes from 'prop-types'


class UserSearch extends Component {

    state = {
        text: '',
        alert: false
    }
    
    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
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
            this.props.setAlert('Please enter something', 'light');
        }
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.onFormSubmit.bind(this)}>
                    <input type="text" name="text" id="" placeholder="Search Users..." value={this.state.text}  onChange={this.handleChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {this.props.showClear ? <button className="btn btn-light btn-block" onClick={this.props.clearUsers}>Clear</button> : ''}
                
            </div>
        )
    }
}

export default UserSearch
