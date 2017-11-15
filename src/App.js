import React from 'react';
import {LoginPage, Notifications, RegisterPage} from "./containers";
import {Route, Switch} from "react-router-dom";


const App = () =>
    <div className="main-container container">
        <section className="row main-container">
            <aside className="hidden-xs col-sm-2 col-md-3"></aside>
            <section className="col-xs-12 col-sm-8 col-md-6" id="main-page">
                <section className="row" id="page-content">
                    <Switch>
                        <Route exact path="/login"
                               component={() => (
                                   <div>
                                       <Notifications />
                                       <LoginPage />
                                   </div>
                               )} />
                        <Route exact path="/register"
                               component={() => (
                                   <div>
                                       <Notifications />
                                       <RegisterPage />
                                   </div>
                               )} />
                    </Switch>
                </section>
            </section>
            <aside className="hidden-xs col-sm-2 col-md-3"></aside>
        </section>
    </div>;


export default App