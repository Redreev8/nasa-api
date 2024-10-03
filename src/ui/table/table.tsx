import { forwardRef, ReactNode } from 'react'
import style from './table.module.scss'
import classNames from 'classnames'
export interface TableProps {
    className?: string
    th: ReactNode[][]
    data: DataTable[]
}
export type DataTable = ReactNode[] | JSX.Element[]

const Table = forwardRef<HTMLTableElement, TableProps>(({ className, th, data }, ref) => {
    const cl = classNames(style.table, className)

    return (
        <table ref={ ref } className={ cl }>
            <thead className={ style.thead }>
                {
                    th.map((tr, i) => (
                        <tr key={ i } className={ classNames(style.tr) }>
                            { tr.map((th, k) => (
                                    <th className={ classNames(style.ceil) } key={ k }>{ th }</th>
                            )) }
                        </tr>
                    ))
                }
            </thead>
            <tbody>
                {
                    data.map((tr, i) => (
                        <tr className={ classNames(style.tr) } key={ i }>
                            {
                                tr.map((td, k) => (
                                    <td className={classNames(style.ceil, {
                                    }) } key={`${i}${k}`}>
                                        { td }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
})

export default Table