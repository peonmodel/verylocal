Package.describe({
	name: 'verylocal:reactify',
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: 'helper package to make data reactive without using mixins, dependent on react-komposer',
	// URL to the Git repository containing the source code for this package.
	git: '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Npm.depends({
	'react-komposer': '2.0.0',
});

Package.onUse(function setupPkg(api) {
	api.versionsFrom('1.4.3.2');
	api.use('ecmascript');
	api.mainModule('reactify.js');
});
