import ReactDOM from 'react-dom'
import { remote, ipcRenderer } from 'electron'
import { mapToMode, getFileName, formatFile, resolvePath } from '../utils'
import { saveNewFile, readFile} from '../services/file'


const baseTab = () => ({
  title: 'undefined',
  path: __dirname,
  mode: 'jsx',
  contents: '',
})

export default {

  namespace: 'files',

  state: {
    current: 0,
    treeList: [],
    folder: '',
    pathDir: '',
    // openFolder: false,
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

          // const list = {
          //   name: base,
          //   active: true,
          //   path: data.path
          // };

          dispatch({
            type: 'addFile',
            payload: {
              // sep: data.sep,
              // isReactProj: false,
              path: data.path,
              contents: data.contents,
              mode,
              title: base,
              // list
            }
          });
        })
        .on('winOpenFolder', (event, data) => {
          // console.log(data)
          // const pathDir = data.pathDir
          const treeList = formatFile(data)

          dispatch({
            type: 'changeStatus',
            payload: {
              // path: data.folder,
              // contents: '',
              // mode: 'jsx',
              // sep,
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
        // isNew: false,
        title,
        path,
        mode,
        contents,
      };

      // if(tabs.length == 1 && tabs[0].isNew){
      //   tabs[0] = tab;
      //   treeList.push(list);
      //   current = 0;
      // }else{
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
        /*
        if(item.length && path != __dirname){

          // treeList.map((it, i) => {
          //   it.active = it.path == path ? true : false;
          //   if(it.path == path){
          //     it.active = true;
          //     current = i;
          //   }else{
          //     it.active = false;
          //   }
          //   return it;
          // })
        }else{
          tabs.push(tab);
          // treeList.map( it => it.active = false)
          // treeList.push(list)
          current = treeList.length - 1;
        }*/

      // }

      // console.log(treeList)

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
        // console.log(filepath)
        // console.log(pathBrow.parse(filepath))
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
      // const { code, map, ast} = transform(contents)

      const c = 'ReactDOM.render(<h1>Hello, world!!</h1>, mountNode)';
      // const { code, map, ast} = yield transformCode(c.trim(), {
      //   presets: ["es2015", "react", "stage-0"]
      // });
      const code = transformCode(c)
      (new Function('ReactDOM', 'React', 'mountNode', code))(ReactDOM, React, mount);
      // remote.getGlobal('services').file.transformCode(contents)
      // const { code, map, ast} = babel.transform(contents)
      // const { code, map, ast} = yield remote.getGlobal('services').file.transformFile(path)
      // console.log(code, map, ast)
      // console.log(ast.getComments())
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
    // closeFile(state, action){
    //   const { current } = action.payload;
    //   const tabs = state.tabs.filter((it, i) => i != current);
    //   let cur = current == 0 ? 0 : current - 1;

    //   return {...state, tabs, current: cur};
    // }
    // changeTheme(state, action){
    //   return { ...state, ...action.payload};
    // },
    // changeFile(state, action){
    //   return { ...state, ...action.payload};
    // }
  },

};
