import {
  ResizeAction,
  RelativePositionAndSize,
  AbsolutePositionAndSize,
  OverlaidElementData,
  OverlaidElementInput,
} from "./OverlayTypes";

const determineAbsolutePosition = (
  size: ResizeAction,
  relativePositionAndSize: RelativePositionAndSize
): AbsolutePositionAndSize => ({
  top:
    size.backgroundHeight * relativePositionAndSize.yRelative -
    size.verticalMargin,
  left: size.backgroundWidth * relativePositionAndSize.xRelative,
  width: size.backgroundWidth * relativePositionAndSize.widthScale,
  height: size.backgroundHeight * relativePositionAndSize.heightScale,
});

export const overlaidElementsReducer = (
  state: readonly OverlaidElementData[],
  action: ResizeAction
): readonly OverlaidElementData[] => {
  let newState: OverlaidElementData[] = [];

  state.forEach((overlayElement) => {
    newState.push({
      render: overlayElement.render,
      imgProps: overlayElement.imgProps,
      relativePositionAndSize: overlayElement.relativePositionAndSize,
      absolutePositionAndSize: determineAbsolutePosition(
        action,
        overlayElement.relativePositionAndSize
      ),
    });
  });
  return newState;
};

const initialAbsolute: AbsolutePositionAndSize = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
};

export const initOverlaidElementsState = (
  elementsInput: readonly OverlaidElementInput[]
): OverlaidElementData[] => {
  const initialImageState: OverlaidElementData[] = [];
  for (let info of elementsInput) {
    const imageInfo: OverlaidElementData = {
      render: info.render,
      imgProps: info.imgProps,
      relativePositionAndSize: info.relativePositionAndSize,
      absolutePositionAndSize: initialAbsolute,
    };
    initialImageState.push(imageInfo);
  }
  return initialImageState;
};
