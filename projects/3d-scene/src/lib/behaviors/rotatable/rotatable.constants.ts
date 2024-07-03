import { Quaternion, Vector3 } from "three";
const axis = new Vector3(0, 1, 0);
const shift = 0;


export const ROTATION_ANGLES = {
  0: new Quaternion().setFromAxisAngle(axis, 0),
  1: new Quaternion().setFromAxisAngle(axis, -(Math.PI / 3) * 1 + shift),
  2: new Quaternion().setFromAxisAngle(axis, -(Math.PI / 3) * 2 + shift),
  3: new Quaternion().setFromAxisAngle(axis, -(Math.PI / 3) * 3 + shift),
  4: new Quaternion().setFromAxisAngle(axis, -(Math.PI / 3) * 4 + shift),
  5: new Quaternion().setFromAxisAngle(axis, -(Math.PI / 3) * 5 + shift)
};1