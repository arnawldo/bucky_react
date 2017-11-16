import React from 'react';
import {
    BucketLists, BucketName, LoginPage, LogoutPage, NavBar, NewBucketList, NewTask, Notifications, RegisterPage, Tasks,
    WelcomePage
} from "./components/containers/containers";
import {Route, Switch} from "react-router-dom";
import NotFound from "./components/ui/ShowNotFound";


const App = () =>
    <div className="main-container container">
        <NavBar/>
        <section className="row main-container">
            <aside className="hidden-xs col-sm-2 col-md-3"></aside>
            <section className="col-xs-12 col-sm-8 col-md-6" id="main-page">
                <section className="row" id="page-content">
                    <Switch>
                        <Route exact path="/"
                               component={() => (
                                   <div>
                                       <WelcomePage />
                                   </div>
                               )} />
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
                        <Route path="/bucketlists"
                               component={() => (
                                   <div>
                                       <Route exact path="/bucketlists"
                                              component={() => (
                                                  <div>
                                                      <Notifications/>
                                                      <div className="page-header">
                                                          <h1>Bucket-lists</h1>
                                                      </div>
                                                      <NewBucketList/>
                                                      <BucketLists/>
                                                  </div>
                                              )}/>
                                       <Route exact path="/bucketlists/:id/tasks"
                                              component={() => (
                                                  <div>
                                                      <Notifications/>
                                                      <BucketName/>
                                                      <NewTask/>
                                                      <Tasks/>
                                                  </div>
                                              )}/>
                                   </div>
                               )}/>

                        <Route exact path="/logout" component={LogoutPage}/>
                        <Route component={NotFound}/>
                    </Switch>
                </section>
            </section>
            <aside className="hidden-xs col-sm-2 col-md-3"></aside>
        </section>
    </div>;


export default App