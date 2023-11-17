import { Quaternion, Vector3 } from "three";
const axis = new Vector3(0, 1, 0);

export const ROTATION_ANGLES = {
  0: new Quaternion().setFromAxisAngle(axis, (Math.PI / 180) * 30),
  1: new Quaternion().setFromAxisAngle(axis, (Math.PI / 180) * 90),
  2: new Quaternion().setFromAxisAngle(axis, (Math.PI / 180) * 150),
  3: new Quaternion().setFromAxisAngle(axis, (Math.PI / 180) * 210),
  4: new Quaternion().setFromAxisAngle(axis, (Math.PI / 180) * 270),
  5: new Quaternion().setFromAxisAngle(axis, (Math.PI / 180) * 330)
};