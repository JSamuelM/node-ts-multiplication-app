// import { yarg } from './args.plugin';

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import('./args.plugin');

  return yarg;
}

const originalArgv = process.argv;

describe('Test args.plugin.ts', () => {

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test('should return default values', async () => {
    
    const argv = await runCommand(['-b', '5']);
    
    expect(argv).toEqual(expect.objectContaining({
      b: 5,
      l: 10,
      s: false,
      n: 'multiplication-table',
      d: 'outputs',
    }));

  });

  test('should return configuration with custom values', async () => {
    const argv = await runCommand(['-b', '3', '-l', '5', '-s', '-n', 'custom-name', '-d', 'custom-output']);
    
    expect(argv).toEqual(expect.objectContaining({
      b: 3,
      l: 5,
      s: true,
      n: 'custom-name',
      d: 'custom-output',
    }));
  });
});
