import * as React from "react";
import {
  OverlayBackground,
  OverlayBackgroundInstance,
} from "../Core/OverlayTypes";

interface BackgroundInput {
  background: OverlayBackground | string;
  backgroundRef: React.RefObject<HTMLDivElement>;
  onBackgroundLoad: () => void;
}

const Background = ({
  background,
  backgroundRef,
  onBackgroundLoad,
}: BackgroundInput) => {
  let customBackground = background as OverlayBackground;
  let imageBackground = background as string;
  return customBackground.render ? (
    <CustomBackgroundDisplay
      render={customBackground.render}
      backgroundProps={customBackground.backgroundProps}
      backgroundRef={backgroundRef}
      onBackgroundLoad={onBackgroundLoad}
    />
  ) : (
    <div ref={backgroundRef}>
      <img
        src={imageBackground}
        onLoad={onBackgroundLoad}
        style={{ position: "relative", width: "100%" }}
        alt={"Well this doesn't look too good."}
      />
    </div>
  );
};

const CustomBackgroundDisplay = ({
  render,
  backgroundProps,
  onBackgroundLoad,
  backgroundRef,
}: OverlayBackgroundInstance) => {
  return render({ backgroundProps, onBackgroundLoad, backgroundRef });
};

export default Background;
