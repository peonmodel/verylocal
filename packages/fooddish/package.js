Package.describe({
	name: 'verylocal:fooddish',
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: '',
	// URL to the Git repository containing the source code for this package.
	git: '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function setupPkg(api) {
	api.versionsFrom('1.4.3.2');
	api.use('ecmascript');
	api.mainModule('fooddish.js');
});

Package.onTest(function setupPkg(api) {
	api.use('ecmascript');
	api.use('tinytest');
	api.use('verylocal:fooddish');
	api.mainModule('fooddish-tests.js');
});
