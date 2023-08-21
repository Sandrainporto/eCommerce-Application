import { createElement } from '../utils/elementCreator';

describe('createElement', () => {
  it('should create a new element with entered parameters and append it to the root element', () => {
    const rootElement = document.createElement('div');

    const params = {
      elemTag: 'div',
      classNames: ['createElement-function', 'test'],
      id: 'elementId',
      innerText: 'Hello, this is my first test here!',
      listenerType: 'click',
    };

    const createdElement = createElement(params, rootElement);

    expect(createdElement.tagName).toBe('DIV');
    expect(createdElement.classList.contains('createElement-function')).toBe(true);
    expect(createdElement.classList.contains('test')).toBe(true);
    expect(createdElement.id).toBe('elementId');
    expect(createdElement.innerText).toBe('Hello, this is my first test here!');

    expect(rootElement.children.length).toBe(1);
    expect(rootElement.children[0]).toBe(createdElement);
  });
});

describe('createElement', () => {
  it('should add a click as eventListenerType when listenerType is not provided or skipped but has a callback function', () => {
    const rootElement = document.createElement('div');

    const params = {
      elemTag: 'div',
    };

    const callback = jest.fn();

    const createdElement = createElement(params, rootElement, callback);

    const clickEvent = new Event('click');
    createdElement.dispatchEvent(clickEvent);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('createElement', () => {
  it("shouldn't add a click as eventListenerType when listenerType and callback are defined", () => {
    const rootElement = document.createElement('div');

    const params = {
      elemTag: 'div',
      listenerType: 'mouseover',
    };

    const callback = jest.fn();

    const createdElement = createElement(params, rootElement, callback);

    const clickEvent = new Event('click');
    createdElement.dispatchEvent(clickEvent);

    expect(callback).not.toHaveBeenCalled();
  });
});
