import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { enzymeFind } from 'styled-components/test-utils';
import { Connected } from '../Container';
import store from './test.store';
import { OptionButton } from '../Header/header';
import Core from '../Core';
import Tester, { waitAndUpdate } from './tester';

configure({
  adapter: new Adapter(),
});

describe('Communicator', () => {
  let wrapper;
  let channels;
  beforeAll(async () => {
    const tester = new Tester(store);
    await tester.waitForSocket();
    channels = await tester.handleActiveChannel();

    wrapper = mount(
      <Provider store={store}>
        <Connected />
      </Provider>,
    );
  });
  beforeEach(async () => {
    await waitAndUpdate(1000, wrapper);
  });

  describe('Header', () => {
    it.only('Shrinked/expanded', async () => {
      await waitAndUpdate(1000, wrapper);
      const option = enzymeFind(wrapper, OptionButton);
      option.first().simulate('click');
      expect(wrapper.exists('.CoreWrapper.shrinked')).toBe(true);
    });
  });

  describe('Footer', () => {
    it('Sending message', async () => {
      const input = wrapper.find('textarea.input');
      const value = 'Hello';
      input.simulate('change', { target: { value } });
      wrapper.find('.send[title="Send message"]').simulate('click');
      const { messages } = wrapper.find(Core).state();
      const includes = messages.some(msg => msg.content.toString() === value);

      expect(includes).toBe(true);
    });

    it('Greeting action', async () => {
      wrapper.find('.send[title="Greeting"]').simulate('click');
      const { message } = wrapper.find(Core).state();
      const pass = message.includes('Czesc');
      expect(pass).toBe(true);

      wrapper.find('.send[title="Send message"]').simulate('click');

      const { messages } = wrapper.find(Core).state();
      const includes = messages.some(msg => msg.content.toString().includes('Czesc'));
      expect(includes).toBe(true);
    });
  });

  describe('Default messages', () => {
    it('Toggle', async () => {
      const exists = wrapper.exists('[title="Default messages"]');

      wrapper
        .find('button.send[title="Show default messages"]')
        .simulate('click');
      await waitAndUpdate(1000, wrapper);
      expect(wrapper.exists('ul[title="Default messages"]')).toBe(!exists);
    });

    it('Search action', async () => {
      const defaultMessages = wrapper.exists('[title="Default messages"]');
      if (!defaultMessages) {
        wrapper.find('.send[title="Show default messages"]').simulate('click');
        await waitAndUpdate(1000, wrapper);
      }


      const input = wrapper.find('.window .search input');
      input.simulate('change', { target: { value: 'Hello' } });
      const results = [];
      const isHello = elem => results.push(elem.text().includes('Hello'));
      wrapper.find('ul button.message').forEach(isHello);
      expect(results.every(elem => elem === true)).toBe(true);
    });

    it('Select message', async () => {
      const defaultMessages = wrapper.exists('[title="Default messages"]');
      if (!defaultMessages) {
        wrapper.find('.send[title="Show default messages"]').simulate('click');
        await waitAndUpdate(1000, wrapper);
      }

      const button = wrapper
        .find('ul[title="Default messages"] button.message')
        .first();
      const text = button.text();
      button.simulate('click');
      const { message } = wrapper.find(Core).state();
      expect(message).toBe(text);
    });
  });
  /**
   * @todo
   * check
   */
  describe('Archive messsages', () => {
    it('Toggle', async () => {
      const exists = wrapper.exists('.window .archive');
      wrapper.find('.send[title="Archive"]').simulate('click');
      await waitAndUpdate(1000, wrapper);
      expect(wrapper.exists('.window .archive')).toBe(!exists);
    });


    it.skip('List of archived messages', async () => {
      [1, 2, 3].forEach(() => {
        wrapper.find('.send[title="Greeting"]').simulate('click');
        wrapper.find('.send[title="Send message"]').simulate('click');
      });
      wrapper.find('.send[title="Archive"]').simulate('click');
      await waitAndUpdate(1000, wrapper);
      expect(wrapper.exists('.window .archive ul li.wrapper')).toBe(true);
    });

    it.skip('Toggle (expand/shrink) the list of archived messages', async () => {
      [1, 2, 3].forEach(() => {
        wrapper.find('.send[title="Greeting"]').simulate('click');
        wrapper.find('.send[title="Send message"]').simulate('click');
      });
      wrapper.find('.send[title="Archive"]').simulate('click');
      await waitAndUpdate(1000, wrapper);
      wrapper
        .find('.window .archive ul li.wrapper')
        .first()
        .find('div[role="button"]')
        .simulate('click');
      await waitAndUpdate(1000, wrapper);
      expect(wrapper.exists('.window .archive ul li.wrapper .messages')).toBe(
        true,
      );
    });
  });


  describe('Consultants', () => {
    it('Toggle:enable', async () => {
      const exists = wrapper.exists('.window.expanded .consultants');
      wrapper.find('.send[title="Consultant chat"]').simulate('click');
      await waitAndUpdate(1000, wrapper);
      expect(wrapper.exists('.window.expanded .consultants')).toBe(!exists);
    });

    it.skip('Toggle:disable', async () => {
      wrapper.find('.send[title="Consultant chat"]').simulate('click');
      await waitAndUpdate(1000, wrapper);
      wrapper.find('.send[title="Consultant chat"]').simulate('click');
      expect(wrapper.exists('.window.expanded .consultants')).toBe(false);
    });
    it.skip('Active consultant in chat window', async () => {
      wrapper.find('.send[title="Consultant chat"]').simulate('click');
      await waitAndUpdate(1000, wrapper);
      const consultantSelector = '.window .consultants .block.right .consultant';
      const firstConsultant = wrapper.find(consultantSelector).first();
      firstConsultant.find('button').simulate('click');
      const activated = wrapper.find(consultantSelector).first().find('button').hasClass('active');

      expect(activated).toBe(true);
      firstConsultant.find('button').simulate('click');
      const disabled = wrapper.find(consultantSelector).first().find('button').hasClass('active');
      expect(disabled).toBe(false);
    });
  });
});
