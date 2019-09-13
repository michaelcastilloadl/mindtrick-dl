import { TestWindow } from '@stencil/core/testing';
import { Mindtrick } from './mindtrick';

describe('mindtrick', () => {
  it('should build', () => {
    expect(new Mindtrick()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMindtrickElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Mindtrick],
        html: '<mindtrick></mindtrick>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
