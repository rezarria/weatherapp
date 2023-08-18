import { styles as NavigationAreaStyles } from '@component/navigationArea/NavigationArea'
import { WidthMainScreenAnimatedContext } from '@src/screen/MainScreen'
import { useContext, useMemo } from 'react'

export function useAnimation() {
	const widthAnimated = useContext(WidthMainScreenAnimatedContext)
	const animation = useMemo(() => {
		const size = widthAnimated.interpolate({
			inputRange: [0, NavigationAreaStyles.smallContainer.height],
			outputRange: [107, 59],
			extrapolate: 'clamp',
		})
		return {
			icon: {
				height: size,
				width: size,
			},
			text: {
				fontSize: widthAnimated.interpolate({
					inputRange: [0, NavigationAreaStyles.smallContainer.height],
					outputRange: [22, 0],
					extrapolate: 'clamp',
				}),
				lineHeight: widthAnimated.interpolate({
					inputRange: [0, NavigationAreaStyles.smallContainer.height],
					outputRange: [28, 0],
					extrapolate: 'clamp',
				}),
			},
		}
	}, [widthAnimated])
	return animation
}
