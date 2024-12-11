import formatWord from './format-word'

const content = (name: string) => `import { FC } from 'react'
import style from './${name}.module.scss'
import classNames from 'classnames'
export interface ${formatWord(name, 'PascalCase')}Props {
}

const ${formatWord(name, 'PascalCase')}: FC<${formatWord(name, 'PascalCase')}Props> = ({}) => {
    return (
        <div className={ classNames(style['${name}']) }>
        </div>
    )
}

export default ${formatWord(name, 'PascalCase')}`

export default content