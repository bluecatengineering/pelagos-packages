import {format} from 'd3-format';
import identity from 'lodash-es/identity';

const siFormatter = format('.3s');
const hintTime = new Intl.DateTimeFormat(undefined, {dateStyle: 'medium'});

export default {
	labels: identity,
	linear: siFormatter,
	log: siFormatter,
	time: (d) => hintTime.format(d),
};
