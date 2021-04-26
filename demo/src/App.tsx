import React from "react";
import DisplayOverlay, {
  AbsolutePositionAndSize,
  absolutePositionAndSizeToCSS,
  OverlaidElementInput,
  OverlayElementRenderProps,
} from "react-display-overlay";
import backgroundPic from "./demoBackground.jpg";

const BlackBox: React.FC<AbsolutePositionAndSize> = (
  absolutePositionAndSize
) => (
  <div
    style={{
      ...absolutePositionAndSizeToCSS(absolutePositionAndSize),
      backgroundColor: "black",
    }}
  ></div>
);

const overlaidElements = () => {
  const boxOne: OverlaidElementInput = {
    render: ({ absolutePositionAndSize }: OverlayElementRenderProps) => (
      <BlackBox {...absolutePositionAndSize} />
    ),
    relativePositionAndSize: {
      yRelative: 0.4,
      xRelative: 0.2,
      widthScale: 0.2,
      heightScale: 0.2,
    },
  };

  const boxTwo: OverlaidElementInput = {
    render: ({ absolutePositionAndSize }: OverlayElementRenderProps) => (
      <BlackBox {...absolutePositionAndSize} />
    ),
    relativePositionAndSize: {
      yRelative: 0.4,
      xRelative: 0.6,
      widthScale: 0.2,
      heightScale: 0.2,
    },
  };

  return [boxOne, boxTwo];
};

function App() {
  return (
    <div>
      <DisplayOverlay
        background={backgroundPic}
        overlaidElements={overlaidElements()}
      />
    </div>
  );
}

export default App;
