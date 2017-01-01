import { remote } from 'electron'
import { mapToMode, getFileName, formatFile, resolvePath } from '../utils'
import { saveNewFile, readFile} from '../services/file'
import { execCode, editWbpkFile } from '../services/proj'
import del from 'del'

const APP_PATH = process.cwd()
const exec = remote.require('child_process').exec;

export default {

  namespace: 'proj',

  state: {
    start: false,
    build: false,
    err: '',
    config:{
      "port": 3001,
      "entry": "src/index.js",
      "vendor": "src/vendor.js",
      "output":"dist"
    },
    user_path_entry: '',
    user_path_vendor: '',
    user_path_output: '',
  },

  effects: {
    *startProj({ }, {put, call, select }){
      const { folder} = yield select(state => state.files);

      // const baseConfig = yield call(editWbpkFile, folder, 'webpack/base.config.js', 'user.webpack.config.js')

      let wbpk = yield call(readFile, resolvePath(APP_PATH, 'webpack/base.config.js'));
      let config = yield call(readFile, resolvePath(folder, 'config.json'));

      let baseConfig = JSON.parse(config)
      let newFoler = folder.replace(/\\/g, '/')

      let user_path_entry = resolvePath(newFoler, baseConfig.entry).replace(/\\/g, '/')
      let user_path_vendor = resolvePath(newFoler, baseConfig.vendor).replace(/\\/g, '/')
      let user_path_output = resolvePath(newFoler, baseConfig.output).replace(/\\/g, '/')

      wbpk = wbpk.replace(/user_path_entry/g, `'${user_path_entry}'`);
      wbpk = wbpk.replace(/user_path_vendor/g, `'${user_path_vendor}'`);
      wbpk = wbpk.replace(/user_path_output/g, `'${user_path_output}'`);

      let newWpPath = resolvePath(APP_PATH, 'user.webpack.config.js');
      remote.require('fs').writeFile(newWpPath, wbpk, 'utf-8');

      yield put({
        type: 'changeStatus',
        payload: {
            start: true,
            config: baseConfig,
            user_path_entry,
            user_path_vendor,
            user_path_output
          }
      });

      try{

        // start server to listen
        // yield call(execCode, `node server.js --port ${baseConfig.port} --config ./user.webpack.config.js`);
        yield call(execCode, {env: 'development' }, `node server-user.js --port ${baseConfig.port}`);

        }catch (err){
          console.log(err)

          yield put({
            type: 'changeStatus',
            payload: {
                start: false,
                err: err.toString()
              }
          });
        }
    },

    *stopProj({ }, {put, call, select }){
      const { config } = yield select(state => state.proj)

      fetch(`http://localhost:${config.port}/stopProj`)

      yield put({
        type: 'changeStatus',
        payload: {
            start: false,
          }
      });

    },

    *buildProj({ }, {put, call, select }){
      const { start } = yield select(state => state.proj)

      let wbpk = yield call(readFile, resolvePath(APP_PATH, 'webpack/base.config.prod.js'));
      let a, b, c ;

      if(start){
        yield put({
          type: 'stopProj',
          payload: {}
        });

        const { config, user_path_entry, user_path_vendor, user_path_output } = yield select(state => state.proj)
        a = user_path_entry
        b = user_path_vendor
        c = user_path_output

      }else{
        const { folder} = yield select(state => state.files);
        let config = yield call(readFile, resolvePath(folder, 'config.json'));

        let baseConfig = JSON.parse(config)
        let newFoler = folder.replace(/\\/g, '/')

        a = resolvePath(newFoler, baseConfig.entry).replace(/\\/g, '/')
        b = resolvePath(newFoler, baseConfig.vendor).replace(/\\/g, '/')
        c = resolvePath(newFoler, baseConfig.output).replace(/\\/g, '/')

      }

      wbpk = wbpk.replace(/user_path_entry/g, `'${a}'`);
      wbpk = wbpk.replace(/user_path_vendor/g, `'${b}'`);
      wbpk = wbpk.replace(/user_path_output/g, `'${c}'`);

      let newWpPath = resolvePath(APP_PATH, 'user.webpack.config.prod.js');
      remote.require('fs').writeFile(newWpPath, wbpk, 'utf-8');

      yield del.sync([c + '/**'], {
        force: true
      })

      yield call(execCode, {}, `npm run build-user`);


    }
  },

  reducers: {
    changeStatus(state, action){
      return { ...state, ...action.payload};
    },
  },

};

