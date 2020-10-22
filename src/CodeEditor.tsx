import React, { Component } from 'react';
import { EditorLanguageType } from 'types';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';

interface CodeEditorProps {
  language: EditorLanguageType;
  value: string | undefined;
  onChange: (value?: string) => void;
}

class CodeEditor extends Component<CodeEditorProps> {
  render() {
    return (
      <div
        style={{
          height: '33vh',
          overflow: 'scroll',
        }}
      >
        <Editor
          value={this.props.value ? this.props.value : ''}
          onValueChange={code => this.props.onChange(code)}
          highlight={code => highlight(code, languages[this.props.language || ''], this.props.language || '')}
          className="code-editor"
        />
      </div>
    );
  }
}

export { CodeEditor };
