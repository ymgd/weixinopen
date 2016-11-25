import assert from 'assert';

export async function onLoad(c, run) {
  await run();
  assert(c.data.items[0].title === 'Collie');
}
