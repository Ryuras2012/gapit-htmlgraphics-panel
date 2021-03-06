import { PanelPlugin } from '@grafana/data';
import { OptionsInterface } from './types';
import { HTMLPanel } from './HTMLPanel';
import { PanelOptionCodeData } from 'PanelOptionCodeData';
import { PanelOptionCode } from 'PanelOptionCode';

export const plugin = new PanelPlugin<OptionsInterface>(HTMLPanel).setPanelOptions(builder => {
  return builder
    .addBooleanSwitch({
      path: 'add100Percentage',
      name: 'Fit content to panel',
      description: `
        Adds 100% height and width attribute to the document.
      `,
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'centerAlignContent',
      name: 'Center align content',
      description: `
        Vertically and horizontally aligns the content to the center.
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
      name: 'Custom properties',
      description: 'This is the customProperties (codeData), which can be accessed by onInit and onRender',
      editor: PanelOptionCodeData,
      category: ['Custom properties'],
      defaultValue: '{\n  "text": "Random text"\n}',
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
      defaultValue:
        '* {\n  font-family: Open Sans;\n}\n\n.box {\n  border: solid #555 2px;\n  border-radius: 10px;\n  padding: 10px 20px;\n}\n',
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
      defaultValue:
        '<div style="text-align: center;">\n  <div class="box" id="htmlgraphics-text"></div>\n  <br />\n  <div class="box" id="htmlgraphics-value"></div>\n</div>\n',
      settings: {
        language: 'html',
      },
    })
    .addCustomEditor({
      id: 'onRender',
      path: 'onRender',
      name: 'onRender',
      description: `On render code is executed whenever new data is available (htmlNode, customProperties/codeData, data, options, theme, getTemplateSrv, getLocationSrv)`,
      editor: PanelOptionCode,
      defaultValue:
        "// Sets the value from the first series on every refresh\nhtmlNode.getElementById('htmlgraphics-value').textContent = data.series[0].fields[1].state.calcs.last\n",
      settings: {
        language: 'javascript',
      },
    })
    .addCustomEditor({
      id: 'onInit',
      path: 'onInit',
      name: 'onInit',
      description:
        'On int code is executed when the panel loads (htmlNode, customProperties/codeData, data, options, theme, getTemplateSrv, getLocationSrv)',
      editor: PanelOptionCode,
      defaultValue:
        "// Sets the text from customProperties\nconst htmlgraphicsText = htmlNode.getElementById('htmlgraphics-text');\nhtmlgraphicsText.textContent = customProperties.text;\n\n// Change the text color based on the theme\nif (theme.isDark) {\n  htmlgraphicsText.style.color = 'green';\n} else {\n  htmlgraphicsText.style.color = 'red';\n}\n",
      settings: {
        language: 'javascript',
      },
    });
});
