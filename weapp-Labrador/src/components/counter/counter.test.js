export function handleTap(c, run) {
  let num = c.data.num;
  run();
  let step = c.data.num - num;
  if (step !== 1) {
    throw new Error('计数器点击一次应该自增1，但是自增了' + step);
  }
}
