import { CSSProperties } from "react";
import { AbsolutePositionAndSize } from "./Core/OverlayTypes";

export const formatToPixels = (pos: number): string => {
  return `${Math.round(pos).toString()}px`;
};

export const absolutePositionAndSizeToCSS = (
  absolutePositionAndSize: AbsolutePositionAndSize
): CSSProperties => {
  return {
    position: "absolute",
    top: formatToPixels(
      absolutePositionAndSize?.top ? absolutePositionAndSize?.top : 0
    ),
    left: formatToPixels(
      absolutePositionAndSize?.left ? absolutePositionAndSize?.left : 0
    ),
    width: formatToPixels(
      absolutePositionAndSize?.width ? absolutePositionAndSize?.width : 0
    ),
    height: formatToPixels(
      absolutePositionAndSize?.height ? absolutePositionAndSize?.height : 0
    ),
  };
};

export const absolutePositionToCSS = (
  absolutePositionAndSize: AbsolutePositionAndSize
): CSSProperties => {
  return {
    position: "absolute",
    top: formatToPixels(
      absolutePositionAndSize?.top ? absolutePositionAndSize?.top : 0
    ),
    left: formatToPixels(
      absolutePositionAndSize?.left ? absolutePositionAndSize?.left : 0
    ),
  };
};
