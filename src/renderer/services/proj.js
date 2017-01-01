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
	  });

	  grep.stderr.on('data', (data) => {
	  	reject(data.toString())
	    console.log(`grep stderr: ${data}`);
	  });

  });
}
