import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'Company_Name', headerName: 'Company Name', width: 150 },
	{ field: 'Description', headerName: 'Description', width: 200 },
	{ field: 'Office_Address', headerName: 'Office Address', width: 200 },
	{ field: 'Office_Phone', headerName: 'Office Phone', width: 100 },
	{ field: 'Website', headerName: 'Website', width: 220 },
];

const CompanyTable = ({ data }) => {
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

export default CompanyTable;
