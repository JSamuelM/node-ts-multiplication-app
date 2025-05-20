import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {
  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs/file-destination',
    fileName: 'custom-table-name'
  }

  afterEach(() => {
    const outputFolderExists = fs.existsSync('outputs');
    if (outputFolderExists) fs.rmSync('outputs', { recursive: true });
    
    const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);

    if (customOutputFolderExists) fs.rmSync('custom-outputs', { recursive: true });
  });

  test('should save file with default values', () => {
    const saveFile = new SaveFile();
    const filePath = 'outputs/table.txt';
    const options = {
      fileContent: 'test content',
    }

    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test('should save file with custom values', () => {
    const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
    const saveFile = new SaveFile();
    const result = saveFile.execute(customOptions);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();
    jest.spyOn(fs, 'mkdirSync').mockImplementationOnce(
      () => { throw new Error('This is a custom error message from testing'); }
    );
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  test('should return false if file could not be created', () => {
    const saveFile = new SaveFile();
    // jest.spyOn(fs, 'mkdirSync').mockImplementation(
    //   () => { throw new Error('This is a custom error message from testing'); }
    // );

    const result = saveFile.execute({ fileContent: 'Hola' });
    expect(result).toBe(true);
  });
});
