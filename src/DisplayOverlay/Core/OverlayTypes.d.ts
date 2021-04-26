export interface OverlayElementRenderProps {
  globalProps: any;
  absolutePositionAndSize: AbsolutePositionAndSize;
}
export interface OverlayBackgroundRenderProps {
  backgroundRef: React.RefObject<HTMLDivElement>;
  backgroundProps?: any;
  onBackgroundLoad: () => void;
}
export interface OverlayElementInstance {
  render: any;
  globalProps: any;
  absolutePositionAndSize?: AbsolutePositionAndSize;
}
export interface AbsolutePositionAndSize {
  top: number;
  left: number;
  width: number;
  height: number;
}
export interface DisplayOverlayInput {
  readonly background: OverlayBackground | string;
  readonly backgroundScale?: BackgroundScale;
  readonly globalProps?: any;
  readonly onLoad?: () => void;
  readonly overlaidElements: readonly OverlaidElementInput[];
}
export interface BackgroundScale {
  width?: number;
  height?: number;
  heightTrim?: number;
  cutTop?: boolean;
  cutBottom?: boolean;
}
export interface OverlayBackground {
  readonly render: any;
  readonly backgroundProps?: any;
}
export interface OverlayBackgroundInstance {
  readonly render: any;
  readonly backgroundProps?: any;
  backgroundRef: React.RefObject<HTMLDivElement>;
  onBackgroundLoad: () => void;
}

export interface OverlaidElementInput {
  readonly render: any;
  readonly imgProps?: any;
  readonly relativePositionAndSize: RelativePositionAndSize;
}
export interface OverlaidElementData {
  readonly render: any;
  readonly imgProps: any;
  readonly relativePositionAndSize: RelativePositionAndSize;
  readonly absolutePositionAndSize: AbsolutePositionAndSize;
}
export interface RelativePositionAndSize {
  yRelative: number;
  xRelative: number;
  widthScale: number;
  heightScale: number;
}
export interface ResizeAction {
  verticalMargin: number;
  backgroundHeight: number;
  backgroundWidth: number;
}
