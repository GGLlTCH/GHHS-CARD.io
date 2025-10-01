// Общий скрипт для обеих страниц
class PageAnimations {
	constructor() {
		this.isTransitioning = false
		this.init()
	}

	init() {
		this.createAnimatedBackground()
		this.setupPageTransitions()
		this.setupScrollAnimations()
		this.setupHeaderEffects()
		this.setupHoverEffects()
		this.preventWhiteSpace()
		this.setupParallaxEffects()

		// Показываем контент с анимацией
		this.animateContentLoad()
	}

	// Создаем анимированный фон
	createAnimatedBackground() {
		const animatedBg = document.createElement('div')
		animatedBg.className = 'animated-bg'
		document.body.appendChild(animatedBg)

		const particlesOverlay = document.createElement('div')
		particlesOverlay.className = 'particles-overlay'
		document.body.appendChild(particlesOverlay)

		// Добавляем плавающие элементы
		this.createFloatingElements()
	}

	// Создаем плавающие элементы
	createFloatingElements() {
		const floatingElements = document.querySelectorAll(
			'.hero-title, .hero-subtitle, .logo-card'
		)
		floatingElements.forEach(el => {
			el.classList.add('float-element')
		})
	}

	// Настройка переходов между страницами с blur-эффектом
	setupPageTransitions() {
		const links = document.querySelectorAll('a[href]')

		links.forEach(link => {
			if (
				link.href &&
				!link.href.startsWith('javascript') &&
				!link.href.startsWith('mailto') &&
				!link.href.startsWith('tel')
			) {
				link.addEventListener('click', e => {
					const href = link.getAttribute('href')

					if (
						href &&
						(href.endsWith('.html') || href === '/' || href.startsWith('#'))
					) {
						if (!href.startsWith('#')) {
							e.preventDefault()
							this.animatePageTransition(href)
						} else {
							e.preventDefault()
							const target = document.querySelector(href)
							if (target) {
								target.scrollIntoView({
									behavior: 'smooth',
									block: 'start',
								})
							}
						}
					}
				})
			}
		})
	}

	// Анимация перехода между страницами с blur
	animatePageTransition(url) {
		if (this.isTransitioning) return
		this.isTransitioning = true

		// Создаем элемент перехода
		const transition = document.createElement('div')
		transition.className = 'page-transition'
		document.body.appendChild(transition)

		// Создаем индикатор загрузки
		const spinner = document.createElement('div')
		spinner.className = 'loading-spinner'
		document.body.appendChild(spinner)

		// Запускаем анимацию
		setTimeout(() => {
			transition.classList.add('active')
			spinner.classList.add('show')
		}, 10)

		// Переходим на новую страницу
		setTimeout(() => {
			window.location.href = url
		}, 600)
	}

	// Анимация загрузки контента при входе на страницу
	animateContentLoad() {
		const mainContent = document.querySelector('main') || document.body
		mainContent.classList.add('content-load')

		// Анимируем отдельные элементы с задержкой
		setTimeout(() => {
			this.animateHeroSection()
		}, 500)
	}

	// Анимация герой секции
	animateHeroSection() {
		const heroTitle = document.querySelector('.hero-title')
		const heroSubtitle = document.querySelector('.hero-subtitle')
		const heroLocation = document.querySelector('.hero-location')

		if (heroTitle) {
			heroTitle.style.animation = 'titleReveal 1.2s ease-out forwards'
		}

		if (heroSubtitle) {
			setTimeout(() => {
				heroSubtitle.style.animation = 'subtitleReveal 1.5s ease-out forwards'
			}, 300)
		}

		if (heroLocation) {
			setTimeout(() => {
				heroLocation.classList.add('content-reveal')
				setTimeout(() => heroLocation.classList.add('revealed'), 100)
			}, 600)
		}
	}

	// Динамичные анимации при скролле
	setupScrollAnimations() {
		// Анимация появления элементов
		this.setupRevealAnimations()

		// Анимация с задержкой
		this.setupStaggerAnimations()

		// Параллакс эффекты
		this.setupAdvancedParallax()

		// Анимация при скролле
		this.setupScrollTriggeredAnimations()
	}

