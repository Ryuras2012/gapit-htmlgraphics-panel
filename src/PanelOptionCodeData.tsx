import React, { useState } from 'react';
import { StandardEditorProps } from '@grafana/data';
import { OptionsInterface, EditorLanguageType, EditorCodeType } from './types';
import { CodeEditor } from './CodeEditor';
import { Switch, Label } from '@grafana/ui';
import { SimpleOptions } from './SimpleOptions';

interface Settings {
  language: EditorLanguageType;
}

interface Props extends StandardEditorProps<OptionsInterface['codeData'] | undefined, Settings> {}

const PARSE_JSON = (json: string) => {
  if (json) {
    try {
      return JSON.parse(json);
    } catch (e) {
      console.error(`codeData:`, e);
      return {};
    }
  }
  return {};
};

const SimpleCodeData = ({ value, onChange }: { value: EditorCodeType; onChange: Props['onChange'] }) => {
  if (value) {
    const VALUE_CODE: { [key: string]: any } = PARSE_JSON(value);
    return (
      <div>
        <SimpleOptions
          dict={VALUE_CODE}
          newDict={VALUE_CODE}
          update={(value: { [key: string]: any }) => onChange(JSON.stringify(value, null, 2))}
        ></SimpleOptions>
      </div>
    );
  }
  return <></>;
};

export const PanelOptionCodeData: React.FC<Props> = ({ value, item, onChange }) => {
  const [advancedMode, setAdvancedMode] = useState(false);

  return (
    <div>
      <br />
      <Label description={'Show the json code editor'}>Advanced mode</Label>
      <Switch value={advancedMode} onChange={() => setAdvancedMode(!advancedMode)} css={{}}></Switch>
      <br />
      {advancedMode ? (
        <div
          style={{
            height: '33vh',
            overflow: 'scroll',
          }}
        >
          <CodeEditor value={value} language={item.settings?.language} onChange={onChange}></CodeEditor>
        </div>
      ) : (
        <SimpleCodeData value={value} onChange={onChange} />
      )}
    </div>
  );
};
