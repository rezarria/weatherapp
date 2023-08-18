import { ReactNode } from 'react'
import useUpdate from './hook/useUpdate'

const DataUpdate = (props: { children?: ReactNode }) => {
	useUpdate()
	return <>{props.children}</>
}

export default DataUpdate
