import React from 'react';
import useStore from '../features/store';
import { Container, Typography } from '@mui/material';
import PropertiesTable from '../components/PropertiesTable';

const Properties = () => {
	const properties = useStore((state) => state.properties);
	console.log(properties);
	return (
		<main style={{ paddingTop: 40, paddingBottom: 40 }}>
			<Container>
				<Typography variant='h2' sx={{ marginBottom: 3 }}>
					Properties
				</Typography>
				<PropertiesTable data={properties} />
			</Container>
		</main>
	);
};

export default Properties;
