import { ReactNode } from 'react'
import useFirstUpdate from './hook/useFirstUpdate'
import useUpdate from './hook/useUpdate'

const DataUpdate = (props: { children?: ReactNode }) => {
	useFirstUpdate()
	useUpdate()
	return <>{props.children}</>
}

export default DataUpdate
