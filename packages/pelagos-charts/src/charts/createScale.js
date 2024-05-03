import {scaleBand, scaleLinear, scaleLog, scaleTime} from 'd3-scale';

const scales = {
	labels: (domain, range, padding) =>
		scaleBand().domain(domain).rangeRound(range).paddingInner(1).paddingOuter(padding),
	linear: (domain, range) => scaleLinear().domain(domain).rangeRound(range).nice(),
	log: (domain, range) => scaleLog().domain(domain).rangeRound(range).nice(),
	time: (domain, range) => scaleTime().domain(domain).rangeRound(range),
};

export default (type, domain, range, padding) => scales[type](domain, range, padding);