	// Анимация появления элементов при скролле
	setupRevealAnimations() {
		const revealObserver = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const delay = entry.target.dataset.delay || 0
						setTimeout(() => {
							entry.target.classList.add('revealed')

							// Добавляем дополнительную анимацию для некоторых элементов
							if (entry.target.classList.contains('project-card-full')) {
								entry.target.style.transform = 'translateY(0) scale(1)'
								entry.target.style.opacity = '1'
							}
						}, delay)
					}
				})
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px',
			}
		)

		// Обычное появление
		const revealElements = document.querySelectorAll('.content-reveal')
		revealElements.forEach((el, index) => {
			el.dataset.delay = index * 100
			revealObserver.observe(el)
		})

		// Появление с поворотом
		const rotateElements = document.querySelectorAll('.rotate-reveal')
		rotateElements.forEach((el, index) => {
			el.dataset.delay = index * 150
			revealObserver.observe(el)
		})

		// Появление с масштабированием
		const scaleElements = document.querySelectorAll('.scale-reveal')
		scaleElements.forEach((el, index) => {
			el.dataset.delay = index * 120
			revealObserver.observe(el)
		})
	}

	// Анимация с задержкой для групп элементов
	setupStaggerAnimations() {
		const staggerContainers = document.querySelectorAll('.stagger-animation')

		staggerContainers.forEach(container => {
			const children = container.children

			Array.from(children).forEach((child, index) => {
				child.style.animationDelay = `${index * 0.15}s`
			})
		})
	}

	// Параллакс эффекты
	setupParallaxEffects() {
		window.addEventListener('scroll', () => {
			const scrolled = window.pageYOffset
			const parallaxElements = document.querySelectorAll('.parallax')

			parallaxElements.forEach(element => {
				const speed = element.dataset.speed || 0.5
				element.style.transform = `translateY(${scrolled * speed}px)`
			})
		})
	}

	// Улучшенные параллакс эффекты
	setupAdvancedParallax() {
		let ticking = false

		const updateParallax = () => {
			const scrolled = window.pageYOffset

			// Параллакс для герой секции
			const hero = document.querySelector('.hero')
			if (hero) {
				const speed = hero.dataset.speed || 0.3
				hero.style.transform = `translateY(${scrolled * speed}px)`
			}

			// Параллакс для карточек
			const cards = document.querySelectorAll(
				'.project-card-full, .stat-card, .method-card, .role-card'
			)
			cards.forEach((card, index) => {
				const speed = 0.1 + index * 0.02
				if (!this.isElementInViewport(card)) {
					card.style.transform = `translateY(${scrolled * speed}px)`
				}
			})

			ticking = false
		}

		window.addEventListener('scroll', () => {
			if (!ticking) {
				requestAnimationFrame(updateParallax)
				ticking = true
			}
		})
	}

	// Проверка видимости элемента
	isElementInViewport(el) {
		const rect = el.getBoundingClientRect()
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		)
	}

	// Анимации, запускаемые при скролле
	setupScrollTriggeredAnimations() {
		let lastScrollY = window.scrollY
		const header = document.querySelector('.nav-header')

		window.addEventListener('scroll', () => {
			const currentScrollY = window.scrollY
			const direction = currentScrollY > lastScrollY ? 'down' : 'up'

			// Анимация хедера
			if (currentScrollY > 100) {
				header.classList.add('scrolled')
			} else {
				header.classList.remove('scrolled')
			}

			// Прячем/показываем хедер при скролле
			if (direction === 'down' && currentScrollY > 200) {
				header.style.transform = 'translateY(-100%)'
			} else {
				header.style.transform = 'translateY(0)'
			}

			lastScrollY = currentScrollY
		})
	}

	// Эффекты для хедера
	setupHeaderEffects() {
		const header = document.querySelector('.nav-header')

		window.addEventListener('scroll', () => {
			if (window.scrollY > 50) {
				header.classList.add('scrolled')
			} else {
				header.classList.remove('scrolled')
			}
		})
	}

	// Эффекты при наведении
	setupHoverEffects() {
		// Динамическое изменение скорости анимации при наведении
		const interactiveElements = document.querySelectorAll(
			'.project-card-full, .stat-card, .method-card, .role-card, .social-btn, .github-btn'
		)

		interactiveElements.forEach(element => {
			element.addEventListener('mouseenter', () => {
				element.style.transition =
					'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
			})

			element.addEventListener('mouseleave', () => {
				element.style.transition =
					'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
			})
		})

		// Эффект магнитного курсора для кнопок
		this.setupMagneticButtons()
	}

	// Магнитный эффект для кнопок
	setupMagneticButtons() {
		const buttons = document.querySelectorAll(
			'.social-btn, .github-btn, .nav-link'
		)

		buttons.forEach(button => {
			button.addEventListener('mousemove', e => {
				if (this.isTransitioning) return

				const rect = button.getBoundingClientRect()
				const x = e.clientX - rect.left
				const y = e.clientY - rect.top

				const centerX = rect.width / 2
				const centerY = rect.height / 2

				const deltaX = (x - centerX) / 8
				const deltaY = (y - centerY) / 8

				button.style.transform = `translate(${deltaX}px, ${deltaY}px)`
			})

			button.addEventListener('mouseleave', () => {
				button.style.transform = 'translate(0, 0)'
			})
		})
	}

	// Предотвращение появления белых полос
	preventWhiteSpace() {
		document.body.style.overflowX = 'hidden'
		document.documentElement.style.overflowX = 'hidden'

		window.addEventListener('scroll', () => {
			if (window.scrollX !== 0) {
				window.scrollTo(0, window.scrollY)
			}
		})

		window.addEventListener('resize', () => {
			document.body.style.overflowX = 'hidden'
			document.documentElement.style.overflowX = 'hidden'
		})
	}
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
	new PageAnimations()

	// Добавляем случайные задержки для анимаций
	const animatedElements = document.querySelectorAll(
		'.content-reveal, .rotate-reveal, .scale-reveal'
	)
	animatedElements.forEach(el => {
		el.dataset.delay = Math.random() * 300
	})
})

// Плавное появление страницы при загрузке
window.addEventListener('load', () => {
	document.body.style.opacity = '0'
	document.body.style.transition = 'opacity 0.3s ease'

	setTimeout(() => {
		document.body.style.opacity = '1'
	}, 100)

	// Убираем индикатор загрузки если он есть
	const spinner = document.querySelector('.loading-spinner')
	if (spinner) {
		setTimeout(() => {
			spinner.style.opacity = '0'
			setTimeout(() => spinner.remove(), 300)
		}, 500)
	}
})

// Обработка ошибок перехода
window.addEventListener('error', () => {
	const transition = document.querySelector('.page-transition')
	const spinner = document.querySelector('.loading-spinner')

	if (transition) {
		transition.classList.remove('active')
		transition.classList.add('leaving')
		setTimeout(() => transition.remove(), 600)
	}

	if (spinner) {
		spinner.classList.remove('show')
		setTimeout(() => spinner.remove(), 300)
	}
})
