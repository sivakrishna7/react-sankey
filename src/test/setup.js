import React from "react";
import { render } from "@testing-library/react";
import LanguageSelector from "../components/LanguageSelector";
import { Provider } from "react-redux";
import createAppStore from "../state/store";

const RootWrapper = ({ children }) => {
  return (
    <Provider store={createAppStore()}>
      {children}
      <LanguageSelector />
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: RootWrapper, ...options });

export const testRenderWithProps = (Component, props, wrapWithSvg = false) =>
  // eslint-disable-next-line jest/require-top-level-describe
  test(`Rendering ${Component.displayName}`, () => {
    const wrapper = render(
      wrapWithSvg ? (
        <svg>
          <Component {...props} />
        </svg>
      ) : (
        <Component {...props} />
      )
    );

    const component = wrapper.find(Component);
    expect(component).toHaveLength(1);

    const componentProps = component.props();
    Object.keys(props).forEach((propName) => {
      expect(componentProps[propName]).toEqual(props[propName]);
    });
  });

export * from "@testing-library/react";

export { customRender as render };
