// Type definitions for TensorFlow.js
declare namespace tf {
  export const version: string;

  export interface Tensor {
    shape: number[];
    dtype: string;
    size: number;
    dataSync(): Float32Array | Int32Array | Uint8Array;
    data(): Promise<Float32Array | Int32Array | Uint8Array>;
    dispose(): void;
    toFloat(): Tensor;
    expandDims(axis?: number): Tensor;
    resizeNearestNeighbor(size: [number, number]): Tensor;
    div(n: Tensor | number): Tensor;
  }

  export interface GraphModel {
    predict(inputs: Tensor | Tensor[]): Tensor | Tensor[];
    execute(inputs: Tensor | Tensor[], outputs?: string[]): Tensor | Tensor[];
    dispose(): void;
    inputs: Array<{ name: string; shape: number[] }>;
    outputs: Array<{ name: string; shape: number[] }>;
  }

  export function loadGraphModel(modelUrl: string): Promise<GraphModel>;
  export function zeros(shape: number[]): Tensor;

  export const browser: {
    fromPixels(
      pixels: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
      numChannels?: number
    ): Tensor;
  };
}

// Add tf property to Window interface
interface Window {
  tf: typeof tf;
}
