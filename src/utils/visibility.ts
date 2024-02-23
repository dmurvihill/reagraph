import { PerspectiveCamera } from 'three';
import { EdgeLabelPosition } from '../symbols';

const NODE_THRESHOLD = 20;

export type LabelVisibilityType = 'all' | 'auto' | 'none' | 'nodes' | 'edges';

interface calcLabelVisibilityArgs {
  nodeCount: number;
  nodePosition?: { x: number; y: number; z: number };
  labelType: LabelVisibilityType;
  camera?: PerspectiveCamera;
}

export function calcLabelVisibility({
  nodeCount,
  nodePosition,
  labelType,
  camera
}: CalcLabelVisibilityArgs) {
  return (shape: 'node' | 'edge', size: number) => {
    if (
      camera &&
      nodePosition &&
      camera?.position?.z / camera?.zoom - nodePosition?.z > 6000
    ) {
      return false;
    }

    if (labelType === 'all') {
      return true;
    } else if (labelType === 'nodes' && shape === 'node') {
      return true;
    } else if (labelType === 'edges' && shape === 'edge') {
      return true;
    } else if (labelType === 'auto' && shape === 'node') {
      if (nodeCount <= NODE_THRESHOLD) {
        return true;
      } else {
        return size > 7;
      }
    }

    return false;
  };
}

export function getLabelOffsetByType(
  offset: number,
  position: EdgeLabelPosition
): number {
  switch (position) {
  case 'above':
    return offset;
  case 'below':
    return -offset;
  case 'inline':
  case 'natural':
  default:
    return 0;
  }
}
