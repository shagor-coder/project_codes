import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'Company_Name:', headerName: 'Company Name', width: 150 },
	{ field: 'Name', headerName: 'Name', width: 150 },
	{ field: 'Title', headerName: 'Title', width: 120 },
	{ field: 'Legal_Name', headerName: 'Legal Name', width: 150 },
	{ field: 'Name_Pronunciation', headerName: 'Name Pronunciation', width: 180 },
	{ field: 'Spouse', headerName: 'Spouse', width: 120 },
	{ field: 'Assistant', headerName: 'Assistant', width: 150 },
	{ field: 'Assistant_Email', headerName: 'Assistant Email', width: 180 },
	{ field: 'Description', headerName: 'Description', width: 200 },
	{ field: 'Office_Phone', headerName: 'Office Phone', width: 150 },
	{ field: 'Extension', headerName: 'Extension', width: 120 },
	{ field: 'Direct_Number', headerName: 'Direct Number', width: 150 },
	{ field: 'Mobile', headerName: 'Mobile', width: 120 },
	{ field: 'Mobile_2', headerName: 'Mobile 2', width: 120 },
	{ field: 'Mobile_3', headerName: 'Mobile 3', width: 120 },
	{ field: 'Home', headerName: 'Home', width: 120 },
	{ field: 'Email', headerName: 'Email', width: 180 },
	{ field: 'Secondary_Email', headerName: 'Secondary Email', width: 180 },
	{ field: 'Alternate_Email', headerName: 'Alternate Email', width: 180 },
	{ field: 'Groups', headerName: 'Groups', width: 120 },
];

const ContactsTable = ({ data }) => {
	return (
		<Box sx={{ width: '600' }}>
			<DataGrid
				rows={data}
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 25,
						},
					},
				}}
				slots={{ toolbar: GridToolbar }}
				checkboxSelection
				slotProps={{
					toolbar: {
						showQuickFilter: true,
						quickFilterProps: { debounceMs: 500 },
					},
				}}
			/>
		</Box>
	);
};

export default ContactsTable;
