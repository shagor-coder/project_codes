import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';

const Navbar = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const location = useLocation();

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position='static'>
			<Container>
				<Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
					<Typography variant='h6' sx={{ flexGrow: 1 }}>
						Ascendixre
					</Typography>
					<Link
						to='/'
						color='inherit'
						style={{
							marginRight: 20,
							textDecoration: 'none',
							color: location.pathname === '/' ? '#010109' : '#fff',
						}}
					>
						Companies
					</Link>
					<Link
						to='/properties'
						color='inherit'
						style={{
							marginRight: 20,
							textDecoration: 'none',
							color: location.pathname === '/properties' ? '#010109' : '#fff',
						}}
					>
						Properties
					</Link>
					<Link
						to='/contacts'
						color='inherit'
						style={{
							marginRight: 20,
							textDecoration: 'none',
							color: location.pathname === '/contacts' ? '#010109' : '#fff',
						}}
					>
						Contacts
					</Link>
					<div>
						<IconButton
							size='large'
							edge='end'
							color='inherit'
							aria-label='dropdown'
							aria-haspopup='true'
							onClick={handleMenuOpen}
						>
							<MenuIcon />
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
						>
							<MenuItem onClick={handleMenuClose}>Insert Company</MenuItem>
							<MenuItem onClick={handleMenuClose}>Insert Properties</MenuItem>
							<MenuItem onClick={handleMenuClose}>Insert Contacts</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
