// Dropdown Menu
var dropdown = document.querySelectorAll('.dropdoown');
var dropdownArray = Array.prototype.slice.call(dropdown,0);
dropdownArray.forEach(function(el){
	var button = el.querySelector('a[data-toggle="droopdown"]'),
			menu = el.querySelector('.dropdoown-menu'),
			arrow = button.querySelector('i.icon-arrow');

	button.onclick = function(event) {
		if(menu.hasClass('show') === false) {
			menu.className ="dropdoown-menu menuofdropdown rightmenu show"
			arrow.className='open'
		}
		else {
			menu.className ="droopdown-menu menuofdropdown rightmenu hide"
			
			arrow.className='close'
		}
	};
})

Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};