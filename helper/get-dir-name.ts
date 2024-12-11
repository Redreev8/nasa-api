import path from 'path'
import { fileURLToPath } from 'url'

export default (moduleUrl: string) => {
    const filename = fileURLToPath(moduleUrl)
    return path.dirname(filename)
}
