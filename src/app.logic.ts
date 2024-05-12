import fs from 'fs'
import { yarg } from './config/plugins/yargs.plugin'

console.log(yarg)

const { b: base, l: limit, s: showTable } = yarg

let outputMessage = ''
const headerMessage = `
=============================================
                Table of ${base}
=============================================\n
`

for (let i = 1; i <= limit; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`
}

outputMessage = headerMessage + outputMessage

if (showTable) {
  console.log(outputMessage)
}

const outputPath = `outputs/`
fs.mkdirSync(outputPath, { recursive: true }) // Creo el directorio output y habilitamos la opcion para poder crear carpetas recursivamente
fs.writeFileSync(`${outputPath}/table-of-${base}.txt`, outputMessage)

console.log('File created!')
