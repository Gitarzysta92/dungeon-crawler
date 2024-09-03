import { Injectable } from "@angular/core";

@Injectable()
export class PointerService {
  p1 = { x: 200, y: 200 }
  p2 = { x: 100, y: 100 }
  powerTwo = 2;

  startColor = "rgba(0, 150, 255, 0)"
  endColor1 = "#82e0ff"
  endColor2 = "white"

  middle = { x: 0, y: 0 }
  pp1 = { x: 0, y: 0 }

  constructor() { }

  public initialize( ctx: CanvasRenderingContext2D) {

  }
  
  public showPointer(
    from: { x: number, y: number },
    to: { x: number, y: number },
    ctx: CanvasRenderingContext2D
  ) {
    const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
    grad.addColorStop(0, this.startColor);
    grad.addColorStop(1, this.endColor1);
    
    const grad2 = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
    grad2.addColorStop(0, this.endColor1);
    grad2.addColorStop(1, this.endColor2);

    this.middle.x = from.x - to.x;
    this.middle.y = from.y - to.y;

    const a2 = Math.atan2(this.middle.x, this.middle.y);
    const d = getDistanceBetweenVectors(from, to);

    this.pp1.x = from.x - d / 2;
    this.pp1.y = from.y - 20;


    const normalizedOffset = normalize(this.middle.y, 0, window.innerHeight - from.y );
    const m = ((Math.sqrt(Math.abs(this.middle.y)) / 40) > 0.15 ? 0.15 : (Math.sqrt(Math.abs(this.middle.y)) / 40)) * normalizedOffset;
    const k = Math.sqrt(Math.abs(this.middle.y))
    let m1 = 0;
    let m2 = 0;
    let m3 = 0;
    let m4 = 0;
    if (m < 0) {
      m1 = m * 1.5
      m2 = m * 3.5;
      m3 = k *10
      m4 = 0;
    } else {
      m1 = m * 3.5;
      m2 = m * 1.5;
      m3 = 0
      m4 = k *10;
    }

    const mod1 = (Math.PI * 0.95);
    const mod2 = (Math.PI * 1.05);
    const angle = ((a2 * -1) * 2);
    const pp2 = moveVectorOnCircle(to, (d + m3)/3, angle + mod1);
    const pp3 = moveVectorOnCircle(to, (d + m4)/3, angle + mod2);
    const pp4 = {
      x: from.x - d/2,
      y: from.y
    }

    const pp5 = moveVectorOnCircle(to, (d + m3)/4, angle + mod1);
    const pp6 = moveVectorOnCircle(to, (d + m4)/4, angle + mod1);


    ctx.filter = "blur(10px)";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.bezierCurveTo(this.pp1.x, this.pp1.y, pp5.x, pp5.y, to.x, to.y);
    ctx.bezierCurveTo(pp6.x, pp6.y, pp4.x, pp4.y, from.x, from.y);
    ctx.strokeStyle = '#9be6ff';
    ctx.fillStyle = grad;
    ctx.stroke();
    ctx.fill()
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.bezierCurveTo(this.pp1.x, this.pp1.y, pp5.x, pp5.y, to.x, to.y);
    ctx.bezierCurveTo(pp6.x, pp6.y, pp4.x, pp4.y, from.x, from.y);
    ctx.strokeStyle = '#9be6ff';
    ctx.fillStyle = grad;
    ctx.stroke();
    ctx.fill()

    ctx.filter = "blur(1px)";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.bezierCurveTo(this.pp1.x, this.pp1.y, pp5.x, pp5.y, to.x, to.y);
    ctx.bezierCurveTo(pp6.x, pp6.y, pp4.x, pp4.y, from.x, from.y);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 5;
    ctx.fillStyle = grad2;
    ctx.stroke();
    ctx.fill();

    ctx.closePath();
  }

}













function drawCircleHelper(x, y, radius, ctx) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "blue";
  ctx.stroke();
  ctx.closePath();
}


function drawPointHelper(x, y, color, ctx) {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill()
  ctx.closePath();
}


function getDistanceBetweenVectors(p, q) {
  return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2)) 
}


function moveVectorOnCircle(center, radius, angle) {
  // Calculate new x and y based on the angle
  const x = center.x + radius * Math.cos(angle);
  const y = center.y + radius * Math.sin(angle);

  return {x, y};
}

function normalize(value, min, max) {
  if (min === max) {
      throw new Error("Min and Max cannot be the same value.");
  }
  
  return (value - min) / (max - min);
}
