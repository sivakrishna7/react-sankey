import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

const DEFAULT_LINK_COLOR = "#12939A";
const DEFAULT_LINK_OPACITY = 0.5;

const formatNumber = d3.format(",.0f");
const format = (d) => formatNumber(d);

function SankeyLink({
  data,
  node,
  opacity = DEFAULT_LINK_OPACITY,
  color = DEFAULT_LINK_COLOR,
  strokeWidth = 1,
  style = {},
  onLinkClick = null,
  onLinkMouseOver = null,
  onLinkMouseOut = null,
}) {
  return (
    <path
      d={data}
      {...style}
      cursor="pointer"
      className="sankey-link"
      opacity={Number.isFinite(opacity) ? opacity : DEFAULT_LINK_OPACITY}
      stroke={color || DEFAULT_LINK_COLOR}
      onClick={(e) => onLinkClick(node, e)}
      onMouseOver={(e) => onLinkMouseOver(node, e)}
      onMouseOut={(e) => onLinkMouseOut(node, e)}
      strokeWidth={strokeWidth}
      fill="none"
      data-testid="sankey-link-path"
    >
      <title
        data-testid={`${node.source.name}-to-${node.target.name}-is-${node.value}`}
      >
        {node.source.name +
          " → " +
          node.target.name +
          "\n Weight: " +
          format(node.value)}
      </title>
    </path>
  );
}

SankeyLink.displayName = "SankeyLink";
SankeyLink.requiresSVG = true;
SankeyLink.propTypes = {
  node: PropTypes.object.isRequired,
  data: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func,
  onLinkMouseOver: PropTypes.func,
  onLinkMouseOut: PropTypes.func,
};
export default SankeyLink;
