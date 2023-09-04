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
  "sql",
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
  updateSettings() {
    const settings = {
      theme: this.state.theme,
      keyboardHandler: this.state.keyboardHandler,
      enableBasicAutocompletion: this.state.enableBasicAutocompletion,
      mode: this.state.mode,
      enableLiveAutocompletion: this.state.enableLiveAutocompletion,
      fontSize: this.state.fontSize,
      showGutter: this.state.showGutter,
      showPrintMargin: this.state.showPrintMargin,
      highlightActiveLine: this.state.highlightActiveLine,
      enableSnippets: this.state.enableSnippets,
      showLineNumbers: this.state.showLineNumbers,
      editorWidth: this.state.editorWidth,
      editorHeight: this.state.editorHeight,
    }
    chrome.storage.sync.set({ settings });
  }
  componentDidMount() {
    chrome.storage.sync.get("settings", (result) => {
      const settings = result.settings || {
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
        showLineNumbers: true,
        editorWidth: 800,
        editorHeight: 600,
      };
      this.setState(settings);

      const notes = result.notes || [];
      this.setState({notes});

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
    }, this.updateSettings);
  }
  setKeyboardHandler(e) {
    this.setState({
      keyboardHandler: e.target.value
    }, this.updateSettings);
  }
  setMode(e) {
    this.setState({
      mode: e.target.value
    }, this.updateSettings);
  }
  setBoolean(name, value) {
    this.setState({
      [name]: value
    }, this.updateSettings);
  }
  setFontSize(e) {
    this.setState({
      fontSize: parseInt(e.target.value, 10)
    }, this.updateSettings);
  }
  setEditorWidth(e) {
    this.setState({
      editorWidth: parseInt(e.target.value, 10)
    }, this.updateSettings);
  }
  setEditorHeight(e) {
    this.setState({
      editorHeight: parseInt(e.target.value, 10)
    }, this.updateSettings);
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
      showLineNumbers: true,
      editorWidth: 800,
      editorHeight: 600,
    };
    this.setTheme = this.setTheme.bind(this);
    this.setKeyboardHandler = this.setKeyboardHandler.bind(this);
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setFontSize = this.setFontSize.bind(this);
    this.setBoolean = this.setBoolean.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.setEditorHeight = this.setEditorHeight.bind(this);
    this.setEditorWidth = this.setEditorWidth.bind(this);
  }
  render() {
    return (
      <div className="editor-wrapper">
        <div className="offcanvas offcanvas-start" tabindex="-1" id="editorSettingToggle" aria-labelledby="editorSettingToggleLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Settings</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <div className="field">
              <label>Mode:</label>
              <p className="control">
                <span className="select">
                  <select
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
                    onChange={this.setKeyboardHandler}
                    value={this.state.keyboardHandler}
                  >
                    <option value="ace">Ace</option>
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
                    className="form-control"
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
              <label className="form-check-label" htmlFor="enableBasicAutocompletion">
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
              <label className="form-check-label" htmlFor="enableLiveAutocompletion">
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
              <label className="form-check-label" htmlFor="showGutter">
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
              <label className="form-check-label" htmlFor="showPrintMargin">
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
              <label className="form-check-label" htmlFor="highlightActiveLine">
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
              <label className="form-check-label" htmlFor="enableSnippets">
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
              <label className="form-check-label" htmlFor="showLineNumbers">
                Show Line Numbers
              </label>
            </div>
            <div className="mt-2">
              <label htmlFor="editorWidth">Width</label>
              <input
                type="number"
                name="editorWidth"
                id="editorWidth"
                onChange={this.setEditorWidth}
                value={this.state.editorWidth}
                className="form-control" />
            </div>
            <div className="mt-2">
              <label htmlFor="editorHeight">Height</label>
              <input
                type="number"
                name="editorHeight"
                id="editorHeight"
                onChange={this.setEditorHeight}
                value={this.state.editorHeight}
                className="form-control" />
            </div>
          
          </div>
        </div>

        <div className="row">
          <div className="col-md-9">
            <button className="btn btn-primary my-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#editorSettingToggle" aria-controls="editorSettingToggle">
              Settings <svg width={25} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </button>
            <AceEditor
              keyboardHandler={this.state.keyboardHandler}
              style={{width: this.state.editorWidth, height: this.state.editorHeight}}
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
          <div className="col-md-3"></div> {/* end col-md-3 */}
        </div>
      </div>
    );
  }
}

// render(<App />, document.getElementById("example"));
