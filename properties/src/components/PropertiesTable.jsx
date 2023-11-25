import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'Property_Name', headerName: 'Property Name', width: 200 },
	{ field: 'Street', headerName: 'Street', width: 200 },
	{ field: 'City', headerName: 'City', width: 120 },
	{ field: 'State', headerName: 'State', width: 100 },
	{ field: 'Country', headerName: 'Country', width: 120 },
	{ field: 'Description', headerName: 'Description', width: 200 },
	{ field: 'Lot_Size_Acres', headerName: 'Lot Size (Acres)', width: 150 },
	{
		field: 'Total_Building_Size _SF',
		headerName: 'Total Building Size (SF)',
		width: 100,
	},
	{ field: 'Asset _Type', headerName: 'Asset Type', width: 150 },
	{ field: 'Tenancy', headerName: 'Tenancy', width: 120 },
	{ field: 'Property_Sub_Type', headerName: 'Property Sub-Type', width: 150 },
	{ field: 'Parcel_ID', headerName: 'Parcel ID', width: 120 },
	{ field: 'Tenant_Name', headerName: 'Tenant Name', width: 150 },
	{ field: 'Company_Name', headerName: 'Company Name', width: 150 },
];

const PropertiesTable = ({ data }) => {
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

export default PropertiesTable;
