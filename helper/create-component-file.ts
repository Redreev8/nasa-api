import fs from 'fs'
import path from 'path'

type Setting = { [key: string]: string }
type nameFile = ((args: Setting) => false | string | undefined) | string
type fileCb = (args: Setting) => string
type file = nameFile | {
    name: nameFile
    content: string | fileCb,
}
type Props =  {
    args: {
        [key: string]: string | {
            defult: string
            cdheked?: (value: string, obj: Setting) => boolean
        }
    }
    pathFolder: (string | ((prop: Setting) => string))[]
    files: file[]
}

const CreateComponentFile = ({ args, pathFolder, files }: Props) => {
    const keysSetting = Object.keys(args)
    const setting: Setting = keysSetting.reduce((obj, key) => ({ 
        ...obj, 
        [key]: typeof args[key] === 'string' ? args[key] : args[key].defult 
    }), {})
    // for (let i = 2; i < process.argv.length; i++) {
    //     const el = process.argv[i].split('=')
    //     const key = el[0]
    //     const value = el[1]
    //     if (!setting[key]) continue
    //     if (setting[key].cdheked && setting[key].cdheked(value, setting)) {
    //         setting[key] = el[1]
    //         continue
    //     }
    //     setting[key] = value
    // }
    let dir = path.join(...pathFolder.reduce((arr: string[], el) => {
        if (typeof el === 'string') arr.push(el)
        if (typeof el === 'function') arr.push(el(setting))
        return arr
    }, []))
    files.forEach(file => {
        const obj = {
            string: (value: string) => value,
            function: (func: (setting: Setting) => string) => func(setting),
            object: (file: Object, key: string) => obj[typeof file[key]](file[key]),
        }
        const name: string = obj[typeof file](file, 'name')
        if (!name) return
        if (!name.match(/\.*\.\w*/g)) {
            dir = path.join(dir, name)
            return fs.mkdirSync(path.join(dir))
        }
        const content: string = obj[typeof file](file, 'content')
        fs.writeFileSync(
            path.join(dir, name),
            content,
            { encoding: "utf8", flag: 'w' }
        )
    })
}

export default CreateComponentFile