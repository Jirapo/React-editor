import { remote } from 'electron'
// const transform = remote.require('babel-core').transform
import { transform } from 'babel-standalone'
// import path from 'path'
const path = remote.require('path')


export const mapToMode = (ext) => {

	const str = ext.toLowerCase();

	if(['jsx'].indexOf(str) != -1) return 'jsx';
	if(['js'].indexOf(str) != -1) return 'javascript';
	if(['java'].indexOf(str) != -1) return 'java';
	if(['xml'].indexOf(str) != -1) return 'xml';
	if(['html', 'ejs', 'htm'].indexOf(str) != -1) return 'html';
	if(['py'].indexOf(str) != -1) return 'python';
	if(['css', 'less', 'sass', 'scss', 'styl'].indexOf(str) != -1) return 'css';

	return 'markdown';

}


// export const getFileName = (path, sep) => {
export const getFileName = (dir) => {
	return path.parse(dir).base
  // if(sep){
	//  return path.slice(path.lastIndexOf(sep) + sep.length);
  // }else{
  //   return path.slice(path.lastIndexOf('/') + 1);
  // }
}


export const formatFile = ({list, dirs, sep, folder}) => {
  const sepLen = sep.length
  const a = list.map(i => i.slice(folder.length + sepLen))
  const b = dirs.map(i => i.slice(folder.length + sepLen))

  let d = [], e = Array.from({length: b.length}, i => []);

  let files = {
    active: true,
    children: [],
    toggled: true,
    name: getFileName(folder, sep)
  }

  function inter(p, obj, sp, file){
    const arr = p.split(sep)
    const name = arr[0]

    if(arr.length > 1){
      const k = obj.filter(o => o.name == name)
      inter(p.slice(name.length + sepLen), k[0].children, sp, file)
    }else{
      const k = obj.filter(o => o.name == name)

      if(k.length == 0 ){
        obj.push({
          name: name,
          active: false,
          children: file
        })
        obj.sort((a, b) => a.name.localeCompare(b.name))
      }

      return obj
    }

    // if(arr.length > 1){
    //   inter(p.slice(name.length + sepLen), o[name], sp, file)
    // }else{
    //   o[name] = {path: sp, children: file}
    //   return o
    // }
  }


  list.forEach((l, i) => {

    const index = a[i].lastIndexOf(sep)

    if(index == -1){
      files.children.push({
        name: a[i],
        active: false,
        path: l
      })

    }else{
      dirs.forEach((d, j) => {

        const str = l.slice(0, l.lastIndexOf(sep))

        if(str === d){
          e[j].push({
            name: getFileName(l, sep),
            path: l,
            active: false
          })
        }
      })
    }

  })

  b.forEach((i, j) => inter(i, d, i, e[j]))


  files.children = [...files.children, ...d].sort((a, b) => a.name.localeCompare(b.name))

  return files

}

export const transformCode = (contents) => {
  try{
      const { code } = transform(contents.trim(), {
        presets: ['es2015', 'react', 'stage-0'],
        compact: true,
        // shouldPrintComment: (cm) => {
        //   console.log(cm)
        // }
      });

      return { code }

  }catch(err){
    // console.log(err)

    return { err: err.toString() }
  }

}

export const resolvePath = (root, dir) => path.resolve(root, dir)
