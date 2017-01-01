import { remote } from 'electron'
import { transform } from 'babel-standalone'
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

export const getFileName = (dir) => {
	return path.parse(dir).base
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

export const addFileID = (node, i) => {
  let children = node.children
  if(!children || children.length === 0){
    return Object.assign({}, node, { id: i});
  }
  let child = children.map((n, j) => addFileID(n, i + '-' + j))
  return Object.assign({}, node, { children: child, id: i  })
}

export const coverTree = (filter, node, matcher) => {
  if(matcher(filter, node)){
    return Object.assign({}, node, filter);
  }
  
  if(!node.children) return node;
  
  const filtered = node.children.map(child => coverTree(filter, child, matcher))
      
  return Object.assign({}, node, { children: filtered });
}

export const delTree = (filter, node, matcher) => {
  if(matcher(filter, node)){
    return false
  }
  
  if(!node.children) return true;
  
  const filtered = node.children.filter(child => delTree(filter, child, matcher))
      
  return Object.assign({}, node, { children: filtered });
}


export const transformCode = (contents) => {
  
  try{
      const { code } = transform(contents.trim(), {
        presets: ['es2015', 'react', 'stage-0'],
        compact: true,
      });

      return { code }

  }catch(err){

    return { err: err.toString() }
  }

}

export const resolvePath = (root, dir) => path.resolve(root, dir)
