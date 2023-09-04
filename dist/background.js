chrome.runtime.onInstalled.addListener(function() {
  // Initialize storage when the extension is installed or updated
  chrome.storage.sync.set({ settings: {
    value: '',
    theme: "github",
    keyboardHandler: '',
    enableBasicAutocompletion: true,
    mode: "markdown",
    enableLiveAutocompletion: true,
    fontSize: 14,
    showGutter: true,
    showPrintMargin: true,
    highlightActiveLine: true,
    enableSnippets: true,
    showLineNumbers: true,
    editorWidth: 1250,
    editorHeight: 550,
  }});
});
