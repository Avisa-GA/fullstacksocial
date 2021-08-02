import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

export default function Post({ post, handleDelete}) {
// * ****************************************** Show the Index page also we can delete
	return (
		<Grid container direction="row" justifyContent="center" alignItems="center">
			<Grid item xs={12} sm={6} md={6} lg={5}>
				<div className="card large">
					<div className="card-image">
						<img src={post.imageUrl} alt={post.text} />

						<button
							style={{ marginBottom: '10%', marginLeft: '10%' }}
							className="btn-floating halfway-fab waves-effect waves-light red"
							onClick={() => handleDelete(post.id)}>
							<i className="material-icons">delete</i>
						</button>
					</div>
					<div className="card-content">
						<span
							style={{
								color: '#00796b',
								marginRight: '30%',
								fontSize: '14px',
								textAlign: 'left',
							}}
							className="card-title">
							{post.text}
						</span>
					</div>
					<div className="card-action">
						<Link to={`/${post.id}`}>Show More</Link>
					</div>
				</div>
			</Grid>
		</Grid>
	);
}