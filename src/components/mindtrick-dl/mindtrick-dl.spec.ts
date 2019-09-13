import { TestWindow } from '@stencil/core/testing';
import { MindtrickDl } from './mindtrick-dl';

describe('mindtrick-dl', () => {
  it('should build', () => {
    expect(new MindtrickDl()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMindtrickDlElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MindtrickDl],
        html: '<mindtrick-dl></mindtrick-dl>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
