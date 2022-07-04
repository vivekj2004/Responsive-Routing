import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Media from 'react-media';
import Nav from './Nav';
import UsersList from './Users/UsersList';
import UsersDetails from './Users/UsersDetails';
import UsersDashboard from './Users/UsersDashboard';
import './App.css';

class App extends Component {

  state = {
    users: [
      {
        id: 39191,
        avatar: 'https://avatars0.githubusercontent.com/u/39191?v=4',
        name: 'Paul Irish',
        username: 'paulirish',
        followers: '12k',
        following: '1k',
        repos: '1.5k'
      },
      // ... other user data
    ]
  };

  render() {
    return (
      <div className="App">
        <Nav />
        <Media query="(max-width: 599px)">
          {matches =>
            matches ? (
              <Switch>
                <Route
                  exact
                  path="/users"
                  render={props => (
                    <UsersList users={this.state.users} {...props} />
                  )}
                />
                <Route
                  path="/users/:id"
                  render={props => (
                    <UsersDetails
                      user={
                        this.state.users.filter(
                          user =>
                            user.id === parseInt(props.match.params.id, 10)
                        )[0]
                      }
                      {...props}
                    />
                  )}
                />
                <Redirect from="/" to="/users"/>
                <Redirect from="/dashboard" to="/users"/>
              </Switch>
            ) : (
              <Switch>
        <Route
          path="/dashboard"
          render={props => (
            <UsersDashboard users={this.state.users} {...props} />
          )}
        />
        <Redirect from="/" to="/dashboard"/>
        <Redirect from="/users" to="/dashboard"/>
        </Switch>
        )
      }
    </Media>
      </div>
    );
  }
}

export default App;