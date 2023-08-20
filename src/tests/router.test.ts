import { addEventListener } from '../router/routes';

describe('Click Tracking', () => {
  test('Clicking on an a tag will collect its information', () => {
    const data = addEventListener();
    document.body.innerHTML = '<a id="j" href="http://www.google.com/">Jest</a>';
    document.getElementById('j')?.click();
    expect(data).toEqual({
      'click.ID': 'j',
    });
  });
});
