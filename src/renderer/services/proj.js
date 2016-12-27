import { remote } from 'electron'
const exec = remote.require('child_process').exec;
const spawn = remote.require('child_process').spawn;
import { saveNewFile, readFile} from './file'
import { resolvePath } from '../utils'

export const execCode = (opt, cmd) => {
  const options = {
    killSignal: 'SIGTERM',
    // env: 'development', // faild in statestr
    ...opt
  }
  // console.log(options)
  return new Promise((resolve, reject) => {
  	const ex = exec(cmd, options, (error, stdout, stderr) => {
		if (error) {
			reject(error)
		}
		if(stderr){
			reject(stderr)
		}
		  // console.log(stderr);
			resolve({
        stdout
      })
		});
  })
}

export const editWbpkFile = (folder, fromDir, toDir) => {
   console.log(folder, fromDir, toDir);
  // const APP_PATH = process.cwd();
  //
  // return readFile(resolvePath(APP_PATH , fromDir))
  // .then(wbpk => {
  //   let config = readFile(resolvePath(folder, 'config.json'))
  //   return {wbpk, config}
  // })
  // .then(({config, wbpk}) => {
  //   console.log(config)
  //   let baseConfig = JSON.parse(config)
  //   let newFoler = folder.replace(/\\/g, '/')
  //
  //   let user_path_entry = resolvePath(newFoler, baseConfig.entry).replace(/\\/g, '/')
  //   let user_path_vendor = resolvePath(newFoler, baseConfig.vendor).replace(/\\/g, '/')
  //   let user_path_output = resolvePath(newFoler, baseConfig.output).replace(/\\/g, '/')
  //
  //   wbpk = wbpk.replace(/user_path_entry/g, `'${user_path_entry}'`);
  //   wbpk = wbpk.replace(/user_path_vendor/g, `'${user_path_vendor}'`);
  //   wbpk = wbpk.replace(/user_path_output/g, `'${user_path_output}'`);
  //   // let newWpPath = resolvePath(APP_PATH, 'user.webpack.config.js');
  //   // return resolvePath(APP_PATH, 'user.webpack.config.js');
  //   return {newWpPath, wbpk}
  // })
  // .then(({newWpPath, wbpk}) => remote.require('fs').writeFile(newWpPath, wbpk, 'utf-8'))

}

// export const *editWbpkFile (folder, fromDir, toDir){
// function* editWbpkFile (folder, fromDir, toDir){
//   console.log(folder, fromDir, toDir);
//   const APP_PATH = process.cwd();
//   // let wbpk = yield call(readFile, resolvePath(APP_PATH, 'webpack/base.config.js'));
//   // let wbpk = yield readFile(resolvePath(APP_PATH, fromDir);
//   // let config = yield call(readFile, resolvePath(folder, 'config.json'));
//   let wbpk = yield readFile(resolvePath(APP_PATH , fromDir),
//     config = yield readFile(resolvePath(folder, 'config.json'),
//     baseConfig = JSON.parse(config),
//   newFoler = folder.replace(/\\/g, '/'),
//
//   user_path_entry = resolvePath(newFoler, baseConfig.entry).replace(/\\/g, '/'),
//   user_path_vendor = resolvePath(newFoler, baseConfig.vendor).replace(/\\/g, '/'),
//   user_path_output = resolvePath(newFoler, baseConfig.output).replace(/\\/g, '/'),
//
//   wbpk = wbpk.replace(/user_path_entry/g, `'${user_path_entry}'`),
//   wbpk = wbpk.replace(/user_path_vendor/g, `'${user_path_vendor}'`),
//   wbpk = wbpk.replace(/user_path_output/g, `'${user_path_output}'`),
//
//   newWpPath = resolvePath(APP_PATH, toDir),
//   remote.require('fs').writeFile(newWpPath, wbpk, 'utf-8'),
//
//   // return baseConfig
// }
//
// export editWbpkFile;


export const spwanCodeByPort = ( port ) => {

	return new Promise((resolve, reject) => {

	  const ls = spawn('lsof',['-nP', `-i:${port}`])
	  const grep = spawn('grep', ['LISTEN'])

	  ls.stdout.on('data', (data) => {
	    grep.stdin.write(data);
	  });

	  ls.stderr.on('data', (data) => {
	  		reject(data.toString())
	    console.log(`ps stderr: ${data}`);
	  });

	  ls.on('close', (code) => {
	    console.log('close ls')
	    if (code !== 0) {
	      console.log(`ps process exited with code ${code}`);
	    }
	    grep.stdin.end();
	  });

	  grep.stdout.on('data', (data) => {
	  	resolve(data.toString())
	    // console.log(`${data}`);
	    // console.log(data.toString().split(' '));
	    // xa.stdin.write(data);
	  });

	  grep.stderr.on('data', (data) => {
	  	reject(data.toString())
	    console.log(`grep stderr: ${data}`);
	  });

  });
}
