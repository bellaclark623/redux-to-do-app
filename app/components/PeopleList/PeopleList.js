import React from "react";
import PropTypes from "prop-types";

import List from "components/List";
import ListItem from "components/ListItem";
import LoadingIndicator from "components/LoadingIndicator";
import PeopleListItem from "containers/PeopleListItem";

const PeopleList = props => {
  const { loading, error, people } = props;

  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={"Something went wrong, please try again!"} />
    );
    return <List component={ErrorComponent} />;
  }

  if (people !== false) {
    return (
      <List
        items={people}
        component={PeopleListItem}
        listItemProps={{ ...props }}
      />
    );
  }

  return null;
};

PeopleList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  people: PropTypes.any
};

export default PeopleList;
