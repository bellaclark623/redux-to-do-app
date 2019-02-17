import React from "react";
import PropTypes from "prop-types";

import List from "components/List";
import ListItem from "components/ListItem";
import LoadingIndicator from "components/LoadingIndicator";
import TasksListItem from "containers/TasksListItem";

const TasksList = props => {
  const { loading, error, tasks } = props;

  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={"Something went wrong, please try again!"} />
    );
    return <List component={ErrorComponent} />;
  }

  return tasks && tasks.length ? (
    <List
      items={tasks}
      component={TasksListItem}
      listItemProps={{ ...props }}
    />
  ) : (
    <section>There are no tasks added.</section>
  );
};

TasksList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  people: PropTypes.any
};

export default TasksList;
