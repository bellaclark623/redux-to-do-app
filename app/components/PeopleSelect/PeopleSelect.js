import React from "react";
import Select from "../Select";

export default ({ items, value, onChange }) => {
  let content = ({ item }) => {
    return (
      <option name="task.edited.assignee" value={item.uuid} key={item.uuid}>
        {item.name}
      </option>
    );
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      items={items}
      option={content}
      optionProps
    />
  );
};
