const fs = require('fs')

let outputMessage = ''
const base = 5
const headerMessage = `
=============================================
                Table of ${base}
=============================================\n
`

for (let i = 1; i <= 10; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`
}

outputMessage = headerMessage + outputMessage

const outputPath = `outputs/`

fs.mkdirSync(outputPath, { recursive: true }) // Creo el directorio output y habilitamos la opcion para poder crear carpetas recursivamente
fs.writeFileSync(`${outputPath}/table-of-${base}.txt`, outputMessage)

console.log(outputMessage)
