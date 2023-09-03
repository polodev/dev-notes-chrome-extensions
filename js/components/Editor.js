import React, { Component } from "react";
import AceEditor from "react-ace";


import "ace-builds/src-noconflict/mode-jsx";
const languages = [
  "markdown",
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css"
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];
const keyboardHandlers = [
  'vim',
  'emacs',
  'sublime',
  'vscode',
];
// import 'brace/keybinding/vim';

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});


themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));
keyboardHandlers.forEach(keyboardHandler => require(`ace-builds/src-noconflict/keybinding-${keyboardHandler}`));
/*eslint-disable no-alimport "ace-builds/src-noconflict/keybinding-vim"
ert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

export default class Editor extends Component {
  onLoad() {
    console.log("i've loaded");
  }
  onChange(newValue) {
    console.log("change", newValue);
    this.setState({
      value: newValue
    });
  }

  onSelectionChange(newValue, event) {
    console.log("select-change", newValue);
    console.log("select-change-event", event);
  }

  onCursorChange(newValue, event) {
    console.log("cursor-change", newValue);
    console.log("cursor-change-event", event);
  }

  onValidate(annotations) {
    console.log("onValidate", annotations);
  }

  setTheme(e) {
    this.setState({
      theme: e.target.value
    });
  }
  setKeyboardHandler(e) {
    this.setState({
      keyboardHandler: e.target.value
    });
  }
  setMode(e) {
    this.setState({
      mode: e.target.value
    });
  }
  setBoolean(name, value) {
    this.setState({
      [name]: value
    });
  }
  setFontSize(e) {
    this.setState({
      fontSize: parseInt(e.target.value, 10)
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      theme: "github",
      keyboardHandler: null,
      enableBasicAutocompletion: true,
      mode: "markdown",
      enableLiveAutocompletion: true,
      fontSize: 14,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: true
    };
    this.setTheme = this.setTheme.bind(this);
    this.setKeyboardHandler = this.setKeyboardHandler.bind(this);
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setFontSize = this.setFontSize.bind(this);
    this.setBoolean = this.setBoolean.bind(this);
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="field">
            <label>Mode:</label>
            <p className="control">
              <span className="select">
                <select
                  name="mode"
                  onChange={this.setMode}
                  value={this.state.mode}
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </span>
            </p>
          </div>

          <div className="field">
            <label>Theme:</label>
            <p className="control">
              <span className="select">
                <select
                  name="Theme"
                  onChange={this.setTheme}
                  value={this.state.theme}
                >
                  {themes.map(lang => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </span>
            </p>
          </div>
          <div className="field">
            <label>keyboard Handler:</label>
            <p className="control">
              <span className="select">
                <select
                  name="keyboardHandler"
                  onChange={this.setKeyboardHandler}
                  value={this.state.keyboardHandler}
                >
                  <option value={null}>Ace</option>
                  {keyboardHandlers.map(keyboardHandler => (
                    <option key={keyboardHandler} value={keyboardHandler}>
                      {keyboardHandler}
                    </option>
                  ))}
                </select>
              </span>
            </p>
          </div>

          <div className="field">
            <label>Font Size:</label>
            <p className="control">
              <span className="select">
                <select
                  name="Font Size"
                  onChange={this.setFontSize}
                  value={this.state.fontSize}
                >
                  {[14, 16, 18, 20, 24, 28, 32, 40].map(lang => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </span>
            </p>
          </div>



          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="enableBasicAutocompletion"
              checked={this.state.enableBasicAutocompletion}
              onChange={e =>
                this.setBoolean(
                  "enableBasicAutocompletion",
                  e.target.checked
                )
              }
              />
            <label className="form-check-label" for="enableBasicAutocompletion">
              Enable Basic Autocomplete
            </label>
          </div>
          
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="enableLiveAutocompletion"
              checked={this.state.enableLiveAutocompletion}
              onChange={e =>
                this.setBoolean(
                  "enableLiveAutocompletion",
                  e.target.checked
                )
              }
              />
            <label className="form-check-label" for="enableLiveAutocompletion">
              Enable Live Autocomplete
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="showGutter"
              checked={this.state.showGutter}
              onChange={e =>
                this.setBoolean("showGutter", e.target.checked)
              }
              />
            <label className="form-check-label" for="showGutter">
              Show Gutter
            </label>
          </div>
          
          
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="showPrintMargin"
              checked={this.state.showPrintMargin}
              onChange={e =>
                this.setBoolean("showPrintMargin", e.target.checked)
              }
              />
            <label className="form-check-label" for="showPrintMargin">
              Show Print Margin
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="highlightActiveLine"
              checked={this.state.highlightActiveLine}
              onChange={e =>
                this.setBoolean("highlightActiveLine", e.target.checked)
              }
              />
            <label className="form-check-label" for="highlightActiveLine">
              Highlight Active Line
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="enableSnippets"
              checked={this.state.enableSnippets}
              onChange={e =>
                this.setBoolean("enableSnippets", e.target.checked)
              }
              />
            <label className="form-check-label" for="enableSnippets">
            Enable Snippets
            </label>
          </div>


          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="showLineNumbers"
              checked={this.state.showLineNumbers}
              onChange={e =>
                this.setBoolean("showLineNumbers", e.target.checked)
              }
              />
            <label className="form-check-label" for="showLineNumbers">
              Show Line Numbers
            </label>
          </div>
        </div>
          
        <div className="col-md-8">
          <h2>Editor</h2>
          <AceEditor
            keyboardHandler={this.state.keyboardHandler}
            mode={this.state.mode}
            theme={this.state.theme}
            name="dev-notes-editor"
            onLoad={this.onLoad}
            onChange={this.onChange}
            onSelectionChange={this.onSelectionChange}
            onCursorChange={this.onCursorChange}
            onValidate={this.onValidate}
            value={this.state.value}
            fontSize={this.state.fontSize}
            showPrintMargin={this.state.showPrintMargin}
            showGutter={this.state.showGutter}
            highlightActiveLine={this.state.highlightActiveLine}
            setOptions={{
              useWorker: false,
              enableBasicAutocompletion: this.state.enableBasicAutocompletion,
              enableLiveAutocompletion: this.state.enableLiveAutocompletion,
              enableSnippets: this.state.enableSnippets,
              showLineNumbers: this.state.showLineNumbers,
              tabSize: 2
            }}
          />
        </div>
      </div>
    );
  }
}

// render(<App />, document.getElementById("example"));
