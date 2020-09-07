import { PanelPlugin } from '@grafana/data';
import { OptionsInterface } from './types';
import { HTMLPanel } from './HTMLPanel';
import { PanelOptionCodeData } from 'PanelOptionCodeData';
import { PanelOptionCode } from 'PanelOptionCode';

export const plugin = new PanelPlugin<OptionsInterface>(HTMLPanel).setPanelOptions(builder => {
  return builder
    .addBooleanSwitch({
      path: 'add100Percentage',
      name: 'Add 100%',
      description: `
        This is mostly for SVG, as it will scale the content based on the size of the panel.
        Adds 100% height and width attribute to the document.
      `,
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'centerAlignContent',
      name: 'Center align content',
      description: `
        Vertically and horizontally aligns the panel content to the center.
        Adds "display: flex; justify-content: center; align-items: center" to the shadow root container.
      `,
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'SVGBaseFix',
      name: 'SVG base fix',
      description: 'Fixes an issue in Firefox where xlink:href needs the url to be able to find the link',
      defaultValue: true,
      category: ['Polyfill'],
    })
    .addCustomEditor({
      id: 'codeData',
      path: 'codeData',
      name: 'Code data',
      description: 'This is the codeData, which can be accessed by onInit and onRender',
      editor: PanelOptionCodeData,
      category: ['Code data'],
      defaultValue: '{"randomKey": "randomValue"}',
      settings: {
        language: 'json',
      },
    })
    .addCustomEditor({
      id: 'css',
      path: 'css',
      name: 'CSS',
      description: '',
      editor: PanelOptionCode,
      category: ['CSS'],
      settings: {
        language: 'css',
      },
    })
    .addCustomEditor({
      id: 'html',
      path: 'html',
      name: 'HTML/SVG document',
      description: `
        This is the htmlNode (can be HTML or SVG).
        It is recommended to write your code in an editor and paste the code here.
        This is to keep a copy of the code and not lose your work if the browser crashes.
      `,
      editor: PanelOptionCode,
      category: ['HTML/SVG'],
      settings: {
        language: 'html',
      },
    })
    .addCustomEditor({
      id: 'onRender',
      path: 'onRender',
      name: 'onRender',
      description: `On render code is executed whenever new data is available (htmlNode, codeData, data, options, theme)`,
      editor: PanelOptionCode,
      category: ['On render  JS'],
      settings: {
        language: 'javascript',
      },
    })
    .addCustomEditor({
      id: 'onInit',
      path: 'onInit',
      name: 'onInit',
      description: 'On int code is executed when the panel loads (htmlNode, codeData, data, options, theme)',
      editor: PanelOptionCode,
      category: ['On init JS'],
      settings: {
        language: 'javascript',
      },
    });
});
