export interface VerticalCutOutput {
  topCut: number;
  styles: VerticalCutStyles;
}
interface VerticalCutInput {
  backgroundHeight: number;
  windowHeight: number;
  maxHeightCutOff?: number;
  cutTop?: boolean;
  cutBottom?: boolean;
}
interface VerticalCutStyles {
  marginTop?: string;
  marginBottom?: string;
}

export const getVerticalMargin = function ({
  backgroundHeight,
  windowHeight,
  maxHeightCutOff = 1,
  cutTop = false,
  cutBottom = false,
}: VerticalCutInput): VerticalCutOutput {
  const heightOverflow = 1 - 1 / (backgroundHeight / windowHeight);
  if (heightOverflow > 0) {
    const verticalCut = cutTop
      ? Math.min(heightOverflow, maxHeightCutOff) * backgroundHeight
      : 0;
    return {
      topCut: verticalCut,
      styles: {
        marginTop: cutTop ? `-${verticalCut}px` : undefined,
        marginBottom: cutBottom
          ? `-${verticalCut * backgroundHeight}px`
          : undefined,
      },
    };
  }
  return { topCut: 0, styles: {} };
};
