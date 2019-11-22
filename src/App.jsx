import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PickUpForm from './components/PickUpForm';

function App() {
	return (
		<div className="App">
			<div className="cb-u-background-primary--dark cb-c-hero-background" />
			<Container>
				<Row>
					<div className="searchBox col-sm-10 col-md-8">
						<PickUpForm />
					</div>
				</Row>
			</Container>
		</div>
	);
}

export default App;
