(function () {
	const r = document.createElement('link').relList;
	if (r && r.supports && r.supports('modulepreload')) return;
	for (const e of document.querySelectorAll('link[rel="modulepreload"]')) s(e);
	new MutationObserver((e) => {
		for (const t of e)
			if (t.type === 'childList')
				for (const c of t.addedNodes)
					c.tagName === 'LINK' && c.rel === 'modulepreload' && s(c);
	}).observe(document, { childList: !0, subtree: !0 });
	function o(e) {
		const t = {};
		return (
			e.integrity && (t.integrity = e.integrity),
			e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
			e.crossOrigin === 'use-credentials'
				? (t.credentials = 'include')
				: e.crossOrigin === 'anonymous'
				? (t.credentials = 'omit')
				: (t.credentials = 'same-origin'),
			t
		);
	}
	function s(e) {
		if (e.ep) return;
		e.ep = !0;
		const t = o(e);
		fetch(e.href, t);
	}
})();
function i() {
	const n = JSON.parse(localStorage.getItem('_ud'));
	return n || {};
}

function p() {
	const u = new URL(location.href);
	const s = u.searchParams.get('state');
	return s;
}

function l() {
	const n = [...document.querySelectorAll('.calendar_custom')],
		r = i();

	let o;

	if (!r.id) {
		const s = p();
		o = s;
	}

	const { please_select_your_state } = r;
	o = please_select_your_state;

	o &&
		n.forEach((s) => {
			const e = document.createElement('div');
			(e.classList = 'calendly-inline-widget'),
				(e.dataset.url = `https://calendly.com/${o
					.trim()
					.toLowerCase()
					.replaceAll(
						' ',
						'-'
					)}-retirement-income/free-retirement-income-planning-session`),
				(e.style = 'min-width:320px;height:700px;');
			const t = document.createElement('script');
			(t.src = 'https://assets.calendly.com/assets/external/widget.js'),
				(t.async = !0),
				s.append(e),
				s.append(t);
		});
}
l();
