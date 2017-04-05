import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Message, Container } from 'semantic-ui-react';
import { _ } from 'lodash';

export const GlobalMessage = {
	setMessage(...args) {
		if (!this.instance) { throw new Meteor.Error('global message component not instantiated'); }
		return this.instance.setMessage(...args);
	},
	timeout(...args) {
		if (!this.instance) { throw new Meteor.Error('global message component not instantiated'); }
		return this.instance.timeout(...args);
	},
	show(...args) {
		if (!this.instance) { throw new Meteor.Error('global message component not instantiated'); }
		return this.instance.show(...args);
	},
	handleDismiss(...args) {
		if (!this.instance) { throw new Meteor.Error('global message component not instantiated'); }
		return this.instance.handleDismiss(...args);
	},
};

class GlobalMessageComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Error',
			message: '',
			hidden: true,
			error: true,
			success: false,
			info: false,
			warning: false,
			history: [1, 2, 3, 4, 5],
			historyLimit: 5,
			expiry: 5000,
		};
		this.timerId = null;
		Object.defineProperty(GlobalMessage, 'instance', { value: this });
	}

	setMessage({
		message,
		title = '',
		type = 'error',
		error, reason, details,
	}, show = true, expiry = this.state.expiry) {
		if (error) {
			type = 'error';
			message = reason || error || message;
		}
		if (!['error', 'info', 'warning', 'success'].includes(type)) { type = 'error'; }
		const newState = { message, error: false, info: false, warning: false, success: false };
		newState[type] = true;
		newState.title = !!title ? _.upperFirst(title) : _.upperFirst(type);
		this.setState(newState);
		this.state.history.push(message);
		this.state.history.shift();
		if (show) { this.setState({ hidden: !show }); }
		this.timeout(expiry);
	}

	timeout(expiry) {
		clearTimeout(this.timerId);
		this.timerId = setTimeout(() => {
			this.setState({ hidden: true });
		}, expiry);
	}

	show(expiry = this.state.expiry) {
		this.setState({ hidden: false });
		this.timeout(expiry);
	}

	handleDismiss() {
		this.setState({ hidden: true });
	}

	render() {
		const style = {
			position: 'fixed', padding: '10px', bottom: 0, width: '100%',
			display: this.state.hidden ? 'none' : 'block', zIndex: 9999,
		};
		return (
			<Container style={style}>
				<Message
				error={this.state.error}
				success={this.state.success}
				info={this.state.info}
				warning={this.state.warning}
				hidden={this.state.hidden}
				onDismiss={this.handleDismiss.bind(this)}
			>
				<Message.Header>{this.state.title}</Message.Header>
				<p>{this.state.message}</p>
			</Message>
			</Container>
		);
	}
}

Object.defineProperty(GlobalMessage, 'component', { value: GlobalMessageComponent });
