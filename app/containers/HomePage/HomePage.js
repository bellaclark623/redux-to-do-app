/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import PeopleList from "../../containers/PeopleList";
import TasksList from "../../containers/TasksList";
import "./style.scss";
import AddPersonForm from "../../containers/AddPersonForm";
import AddTaskForm from "../AddTaskForm";

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div className="home-page">
          <section>
            <h3>Participants</h3>
            <PeopleList {...this.props} />
            <h5>Add Participant</h5>
            <AddPersonForm {...this.props} />
          </section>
          <section>
            <h3>Bucket List</h3>
            <TasksList {...this.props} />
            <h5>What do you want to do before you DIE?!</h5>
            <AddTaskForm {...this.props} />
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func
};
