import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case'
import fs from 'fs'

describe('tests in save-file', () => {
  const customOptions = {
    fileContent: 'custom content',
    fileName: 'custom-table-name',
    fileDestination: 'custom-outputs/file-destination',
  }

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`

  afterEach(() => {
    const outputFolderExist = fs.existsSync('outputs')
    if (outputFolderExist) fs.rmSync('outputs', { recursive: true })

    const customOutputFolderExist = fs.existsSync(customOptions.fileDestination)
    if (customOutputFolderExist)
      fs.rmSync(customOptions.fileDestination, { recursive: true })
  })

  test('should save file with default values', () => {
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'
    const options = {
      fileContent: 'test content',
    }

    const result = saveFile.execute(options)
    const fileExist = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    expect(result).toBeTruthy()
    expect(fileExist).toBeTruthy()
    expect(fileContent).toBe(options.fileContent)
  })

  test('should save file with custom values', () => {
    const saveFile = new SaveFile()

    const result = saveFile.execute(customOptions)
    const fileExist = fs.existsSync(customFilePath)
    const fileContent = fs.readFileSync(customFilePath, 'utf-8')

    expect(result).toBeTruthy()
    expect(fileExist).toBeTruthy()
    expect(fileContent).toBe(customOptions.fileContent)
  })

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile()
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('This is a custom error message from testing')
    })

    const result = saveFile.execute(customOptions)

    expect(result).toBeFalsy()

    mkdirSpy.mockRestore()
  })

  test('should return false if file could not be created', () => {
    const saveFile = new SaveFile()
    const writeFileSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('This is a custom writing error message')
    })

    const result = saveFile.execute({ fileContent: 'Hola' })

    expect(result).toBeFalsy()

    writeFileSpy.mockRestore()
  })
})
