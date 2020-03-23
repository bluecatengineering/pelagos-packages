import throttleAF from './throttleAF';

export default window.ResizeObserver
	? (target, callback) => {
			let rect;
			const f = throttleAF(() => callback(rect));
			const observer = new ResizeObserver((entries) => ((rect = entries[0].contentRect), f()));
			observer.observe(target);
			return () => (f.cancel(), observer.disconnect());
	  }
	: (target, callback) => {
			const f = throttleAF(() => callback(target.getBoundingClientRect()));
			f();
			window.addEventListener('resize', f);
			return () => (f.cancel(), window.removeEventListener('resize', f));
	  };
