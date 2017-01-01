import ReactDOM from 'react-dom'
import { remote, ipcRenderer } from 'electron'
import { mapToMode, getFileName, formatFile, resolvePath, addFileID, coverTree } from '../utils'
import { saveNewFile, readFile} from '../services/file'
import { filterTree, expandFilteredNodes} from '../services/filter'
const dir = remote.require('node-dir')


const baseTab = () => ({
  title: 'undefined',
  path: __dirname,
  mode: 'jsx',
  contents: '',
})

let originTree = []

export default {

  namespace: 'files',

  state: {
    current: 0,
    treeList: [],
    folder: '',
    pathDir: '',
    tabs: [baseTab()]
  },

  subscriptions: {
    setup({ dispatch }) {
      ipcRenderer
        .on('winNewFile', (event) => {

          const tab = baseTab();

          dispatch({
            type: 'addFile',
            payload: {...tab}
          });
        })
        .on('winOpenFile', (event, data) => {
          const {ext, base} = data.file;
          const extension = ext.slice(1);
          const mode = mapToMode(extension)


          dispatch({
            type: 'addFile',
            payload: {
              path: data.path,
              contents: data.contents,
              mode,
              title: base,
            }
          });
        })
        .on('winOpenFolder', (event, data) => {
          // const treeList = formatFile(data);
          const formatData = formatFile(data);
          const treeList = addFileID(formatData, 0)
          originTree = treeList;
          console.log(treeList)

          // Promise.all([System.import('chokidar'), System.import('node-dir')])
          


          dispatch({
            type: 'changeStatus',
            payload: {
              pathDir: data.pathDir,
              folder: data.folder,
              treeList
            }
          });
        })
        .on('winSaveFile', function () {
            dispatch({
              type: 'saveFile',
            });
        })
        .on('winCloseFile', function () {

            dispatch({
              type: 'closeFile',
              payload: {}
            });
        })

    },
  },

  effects: {
    *addFile({ payload: { path, contents, mode, title} }, {put, call, select }){

      const { tabs, treeList } = yield select(state => state.files);
      let current = 0;

      const tab = {
        title,
        path,
        mode,
        contents,
      };

      const item = tabs.filter(i => i.path == path);
      tabs.filter((it, i) => {
        if(it.path == path){
          current = i;
          return true;
        }
        return false;
      });

      if(!item.length || path == __dirname){
        tabs.push(tab);
        current = tabs.length - 1;
      }

      yield put({
        type: 'changeStatus',
        payload: { tabs, current}
      });

    },

    *saveFile({}, {put, call, select }){

      const {current, tabs} = yield select(state => state.files);
      let tab = tabs[current];

      if(tab.path != '/'){

        remote.require('fs').writeFile(tab.path, tab.contents, 'utf-8');

      }else{

        const filepath = yield saveNewFile(tab.contents);
        const title = getFileName(filepath)

        yield put({
          type: 'changeFile',
          payload: { current, file: { path: filepath, title} }
        });

      }
    },

    *openFile({ payload: { path } }, {put, call, select }){

      const contents = yield call(readFile, path);
      const spl = path.lastIndexOf('.')
      const mode = mapToMode(path.slice(spl + 1))
      const title = getFileName(path)

      yield put({
        type: 'addFile',
        payload: {
            path,
            contents,
            mode,
            title
          }
      });
    },

    *showResult({}, {put, call, select}){
      const { contents, mount } = yield select(state => state.editor);

      const str = 'ReactDOM.render(<h1>Hello, world!!</h1>, mountNode)';
      const code = transformCode(str)
      (new Function('ReactDOM', 'React', 'mountNode', code))(ReactDOM, React, mount);
      
      yield put({
        type: 'changeStatus',
        payload: {
            showResult: true,
            results: code
          }
      });
    },

    *closeFile({ payload: { current } }, {put, call, select }){
      const files = yield select(state => state.files);
      const cur = current != null ? current : files.current;

      const tabs = files.tabs.filter((it, i) => i != cur);
      const newCur = cur == 0 ? 0 : cur - 1;
      yield put({
        type: 'changeStatus',
        payload: {
          tabs,
          current: newCur
        }
      })
    },

    *toggledTree({ payload: { node } }, {put, call, select }){
        // console.log(node)
        coverTree(node, originTree, (node, newNode) => node.id == newNode.id )
        console.log(originTree)
    }

  },

  reducers: {
    changeStatus(state, action){
      return { ...state, ...action.payload};
    },
    changeFile(state, action){
      const { current, file} = action.payload
      let tabs = Object.assign([], state.tabs);
      const tab = {...tabs[current], ...file};
      tabs[current] = tab;

      return {...state, tabs};

    },
  },

};
