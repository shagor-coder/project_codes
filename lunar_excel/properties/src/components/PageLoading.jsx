import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

const PageLoader = () => {
	return (
		<Backdrop open={true}>
			<CircularProgress color='primary' />
		</Backdrop>
	);
};

export default PageLoader;
