# react-display-overlay

Display custom overlay elements on a custom background. Functionality is included such that overlay elements resize with the background.

![react-display-overlay-demo](https://user-images.githubusercontent.com/32421710/116020688-d4856200-a614-11eb-95e0-a85a3f01469b.gif)

See a more complex example incorporating react-player and styled-components [here](https://jensenrice.com/) (https://jensenrice.com/) and the source code [here](https://github.com/jensenrrr/rice-site) (https://github.com/jensenrrr/rice-site).

# Getting Started

### Install Package

    npm i react-display-overlay

## Basic Example (to obtain the result shown above)

### Declare Overlay Elements

Relative size and position are numbers you feed to determine the percentage size and position of the elements relative to the background. xRelative and yRelative corelate to the left and top respectively, so a yRelative of .4 means 40% from the top and a xRelative of .2 means 20% from the left.
```TSX
//Element to be overlaid
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

//create array of elements to be overlaid
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
```
### Import Background Image and use DisplayOverlay Component
```TSX

//import your background image (see below for help with custom or video backgrounds)
import backgroundPic from "./demoBackground.jpg";
import { overlaidElements } from "./overlaidElements";

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
```
## Custom Background / Background Videos

react-display-overlay is a lightweight package and contains no video display functionality, however, you can create an HTML element and pass that in as the background element. Below is an example of using react-player with react-display-overlay for video background.

### Create the Custom Background Component
```TSX

import ReactPlayer from "react-player";
import { OverlayBackgroundRenderProps } from "react-display-overlay";

const vid = "videos/SandbookHighBitRate.mp4";

const background = {
  render: ({
    backgroundRef,
    onBackgroundLoad,
    backgroundProps,
  }: OverlayBackgroundRenderProps) => (
    <div
      ref={backgroundRef}
      style={{ position: "relative", paddingTop: "56.25%", maxHeight: "2000" }}
    >
      <ReactPlayer
        url={vid}
        muted
        playing
        loop
        onStart={onBackgroundLoad}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  ),
};
```
### And Use the DisplayOverlay Component
```TSX
const OverlaidVideo = () => {
  return (
    <div>
      <DisplayOverlay
        background={sandbookBackground}
        overlaidElements={overlaidImages}
      />
    </div>
  );
};

export default OverlaidVideo;
```
