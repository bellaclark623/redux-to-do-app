import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const List = ({ component, items, listItemProps }) => {
  const ComponentToRender = component;
  let content = <div />;

  // If we have items, render them
  if (items) {
    content = items.map(item => (
      <ComponentToRender
        key={`item-${item.uuid}`}
        item={item}
        {...listItemProps}
      />
    ));
  } else {
    // Otherwise render a single component
    content = <ComponentToRender />;
  }

  return items.length ? (
    <div className="list-wrapper">
      <ul>{content}</ul>
    </div>
  ) : null;
};

List.propTypes = {
  component: PropTypes.func.isRequired,
  items: PropTypes.array
};

export default List;
