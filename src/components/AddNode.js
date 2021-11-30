import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useActions } from "../hooks";

const AddNode = () => {
  const [node, setNode] = useState({ name: "" });
  const { t } = useTranslation();
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
      <input
        data-testid="node-input"
        value={defaultValue}
        onChange={handleChange("name")}
      />
      <span>
        <button
          data-testid="add-node-button"
          style={{ cursor: "pointer" }}
          onClick={() => addNode({ name: node.name })}
        >
          {t("addNode")}
        </button>
      </span>
    </div>
  );
};

AddNode.displayName = "AddNode";
export { AddNode };
