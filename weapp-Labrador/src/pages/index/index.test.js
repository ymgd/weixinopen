import assert from 'assert';

export async function onLoad(c, next) {
  next();
}

export async function handleViewTap(c, next) {
  next();
}

export function testTitle(c) {
  let newTitle = 'Labrador testing';
  c.setData('mottoTitle', newTitle);
  assert(c.data.motto.text === newTitle);
}

export async function testError(c) {
  assert(1 === 2);
}

export function justForTestInvalidExport() {
}
