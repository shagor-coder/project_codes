import React from 'react';
import useStore from '../features/store';
import { Container, Typography } from '@mui/material';
import CompanyTable from '../components/CompanyTable';

const Home = () => {
	const companies = useStore((state) => state.company);
	return (
		<main style={{ paddingTop: 40, paddingBottom: 40 }}>
			<Container>
				<Typography variant='h2' sx={{ marginBottom: 3 }}>
					Companies
				</Typography>
				<CompanyTable data={companies} />
			</Container>
		</main>
	);
};

export default Home;
