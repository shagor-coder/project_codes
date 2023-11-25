import React from 'react';
import useStore from '../features/store';
import { Container, Typography } from '@mui/material';
import ContactsTable from '../components/ContactsTable';

const Contacts = () => {
	const contacts = useStore((state) => state.contacts);
	console.log(contacts);
	return (
		<main style={{ paddingTop: 40, paddingBottom: 40 }}>
			<Container>
				<Typography variant='h2' sx={{ marginBottom: 3 }}>
					Contacts
				</Typography>
				<ContactsTable data={contacts} />
			</Container>
		</main>
	);
};

export default Contacts;
