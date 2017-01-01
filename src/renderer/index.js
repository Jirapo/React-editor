import dva from 'dva';
import RouterConfig from './router';
import files from './models/files'
import editor from './models/editor'
import cns from './models/cns'
import proj from './models/proj'

// 1. Initialize
const app = dva();

// 2. Plugins

// 3. Model

app.model(files);
app.model(editor);
app.model(cns);
app.model(proj);

// 4. Router
// app.router(require('./router'));
app.router(RouterConfig);

// 5. Start
app.start('#root');
