import React, { useState, useEffect, useRef, useMemo } from 'react';
import Container from '../src/Container'
import ChipView from './components/Chip'
import AvatarView from './components/Avatar'
import TypographyView from './components/Typography'
import ButtonView from './components/Button'
import Stack from '../src/Stack';
import Button from '../src/Button';
import Box from '../src/Box';
import CardView from './components/Card'

import { Routes, Route } from 'react-pagex'
import Scrollbar from 'react-browser-scrollbar'
import Sidebar from './Sidebar';
import Editor from './components/Editor';


const _code = `import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				component="img"
				height="140"
				image="/static/images/cards/contemplative-reptile.jpg"
				alt="green iguana"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					Lizard
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Lizards are a widespread group of squamate reptiles, with over 6,000
					species, ranging across all continents except Antarctica
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Share</Button>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
}`

const Root = () => {

	return (
		<Stack >
			<Stack>
				<Sidebar />
			</Stack>
			<Box flex={1} height={window.innerHeight} >
				<Scrollbar>
					<Container size="md">
						<Routes
							onError={() => {

							}}
						>
							<Editor
								language="jsx"
								code={_code}
							/>
							<Route path='/' render={TypographyView} />
							<Route path='/avatar' render={AvatarView} />
							<Route path='/chip' render={ChipView} />
							<Route path='/button' render={ButtonView} />
							<Route path='/card' render={CardView} />
						</Routes>

					</Container>
				</Scrollbar>
			</Box>
		</Stack>
	)
}

export default Root