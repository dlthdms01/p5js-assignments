let baseColors = [];
let pentagonOffsets = [];

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  baseColors.push(color(210, 80, 100, 60));
  baseColors.push(color(300, 70, 100, 60));
  baseColors.push(color(45, 90, 100, 60));
  baseColors.push(color(180, 50, 100, 60));

  for (let i = 0; i < 10; i++) {
    pentagonOffsets.push(createVector(random(-80, 80), random(-60, 60)));
  }

  noLoop(); // 한 번만 그리기 (정적인 그림)
}

function draw() {
  background(0, 0, 100);

  let t = 1.0; // 고정된 시간값

  drawRings(t);
  drawCenterEllipses(t);
  drawStackedRects(t);
  drawTriangles(t);
  drawPentagons(t);
  drawDashedPath(t);
}

function drawRings(t) {
  push();
  translate(width / 2, height / 2);
  noFill();
  strokeWeight(2);

  for (let i = 0; i < 5; i++) {
    let r = 90 + i * 35;
    let c = color(180, 40, map(i, 0, 4, 60, 30), 80);
    stroke(c);
    ellipse(0, 0, r * 2, r * 1.6);
  }

  stroke(180, 40, 50, 80);
  strokeWeight(4);
  let R = 200;
  arc(0, 0, R * 2.4, R * 2.0, -0.8, 0.8);
  arc(0, 0, R * 2.4, R * 2.0, PI - 0.8, PI + 0.8);

  pop();
}

function drawCenterEllipses(t) {
  push();
  translate(width / 2, height / 2);

  let c1 = color(330, 60, 100, 50);
  let c2 = color(20, 70, 100, 50);
  let amt = 0.5;
  let col = lerpColor(c1, c2, amt);

  noStroke();
  fill(col);
  let w = 200;
  let h = 120;
  ellipse(0, 0, w, h);

  fill(30, 80, 100, 40);
  ellipse(-40, 10, w * 0.8, h * 0.9);

  fill(260, 60, 100, 40);
  ellipse(10, -20, w * 0.6, h * 0.7);

  pop();
}

function drawStackedRects(t) {
  push();
  translate(width * 0.2, height * 0.7);

  for (let i = 0; i < 5; i++) {
    push();
    let angle = -0.3 + 0.08 * i;
    rotate(angle);
    let c = baseColors[(i + 1) % baseColors.length];
    fill(hue(c), saturation(c), brightness(c), 70);
    rectMode(CENTER);
    rect(0 + i * 5, 0 - i * 5, 160, 90);
    pop();
  }

  pop();
}

function drawTriangles(t) {
  let center = createVector(width / 2, height / 2);

  for (let i = 0; i < 6; i++) {
    let angle = (TWO_PI / 6) * i;
    let radius = 140;
    let x = center.x + radius * cos(angle);
    let y = center.y + radius * sin(angle);

    let cA = baseColors[i % baseColors.length];
    let cB = baseColors[(i + 2) % baseColors.length];
    let col = lerpColor(cA, cB, 0.5);

    push();
    translate(x, y);
    rotate(angle + PI / 2);
    noStroke();
    fill(col);
    let size = 65;
    triangle(-size / 2, size / 2, size / 2, size / 2, 0, -size / 2);
    pop();
  }
}

function drawPentagons(t) {
  let center = createVector(width / 2, height / 2);

  for (let i = 0; i < pentagonOffsets.length; i++) {
    let off = pentagonOffsets[i];
    let angle = i;
    let r = 170;
    let x = center.x + (r + off.x) * cos(angle);
    let y = center.y + (r + off.y) * sin(angle * 0.9);

    fill(50, 90, 80, 45);

    let size = 25;
    drawPentagonShape(x, y, size, angle);
  }
}

function drawPentagonShape(x, y, r, rot) {
  push();
  translate(x, y);
  rotate(rot);
  beginShape();
  for (let i = 0; i < 5; i++) {
    let a = (TWO_PI * i) / 5 - PI / 2;
    vertex(r * cos(a), r * sin(a));
  }
  endShape(CLOSE);
  pop();
}

function drawDashedPath(t) {
  push();
  noFill();
  stroke(0, 0, 20, 80);
  strokeWeight(2);

  drawingContext.setLineDash([8, 6]);

  beginShape();
  for (let u = 0; u <= 1; u += 0.02) {
    let x = lerp(width * 0.25, width * 0.75, u);
    let y = lerp(height * 0.8, height * 0.2, u);
    vertex(x, y);
  }
  endShape();

  drawingContext.setLineDash([]);
  pop();
}
