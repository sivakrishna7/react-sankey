import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../hooks";

const styles = {
  cursor: { cursor: "pointer" },
};
const AddLink = () => {
  const [link, setLink] = useState({
    source: NaN,
    target: NaN,
    weight: "Weight",
  });
  const { nodes, links } = useSelector((store) => store.transactions);
  const { addLink } = useActions();

  const handleChange = (key) => {
    return (e) => {
      const link = {};
      link[key] = parseInt(e.target.value);
      setLink((prevState) => {
        return { ...prevState, ...link };
      });
    };
  };

  const clearInput = () => {
    setLink((prevState) => ({ ...prevState, weight: "" }));
  };

  const setDefault = () => {
    if (typeof link.weight !== "number") {
      setLink((prevState) => ({ ...prevState, weight: "Weight" }));
    }
  };

  const sourceNodes = nodes.map((node, i) => {
    return (
      <option value={i} key={`source-node-${i}`}>
        {node.name}
      </option>
    );
  });

  sourceNodes.unshift(
    <option value={NaN} key="000">
      {"Select Source"}
    </option>
  );

  const targetNodes = nodes.map((node, i) => {
    return (
      <option value={i} disabled={i === link.source} key={`target-node-${i}`}>
        {node.name}
      </option>
    );
  });

  targetNodes.unshift(
    <option value={NaN} key="000">
      {"Select Target"}
    </option>
  );

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <select
        style={styles.cursor}
        id="source"
        onChange={handleChange("source")}
      >
        {sourceNodes}
      </select>

      <select
        style={styles.cursor}
        id="target"
        onChange={handleChange("target")}
      >
        {targetNodes}
      </select>

      <input
        value={link.weight}
        onFocus={() => clearInput()}
        onBlur={() => setDefault()}
        onChange={handleChange("weight")}
      />

      <span>
        <button
          style={styles.cursor}
          onClick={() =>
            addLink({
              source: parseInt(link.source),
              target: parseInt(link.target),
              value: parseInt(link.weight),
            })
          }
        >
          Add Link
        </button>
      </span>
    </div>
  );
};

AddLink.displayName = "AddLink";
export { AddLink };
