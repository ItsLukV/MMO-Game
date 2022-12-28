const lvlReq: number[] = [2];

for (let i = 0; i < 100; i++) {
  lvlReq.push(Math.floor(lvlReq[lvlReq.length - 1] * 1.5));
}
