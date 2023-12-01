function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

for (let i = 0; i < 200; i++) {
  console.log(getRandomInt(0, 5));
}
