import { scaleLinear } from "d3";
import {
  sankey,
  sankeyLinkHorizontal,
  sankeyCenter,
  sankeyJustify,
  sankeyLeft,
  sankeyRight,
} from "d3-sankey";
import chroma from "chroma-js";
import PropTypes from "prop-types";
import SankeyLink from "./SankeyLink";
import SankeyNode from "./SankeyNode";
import { getInnerDimensions } from "../../utils/getInnerDimensions";

const ALIGNMENTS = {
  justify: sankeyJustify,
  center: sankeyCenter,
  left: sankeyLeft,
  right: sankeyRight,
};

const DEFAULT_MARGINS = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 20,
};

const SankeyChart = ({
  nodes: nodesCopy,
  links: linksCopy,
  margin = DEFAULT_MARGINS,
  nodePadding = 10,
  nodeWidth = 10,
  width,
  height,
  align = "justify",
  layout = 50,
  onLinkClick,
  onLinkMouseOver,
  onLinkMouseOut,
}) => {
  const { marginLeft, marginTop, marginRight, marginBottom } =
    getInnerDimensions(
      {
        margin,
        height,
        width,
      },
      DEFAULT_MARGINS
    );
  const sankeyInstance = sankey()
    .extent([
      [marginLeft, marginTop],
      [width - marginRight, height - marginBottom - marginTop],
    ])
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .nodes(nodesCopy)
    .links(linksCopy)
    .nodeAlign(ALIGNMENTS[align])
    .iterations(layout);
  sankeyInstance(nodesCopy);

  const color = chroma.scale("Set2").classes(nodesCopy.length);
  const colorScale = scaleLinear().domain([0, nodesCopy.length]).range([0, 1]);
  const path = sankeyLinkHorizontal();
  return (
    <svg width={width} height={height}>
      <g style={{ mixBlendMode: "multiply" }}>
        {nodesCopy.map((node, i) => {
          return (
            <SankeyNode
              key={node.name}
              {...node}
              color={color(colorScale(i)).hex()}
              width={width}
            />
          );
        })}
        {linksCopy.map((link, i) => {
          return (
            <SankeyLink
              data={path(link)}
              color={color(colorScale(link.source.index)).hex()}
              key={`sankey-link-${i}`}
              strokeWidth={Math.max(1, link.width)}
              onLinkClick={onLinkClick}
              onLinkMouseOver={onLinkMouseOver}
              onLinkMouseOut={onLinkMouseOut}
              node={link}
            />
          );
        })}
      </g>
    </svg>
  );
};

SankeyChart.propTypes = {
  align: PropTypes.oneOf(["justify", "left", "right", "center"]),
  height: PropTypes.number.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
        .isRequired,
      target: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
        .isRequired,
    })
  ).isRequired,
  nodePadding: PropTypes.number,
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  margin: PropTypes.oneOfType([
    PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
    }),
    PropTypes.number,
  ]),
  nodeWidth: PropTypes.number,
  onLinkClick: PropTypes.func,
  onLinkMouseOver: PropTypes.func,
  onLinkMouseOut: PropTypes.func,
  width: PropTypes.number.isRequired,
};

SankeyChart.displayName = "SankeyChart";
export { SankeyChart };
