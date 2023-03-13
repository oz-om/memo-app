import React from "react";

export default function Masonry({ columnsCount, gap, children }) {
  let columns = [];
  // create columns
  for (let c = 0; c < columnsCount; c++) {
    let column = React.createElement("div", { key: `col_${c}` });
    columns.push(column);
  }

  // distribution items
  if (columnsCount > 1) {
    let current = 0;
    for (let i = 0; i < children.length; i++) {
      if (current == columnsCount) {
        current = 0;
      }
      let columnChildren = columns[current].props.children || [];
      let columnProps = columns[current].props;
      columns[current] = React.cloneElement(columns[current], { ...columnProps, className: "w-2/4" }, [...columnChildren, children[i]]);
      current++;
    }
  }

  return <div className={`flex gap-x-${gap} pb-14`}>{columns}</div>;
}
