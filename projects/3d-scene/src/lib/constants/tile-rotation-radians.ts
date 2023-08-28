import { Quaternion, Vector3 } from "three";
const axis = new Vector3(0, 1, 0);

export const ROTATION_ANGLES = {
  top: new Quaternion().setFromAxisAngle(axis, (Math.PI / 180) * 30),
  topLeft: new Quaternion().setFromAxisAngle(axis, (Math.PI / 180) * 90),
  bottomLeft: new Quaternion().setFromAxisAngle(axis, (Math.PI / 180) * 150),
  bottom: new Quaternion().setFromAxisAngle(axis, (Math.PI / 180) * 210),
  bottomRight: new Quaternion().setFromAxisAngle(axis, (Math.PI / 180) * 270),
  topRight: new Quaternion().setFromAxisAngle(axis, (Math.PI / 180) * 330)
};