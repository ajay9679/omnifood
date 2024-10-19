const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;


const headerEl = document.querySelector('.header');
const btnNavEl = document.querySelector('.btn-mobile-nav');
btnNavEl.addEventListener('click',function(){
	headerEl.classList.toggle('nav-open');
});


const allLinks = document.querySelectorAll('a:link');
allLinks.forEach(function(link){
	link.addEventListener('click',function(e){
		e.preventDefault();
		const href = link.getAttribute('href');
		if(href === '#') window.scrollTo({top:0,behavior:'smooth'})
		if(href !== "#" && href.startsWith("#")){
			const sectionEl = document.querySelector(href);
			sectionEl.scrollIntoView({ behavior: "smooth" });
		}
		if(link.classList.contains('main-nav-link'))
			headerEl.classList.toggle('nav-open');
	});
});

const stepImage = document.querySelectorAll('.step-img-box div');

const scrollObs = new IntersectionObserver(function(entries){
	console.log(entries)
	entries.forEach(entry => {
		console.log(entry)
		console.log(entry.target)
		if(entry.isIntersecting) entry.target.classList.toggle('animate-img');
		if(!entry.isIntersecting) entry.target.classList.remove('animate-img');
		// entry.isIntersecting ? entry.target.classList.toggle('animate-img') : entry.target.classList.remove('animate-img');
	});
},{root:null,threshold:0});
stepImage.forEach(el => scrollObs.observe(el));
/*STICKY NAV*/
const sectionHeroEl = document.querySelector('.section-hero');
const obs = new IntersectionObserver(function(entries){
	const ent = entries[0];
	// console.log(ent)
	if(!ent.isIntersecting) document.body.classList.add('sticky');
	if(ent.isIntersecting) document.body.classList.remove('sticky');
},{root:null,threshold:0,rootMargin:"-80px"});
obs.observe(sectionHeroEl);

// PRICING TOGGLE
const pricingNumber = document.querySelectorAll('.pricing-num');
const toggleButton = document.querySelector('#toggle');

toggleButton.addEventListener('click',function(e){
	const prices = toggleButton.checked ? ['3995', '6995', '9995'] : ['399', '645', '999'];
	pricingNumber.forEach((pricing,i) => pricing.textContent = prices[i]);
});

/*FORM SUBMISSION*/
function submission(e){
	e.preventDefault();
	const fullName = document.querySelector('#full-name').value;
	const email = document.querySelector('#email').value;
	const selectPlan = document.querySelector('#select-plan').value;
	console.log(selectPlan)
	const displayMessage = document.querySelector('.display-message');
	if(selectPlan){
		displayMessage.style.display = 'block';
		displayMessage.textContent = `Thank you for your interest in the ${selectPlan} plan, ${name}. Unfortunately, Omnifood is a fictional company so there's no free meal to send you.`;
	}else{
		displayMessage.style.display = 'block';
		displayMessage.textContent = `Sorry, you need to choose a plan to proceed!`;
	}
}
const formSubmit =  document.querySelector('.cta-form');
formSubmit.addEventListener('submit',submission);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
