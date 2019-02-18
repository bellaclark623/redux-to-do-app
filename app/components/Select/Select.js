import React from "react";

export default ({ value, onChange, option, items, optionProps }) => {
  const ComponentToRender = option;
  let optionsDom = <div />;

  // If we have items, render them
  if (items) {
    optionsDom = items.map(item => (
      <ComponentToRender
        key={`item-${item.uuid}`}
        item={item}
        {...optionProps}
      />
    ));
  } else {
    // Otherwise render a single component
    optionsDom = <option>No Options</option>;
  }

  return (
    <select
      value={value || -1} // props.value
      onChange={onChange}
    >
      <option value="-1">Unassigned</option>
      {optionsDom}
    </select>
  );
};
