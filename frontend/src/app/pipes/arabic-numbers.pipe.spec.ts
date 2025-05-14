import { ArabicNumbersPipe } from './arabic-numbers.pipe';

describe('ArabicNumbersPipe', () => {
  it('create an instance', () => {
    const pipe = new ArabicNumbersPipe();
    expect(pipe).toBeTruthy();
  });
});
