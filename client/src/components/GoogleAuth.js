import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: '287710735757-ldk6vd8i2kc03qc8k8cb285e4bmckrkg.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthchange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthchange);
				});
		});
	}

	onAuthchange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.onSignOutClick} className='ui red google button'>
					<i className='google icon' />
					Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={this.onSignInClick} className='ui red google button'>
					<i className='google icon' />
					Sign In with Google
				</button>
			);
		}
	}
	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn
	};
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
