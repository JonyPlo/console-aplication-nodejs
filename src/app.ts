import { yarg } from './config/plugins/yargs.plugin'
import { ServerApp } from './presentation/server-app'

// console.log(process.argv); // argv significa "argument values" y nos devuelve los argumentos que escribimos es un comando como por ejemplo `node dist/app.js --base 10 -l=100`, esto nos devolveria un arreglo con los argumentos ['C:\\Users\\jony_\\AppData\\Local\\fnm_multishells\\18408_1715360398381\\node.exe', 'D:\\Cursos\\Node\\04-multiplication\\dist\\app.js', '--base', '10', '-l=100']

// console.log(yarg.b);
;(async () => {
  await main()
})()

async function main() {
  const {
    b: base,
    l: limit,
    s: showTable,
    n: fileName,
    d: fileDestination,
  } = yarg

  ServerApp.run({ base, limit, showTable, fileName, fileDestination })
}
