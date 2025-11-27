let x = 200;        // 캐릭터의 x좌표
let y = 300;        // 캐릭터의 y좌표
let yVelocity = 0;  // 점프 시 속도
let onGround = true;
let handAngle = 0;  // 손 흔드는 각도
let waving = false; // 마우스 클릭 시 손 흔듦
let legAngle = 0;   // 다리 각도 (걷기용)
let legDir = 1;     // 다리 움직임 방향

function setup() {
  createCanvas(500, 400);
  frameRate(30);
}

function draw() {
  background(210, 240, 255); // 하늘색 배경
  drawGround();

  // 걷기 다리 움직임
  legAngle += legDir * 2;
  if (legAngle > 20 || legAngle < -20) legDir *= -1;

  // 점프 물리 적용
  y += yVelocity;
  yVelocity += 1; // 중력 효과
  if (y >= 300) {
    y = 300;
    yVelocity = 0;
    onGround = true;
  }

  // 캐릭터 그리기
  drawCharacter(x, y);
  
  // 걷기 이동
  if (keyIsDown(LEFT_ARROW)) x -= 3;
  if (keyIsDown(RIGHT_ARROW)) x += 3;

  // 경계 조건
  x = constrain(x, 50, width - 50);
}

function drawGround() {
  fill(100, 200, 100);
  rect(0, 350, width, 50);
}

// 본체 그리기 함수
function drawCharacter(cx, cy) {
  push();
  translate(cx, cy);

  // 다리
  stroke(0);
  strokeWeight(5);
  line(-15, 50, -15 + sin(radians(legAngle)) * 20, 80);
  line(15, 50, 15 - sin(radians(legAngle)) * 20, 80);

  // 몸통
  strokeWeight(2);
  fill(255, 200, 200);
  rect(-20, 0, 40, 50, 10);

  // 팔
  if (waving) {
    push();
    translate(20, 10);
    rotate(radians(handAngle));
    line(0, 0, 25, 0);
    handAngle += 10;
    if (handAngle > 45) waving = false; // 한 번만 흔들기
    pop();
  } else {
    line(20, 10, 40, 20);
  }
  line(-20, 10, -40, 20); // 왼쪽 팔

  // 얼굴
  fill(255, 220, 200);
  ellipse(0, -40, 60, 70);

  // 눈
  fill(0);
  ellipse(-12, -45, 10, 8);
  ellipse(12, -45, 10, 8);

  // 입
  noFill();
  strokeWeight(2);
  arc(0, -30, 20, 10, 0, PI);

  pop();
}

// ↑ 키로 점프
function keyPressed() {
  if (keyCode === UP_ARROW && onGround) {
    yVelocity = -15;
    onGround = false;
  }
}

// 마우스 클릭 시 손 흔들기
function mousePressed() {
  waving = true;
  handAngle = 0;
}
