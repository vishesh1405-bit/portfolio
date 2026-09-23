document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('.site-header');
	const menuToggle = document.querySelector('.menu-toggle');
	const navMenu = document.querySelector('.nav-menu');
	const navLinks = document.querySelectorAll('.nav-link');
	const sections = document.querySelectorAll('main section[id], .hero');
	const revealItems = document.querySelectorAll('.reveal');
	const form = document.querySelector('#contact-form');
	const status = document.querySelector('.form-status');
	const typedTitle = document.querySelector('.typed-title');

	const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 30);
	updateHeader();
	window.addEventListener('scroll', updateHeader, { passive: true });

	const closeMenu = () => {
		navMenu.classList.remove('open');
		document.body.classList.remove('menu-open');
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Open navigation menu');
	};

	menuToggle.addEventListener('click', () => {
		const isOpen = navMenu.classList.toggle('open');
		document.body.classList.toggle('menu-open', isOpen);
		menuToggle.setAttribute('aria-expanded', String(isOpen));
		menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
	});
	navLinks.forEach((link) => link.addEventListener('click', closeMenu));

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) entry.target.classList.add('visible');
		});
	}, { threshold: 0.12 });
	revealItems.forEach((item) => observer.observe(item));

	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
		});
	}, { rootMargin: '-35% 0px -55% 0px' });
	sections.forEach((section) => sectionObserver.observe(section));

	const titles = ['Data Analyst', 'Full Stack Developer'];
	let titleIndex = 0;
	let characterIndex = titles[0].length;
	let deleting = true;
	const typeTitle = () => {
		const currentTitle = titles[titleIndex];
		typedTitle.textContent = currentTitle.slice(0, characterIndex);
		if (deleting) characterIndex -= 1;
		else characterIndex += 1;
		if (characterIndex === 0) {
			deleting = false;
			titleIndex = (titleIndex + 1) % titles.length;
		} else if (characterIndex === currentTitle.length + 1) {
			deleting = true;
			characterIndex = currentTitle.length;
		}
		window.setTimeout(typeTitle, deleting ? 65 : 105);
	};
	window.setTimeout(typeTitle, 1800);

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		status.textContent = 'Thanks, your message is ready to be received. I will be in touch soon.';
		form.reset();
	});

	document.querySelectorAll('a[href="#"]').forEach((link) => link.addEventListener('click', (event) => event.preventDefault()));
});
