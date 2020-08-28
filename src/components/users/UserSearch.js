import React, { Component } from 'react'

class UserSearch extends Component {

    state = {
        text: ''
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onFormSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.onFormSubmit}>
                    <input type="text" name="text" id="" placeholder="Search Users..." value={this.state.text}  onChange={this.handleChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
            </div>
        )
    }
}

export default UserSearch
