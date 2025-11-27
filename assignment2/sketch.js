function setup() {
  createCanvas(400, 300);
  noLoop(); // 한 번만 그림
}

function draw() {
  background(255);

  // 몸통
  fill(173, 234, 247);
  rect(150, 150, 100, 90);

  // 팔
  rect(130, 160, 20, 60);
  rect(250, 160, 20, 60);

  // 머리카락
  fill(0);
  ellipse(200, 110, 130, 140);
  rect(135, 110, 130, 80);

  // 얼굴
  fill(255, 220, 200);
  ellipse(200, 120, 100, 110);

  // 귀
  ellipse(150, 125, 20, 20);
  ellipse(250, 125, 20, 20);

  // 눈
  fill(0);
  ellipse(185, 115, 12, 12);
  ellipse(215, 115, 12, 12);
  fill(255);
  ellipse(182, 112, 4, 4);
  ellipse(212, 112, 4, 4);

  // 코
  stroke(200, 150, 120);
  strokeWeight(2);
  line(200, 120, 200, 130);
  noStroke();

  // 입
  stroke(255, 0, 0);
  strokeWeight(3);
  noFill();
  arc(200, 140, 30, 20, 0, PI);
}
