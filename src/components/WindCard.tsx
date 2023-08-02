import React, { useEffect, useRef } from 'react';
import Card from './card/Card';
import Logo from '../assets/svg/wind.svg';
import TrendStatus, { TrendStatusEnum, TrendStatusRef } from './TrendStatus';

export default () => {
	const subContextRef = useRef<TrendStatusRef>(null);
	useEffect(() => {
		subContextRef.current?.set(TrendStatusEnum.UP, '100 m/s');
	});
	return (
		<Card
			title={'Wind speed'}
			icon={<Logo />}
			subContext={<TrendStatus ref={subContextRef} />}>
			'TEST km/s'
		</Card>
	);
}
