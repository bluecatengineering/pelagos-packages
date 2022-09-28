import spring from '@bluecateng/nano-spring';

export default (container, options) => {
	const abs = Math.abs;
	const translateTransition = 'transform .2s cubic-bezier(0.3, 0, 0, 1)';
	const transitionTime = 205;

	let element, clone, ew, eh, ecx, ecy, px, py, ofsX, ofsY;
	let originalIndex, currentIndex;
	let dragging = false;
	let busy = false;
	let pending;
	let scrollFrame;

	const indexOfElement = () => Array.prototype.indexOf.call(element.parentNode.childNodes, element);

	const findScrollParent = (element, property) => {
		while (element !== document.body && !/(auto|scroll)/.test(getComputedStyle(element)[property])) {
			element = element.parentNode;
		}
		return element;
	};

	const {horizontal, selector = '.draggable', onStart, onMove, onFinish, onCancel} = options;
	const handleSelector = options.handleSelector || selector;
	const focusSelector = options.focusSelector || handleSelector;

	const scrollParent = findScrollParent(container, horizontal ? 'overflowX' : 'overflowY');
	const scrollRect = scrollParent.getBoundingClientRect();

	const setFocus = (element) => {
		const target = (selector !== focusSelector && element.querySelector(focusSelector)) || element;
		target.focus();
	};

	const cancelScroll = () => {
		if (scrollFrame) {
			cancelAnimationFrame(scrollFrame);
			scrollFrame = 0;
		}
	};

	const move = (sibling, position, keepMoving, transform, transformElement) => {
		const er = element.getBoundingClientRect();
		let r;
		let pr = er;
		let target = element[sibling];
		const all = [];
		while (target && keepMoving((r = target.getBoundingClientRect()))) {
			target.style.transition = translateTransition;
			target.style.transform = transform(r, pr);
			all.push(target);
			pr = r;
			target = target[sibling];
		}
		if (all.length) {
			busy = true;
			if (transformElement) {
				element.style.transition = translateTransition;
				element.style.transform = transformElement(er, pr);
			}
			setTimeout(() => {
				for (const target of all) {
					target.style.transition = '';
					target.style.transform = '';
				}
				all[all.length - 1].insertAdjacentElement(position, element);
				if (transformElement) {
					element.style.transition = '';
					element.style.transform = '';
					setFocus(element);
				}
				busy = false;
				if (pending) {
					const tmp = pending;
					pending = null;
					tmp();
				}
			}, transitionTime);
		}
	};

	const transformStart = (r, pr) => `translate(${pr.right - r.right}px,${pr.bottom - r.bottom}px)`;
	const transformEnd = (r, pr) => `translate(${pr.left - r.left}px,${pr.top - r.top}px)`;

	const moveLeft = (mcx) => move('previousSibling', 'beforebegin', (r) => mcx < r.right + 5, transformStart);
	const moveRight = (mcx) => move('nextSibling', 'afterend', (r) => mcx > r.left - 5, transformEnd);

	const moveUp = (mcy) => move('previousSibling', 'beforebegin', (r) => mcy < r.bottom + 5, transformStart);
	const moveDown = (mcy) => move('nextSibling', 'afterend', (r) => mcy > r.top - 5, transformEnd);

	const moveFromPointer = (tx, ty) => {
		if (horizontal) {
			const mcx = tx + ecx;
			if (tx > px) {
				moveRight(mcx);
			} else if (tx < px) {
				moveLeft(mcx);
			}
		} else {
			const mcy = ty + ecy;
			if (ty > py) {
				moveDown(mcy);
			} else if (ty < py) {
				moveUp(mcy);
			}
		}
		px = tx;
		py = ty;
	};

	const handlePointerMove = (event) => {
		event.preventDefault();
		const tx = event.clientX - ofsX;
		const ty = event.clientY - ofsY;
		if (dragging) {
			clone.style.transform = `translate(${tx}px,${ty}px)`;
			if (busy) {
				pending = () => moveFromPointer(tx, ty);
			} else {
				moveFromPointer(tx, ty);
			}
			cancelScroll();
			if (horizontal) {
				const mcx = tx + ecx;
				const offsetLeft = tx - scrollRect.left;
				const offsetRight = tx + ew - scrollRect.right;
				if (offsetLeft < 0) {
					const scroll = () => {
						if (scrollParent.scrollLeft > 0) {
							scrollParent.scrollLeft += offsetLeft;
							moveLeft(mcx);
							scrollFrame = requestAnimationFrame(scroll);
						}
					};
					scroll();
				} else if (offsetRight > 0) {
					const scrollRight = scrollParent.scrollWidth - scrollRect.width;
					const scroll = () => {
						if (scrollParent.scrollLeft < scrollRight) {
							scrollParent.scrollLeft += offsetRight;
							moveRight(mcx);
							scrollFrame = requestAnimationFrame(scroll);
						}
					};
					scroll();
				}
			} else {
				const mcy = ty + ecy;
				const offsetTop = ty - scrollRect.top;
				const offsetBottom = ty + eh - scrollRect.bottom;
				if (offsetTop < 0) {
					const scroll = () => {
						if (scrollParent.scrollTop > 0) {
							scrollParent.scrollTop += offsetTop;
							moveUp(mcy);
							scrollFrame = requestAnimationFrame(scroll);
						}
					};
					scroll();
				} else if (offsetBottom > 0) {
					const scrollBottom = scrollParent.scrollHeight - scrollRect.height;
					const scroll = () => {
						if (scrollParent.scrollTop < scrollBottom) {
							scrollParent.scrollTop += offsetBottom;
							moveDown(mcy);
							scrollFrame = requestAnimationFrame(scroll);
						}
					};
					scroll();
				}
			}
		} else if (abs(tx - px) + abs(ty - py) > 2) {
			dragging = true;
			element.classList.add('placeholder');
			clone.classList.add('dragging');
			clone.classList.add('clone');
			clone.style.transform = `translate(${tx}px,${ty}px)`;
			document.body.appendChild(clone);
			setFocus(clone);
		}
	};

	const handlePointerDown = (event) => {
		let handle;
		if (!element && event.button === 0 && (handle = event.target.closest(handleSelector))) {
			event.preventDefault();
			element = handle.closest(selector);
			const r = element.getBoundingClientRect();
			ew = r.width;
			eh = r.height;
			ecx = ew / 2;
			ecy = eh / 2;
			px = r.left;
			py = r.top;
			ofsX = event.clientX - px;
			ofsY = event.clientY - py;

			container.setPointerCapture(event.pointerId);
			container.addEventListener('pointermove', handlePointerMove, true);
			setFocus(element);

			clone = element.cloneNode(true);
			clone.style.width = `${r.width}px`;
			clone.style.height = `${r.height}px`;
		}
	};

	const handlePointerUp = (event) => {
		container.releasePointerCapture(event.pointerId);
		if (dragging) {
			event.preventDefault();
		}
	};

	const handleLostPointerCapture = () => {
		container.removeEventListener('pointermove', handlePointerMove, true);
		if (dragging) {
			dragging = false;
			cancelScroll();
			const r = element.getBoundingClientRect();
			const dx = r.left - px;
			const dy = r.top - py;
			spring(
				250,
				30,
				(p) => {
					clone.style.transform = `translate(${px + p * dx}px,${py + p * dy}px)`;
				},
				() => {
					document.body.removeChild(clone);
					element.classList.remove('placeholder');
					setFocus(element);
					onFinish(element);
					element = null;
				}
			);
		}
	};

	const swapElements = (targetIndex, cancel) => {
		if (busy) {
			pending = () => swapElements(targetIndex, cancel);
		} else {
			let i = indexOfElement() - targetIndex;
			if (i > 0) {
				move('previousSibling', 'beforebegin', () => i-- !== 0, transformStart, transformEnd, cancel);
			} else {
				move('nextSibling', 'afterend', () => i++ !== 0, transformEnd, transformStart, cancel);
			}
			if (cancel) {
				pending = () => (onCancel(element), (element = null));
			}
		}
	};

	const handleGlobalKeyDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
		switch (event.keyCode) {
			case 27: // escape
				element.classList.remove('dragging');
				document.removeEventListener('keydown', handleGlobalKeyDown, true);
				if (currentIndex === originalIndex) {
					onCancel(element);
					element = null;
				} else {
					swapElements(originalIndex, true);
				}
				break;
			case 32: // space
				element.classList.remove('dragging');
				document.removeEventListener('keydown', handleGlobalKeyDown, true);
				onFinish(element);
				element = null;
				break;
			case 37: // left or up
			case 38: {
				const prev = element.previousSibling;
				if (prev) {
					swapElements(--currentIndex);
					onMove(element, currentIndex);
				}
				break;
			}
			case 39: // right or down
			case 40: {
				const next = element.nextSibling;
				if (next) {
					swapElements(++currentIndex);
					onMove(element, currentIndex);
				}
				break;
			}
		}
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 32) {
			const target = event.target;
			if (target.matches(selector)) {
				event.preventDefault();
				document.addEventListener('keydown', handleGlobalKeyDown, true);
				element = target;
				element.classList.add('dragging');
				currentIndex = originalIndex = indexOfElement();
				onStart(element, currentIndex);
			}
		}
	};

	container.addEventListener('pointerdown', handlePointerDown);
	container.addEventListener('pointerup', handlePointerUp);
	container.addEventListener('lostpointercapture', handleLostPointerCapture);
	container.addEventListener('keydown', handleKeyDown);

	return () => {
		container.removeEventListener('pointerdown', handlePointerDown);
		container.removeEventListener('pointerup', handlePointerUp);
		container.removeEventListener('lostpointercapture', handleLostPointerCapture);
		container.removeEventListener('keydown', handleKeyDown);
	};
};
