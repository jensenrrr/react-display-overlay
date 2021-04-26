import * as React from "react";
import Background from "./DisplayOverlay/Display/Background";
import {
  initOverlaidElementsState,
  overlaidElementsReducer,
} from "./DisplayOverlay/Core/OverlayElementsState";
import { OverlayElements } from "./DisplayOverlay/Display/DisplayOverlayElements";
import {
  AbsolutePositionAndSize,
  DisplayOverlayInput,
  OverlaidElementData,
  OverlaidElementInput,
  OverlayBackground,
  OverlayBackgroundRenderProps,
  OverlayElementRenderProps,
  ResizeAction,
} from "./DisplayOverlay/Core/OverlayTypes";
import {
  VerticalCutOutput,
  getVerticalMargin,
} from "./DisplayOverlay/Core/VerticalCrop";
import {
  absolutePositionAndSizeToCSS,
  absolutePositionToCSS,
  formatToPixels,
} from "./DisplayOverlay/PublicTools";

const { useState, useRef, useReducer, useEffect } = React;

const DisplayOverlay: React.FC<DisplayOverlayInput> = ({
  background,
  backgroundScale = {
    width: 1920,
    height: 1080,
    heightTrim: 0,
    cutTop: false,
    cutBottom: false,
  },
  globalProps,
  overlaidElements,
  onLoad,
}: DisplayOverlayInput) => {
  const [overlaidElementsState, overlaidElementsDispatch] = useReducer<
    React.Reducer<readonly OverlaidElementData[], ResizeAction>,
    readonly OverlaidElementInput[]
  >(overlaidElementsReducer, overlaidElements, initOverlaidElementsState);

  const backgroundRef = useRef<HTMLDivElement>(null);

  const [currentBackgroundSize, setCurrentBackgroundSize] = useState({
    width: 0,
    height: 0,
  });

  const [verticalMargin, setVerticalMargin] = useState<VerticalCutOutput>({
    topCut: 0,
    styles: {},
  });

  function resizedBackground() {
    if (backgroundRef && backgroundRef.current) {
      setCurrentBackgroundSize({
        height:
          backgroundRef.current.offsetWidth *
          (backgroundScale.height && backgroundScale.width
            ? backgroundScale.height / backgroundScale.width
            : 1),
        width: backgroundRef.current.offsetWidth,
      });
    }
  }

  useEffect(() => {
    window.addEventListener("resize", resizedBackground);
    return () => window.removeEventListener("resize", resizedBackground);
  });

  const onBackgroundLoad = () => {
    resizedBackground();
    if (onLoad) onLoad();
  };

  useEffect(() => {
    const newVerticalMargin = getVerticalMargin({
      cutTop: backgroundScale.cutTop,
      cutBottom: backgroundScale.cutBottom,
      maxHeightCutOff: backgroundScale.heightTrim,
      backgroundHeight: currentBackgroundSize.height,
      windowHeight: window.innerHeight,
    });

    setVerticalMargin(newVerticalMargin);

    overlaidElementsDispatch({
      verticalMargin: newVerticalMargin.topCut,
      backgroundHeight: currentBackgroundSize.height,
      backgroundWidth: currentBackgroundSize.width,
    });
  }, [
    currentBackgroundSize,
    backgroundScale,
    setVerticalMargin,
    overlaidElementsDispatch,
  ]);

  return (
    <div style={verticalMargin.styles}>
      <Background
        background={background}
        backgroundRef={backgroundRef}
        onBackgroundLoad={onBackgroundLoad}
      />
      {OverlayElements(overlaidElementsState, globalProps)}
    </div>
  );
};

export { absolutePositionAndSizeToCSS, absolutePositionToCSS, formatToPixels };
export {
  OverlaidElementInput,
  OverlayElementRenderProps,
  OverlayBackground,
  OverlayBackgroundRenderProps,
  AbsolutePositionAndSize,
};
export default DisplayOverlay;
