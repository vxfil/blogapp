import React from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { SignUp } from './pages/SignUp/SignUp';
import { SignIn } from './pages/SignIn/SignIn';
import { Forgot } from './pages/Forgot';
import Navbar from './components/Navbar/Navbar';
import { Posts } from './pages/Posts';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { PassConfirm } from './pages/PassConfirm';
import { Page404 } from './pages/Page404';
import { CreatePost } from './pages/CreatePost';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/passconfirm" component={PassConfirm} />
          <Route exact path="/posts" component={Posts} />
          <Route path="/createpost" component={CreatePost} />
          <Route path="/profile" component={Profile} />
          <Route path="/about" component={About} />
          <Route path="*" component={Page404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
