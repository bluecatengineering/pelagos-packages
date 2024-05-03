import {getValue} from './Getters';

export default {
	labels: (d) => d.key,
	linear: getValue,
	log: getValue,
	time: (d) => d.date,
};
