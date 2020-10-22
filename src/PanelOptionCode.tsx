import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { CodeEditor } from './CodeEditor';
import { EditorLanguageType, EditorCodeType } from 'types';

interface Settings {
  language: EditorLanguageType;
}

interface Props extends StandardEditorProps<EditorCodeType, Settings> {}

export const PanelOptionCode: React.FC<Props> = ({ value, item, onChange }) => {
  return (
    <div
      style={{
        height: '33vh',
        overflow: 'scroll',
      }}
    >
      <CodeEditor value={value} language={item.settings?.language} onChange={onChange}></CodeEditor>
    </div>
  );
};
