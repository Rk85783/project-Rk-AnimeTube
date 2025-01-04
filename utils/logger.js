const isDevelopment = process.env.NODE_ENV === 'development';

const info = (message) => {
	if (isDevelopment) {
		console.info(`INFO: ${message}`);
	}
};

const warn = (message) => {
	if (isDevelopment) {
		console.warn(`WARN: ${message}`);
	}
};

const error = (message) => {
	console.error(`ERROR: ${message}`);
};

const debug = (message) => {
	if (isDevelopment) {
		console.debug(`DEBUG: ${message}`);
	}
};

export default { info, warn, error, debug };
