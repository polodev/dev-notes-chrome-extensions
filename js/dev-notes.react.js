import { createRoot } from 'react-dom/client';
import App from './components/App.js';
import Editor from './components/Editor.js';
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);
