class StickyScroll {
	constructor() {
		this.stickyElements = [ ... document.querySelectorAll( '.sticky' ) ];
		this.widthLimit     = 480;
		this.offset         = 30;

		this.bindScrollEvent();
		this.bindResizeEvent();
	}

	getWidth() {
		return Math.max(
			document.body.scrollWidth,
			document.documentElement.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.offsetWidth,
			document.documentElement.clientWidth,
		);
	}

	getHeight() {
		return Math.max(
			document.body.scrollHeight,
			document.documentElement.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.offsetHeight,
			document.documentElement.clientHeight,
		);
	}

	bindScrollEvent() {
		this.stickyElements.forEach( sticky => {
			sticky.defaultTop = sticky.offsetTop;
		});

		document.addEventListener( 'scroll', this.stickyController.bind( this ) );
	}

	bindResizeEvent() {
		document.addEventListener( 'resize', this.recalculateDefaultTop.bind( this ) );
	}

	recalculateDefaultTop() {
		this.stickyElements.forEach( sticky => {
			sticky.defaultTop = sticky.offsetTop;
		});
	}

	stickyController() {
		if ( this.getWidth() > this.widthLimit ) {
			const doc    = document.documentElement;
			const left   = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
			const top    = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
			const offset = this.offset;

			this.stickyElements.forEach( sticky => {
				if ( top >= ( sticky.defaultTop ) ) {
					// Re-style the element to be fixed position
					sticky.setAttribute(
						'style',
						'position: fixed; left: '+ sticky.offsetLeft +'px; top: '+ offset +'px;'
					);
				} else {
					// Reset the element style
					sticky.setAttribute(
						'style',
						'position: inherit; left: 0; top: 0px;'
					);
				}
			});
		}
	}
}

const StickyScroll = new StickyScroll();
