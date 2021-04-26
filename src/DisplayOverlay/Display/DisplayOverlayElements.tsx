import * as React from "react";
import {
  OverlaidElementData,
  OverlayElementInstance,
} from "../Core/OverlayTypes";

export const OverlayElements = (
  overlayImages: readonly OverlaidElementData[],
  globalProps: any
) =>
  overlayImages.map((overlaidImage, i) => (
    <OverlayImage
      render={overlaidImage.render}
      globalProps={globalProps}
      absolutePositionAndSize={overlaidImage.absolutePositionAndSize}
      key={"overlay" + i}
    />
  ));

export const OverlayImage = ({
  render,
  globalProps,
  absolutePositionAndSize,
}: OverlayElementInstance) => {
  return render({ absolutePositionAndSize, globalProps });
};
