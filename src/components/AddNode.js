import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../hooks";

const AddNode = () => {
  const [node, setNode] = useState({ name: "" });
  const { nodes } = useSelector((store) => store.transactions);
  const { addNode } = useActions();
  useEffect(() => {
    setNode({ name: `Node ${nodes.length}` });
  }, [nodes]);

  const handleChange = (key) => {
    return (e) => {
      const node = {};
      node[key] = e.target.value;
      setNode(node);
    };
  };

  const defaultValue = node.name;

  return (
    <div>
      <input value={defaultValue} onChange={handleChange("name")} />
      <span>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => addNode({ name: node.name })}
        >
          Add Node
        </button>
      </span>
    </div>
  );
};

AddNode.displayName = "AddNode";
export { AddNode };
