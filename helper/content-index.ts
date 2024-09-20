import formatWord from "./format-word" 

export default (name: string) => `import ${formatWord(name, 'PascalCase')} from './${name}'

export default ${formatWord(name, 'PascalCase')}`