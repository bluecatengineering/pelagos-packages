export default ([min, max]) => [min * (min > 0 ? 0.9 : 1.1), max * (max > 0 ? 1.1 : 0.9)];
