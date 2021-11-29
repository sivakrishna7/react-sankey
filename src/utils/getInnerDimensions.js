export function getInnerDimensions(props, defaultMargins) {
  const { margin, width, height } = props;
  const marginProps = {
    ...defaultMargins,
    ...(typeof margin === "number"
      ? {
          left: margin,
          right: margin,
          top: margin,
          bottom: margin,
        }
      : margin),
  };
  const {
    left: marginLeft = 0,
    top: marginTop = 0,
    right: marginRight = 0,
    bottom: marginBottom = 0,
  } = marginProps;
  return {
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    innerHeight: height - marginBottom - marginTop,
    innerWidth: width - marginLeft - marginRight,
  };
}
