import { Quaternion, Vector3 } from "three";
const axis = new Vector3(0, 1, 0);

export const ROTATION_ANGLES = {
  0: new Quaternion().setFromAxisAngle(axis, 0),
  1: new Quaternion().setFromAxisAngle(axis, -(Math.PI / 3) * 1),
  2: new Quaternion().setFromAxisAngle(axis, -(Math.PI / 3) * 2),
  3: new Quaternion().setFromAxisAngle(axis, -(Math.PI / 3) * 3),
  4: new Quaternion().setFromAxisAngle(axis, -(Math.PI / 3) * 4),
  5: new Quaternion().setFromAxisAngle(axis, -(Math.PI / 3) * 5)
};