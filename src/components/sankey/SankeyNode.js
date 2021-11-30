import React from "react";
import * as d3 from "d3";
import { useTranslation } from "react-i18next";

const NODE_LABEL_PADDING = 6;

const formatNumber = d3.format(",.0f");
const format = (d) => formatNumber(d);

const SankeyNode = ({
  node,
  id,
  name,
  value,
  width,
  x0,
  x1,
  y0,
  y1,
  color,
  onNodeClick,
}) => {
  const { t } = useTranslation();
  return (
    <g key={id}>
      <rect
        x={x0}
        y={y0}
        width={x1 - x0}
        height={y1 - y0}
        fill={color}
        cursor="pointer"
        data-testid="sankey-node-rect"
        onClick={(e) => onNodeClick(node, e)}
      >
        <title>{t(name) + "\n" + format(value)}</title>
      </rect>
      <text
        x={x0 < width / 2 ? x1 + NODE_LABEL_PADDING : x0 - NODE_LABEL_PADDING}
        y={(y1 + y0) / 2}
        textAnchor={x0 < width / 2 ? "start" : "end"}
        dy="0.35em"
        style={{
          fill: "#b57272",
          alignmentBaseline: "central",
        }}
      >
        {t(name)}
      </text>
    </g>
  );
};

SankeyNode.displayName = "SankeyNode";
SankeyNode.requiresSVG = true;

export default SankeyNode;
