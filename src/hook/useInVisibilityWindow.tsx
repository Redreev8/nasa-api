import debounce from '@/helper/debounce'
import { Dispatch, SetStateAction } from 'react'

interface Props {
    set: Dispatch<SetStateAction<number>>
    direction?: 'top' | 'left' | 'bottom' | 'right'
    ms?: number,
}
const useInVisibilityWindow = 
<N extends HTMLElement = HTMLElement >({ set, ms = 500, direction = 'top' }: Props) => {
    const inVisibility = (node: N) => {
        if (node.children.length <= 1) return
        const childrens = [...node.children]
        const rectFirstElement = childrens[0]!.getBoundingClientRect()
        if (rectFirstElement[direction] !== 0) {
            set(0)
            debounce(() => inVisibility(node), ms)()
            return 
        }
        const directionWindow = direction === 'top' || direction === 'bottom' ? 'clientHeight' : 'clientWidth'
        set(
            (node.children.length - 1) * document.documentElement[directionWindow]
        )
    }

    return inVisibility
}

export default useInVisibilityWindow