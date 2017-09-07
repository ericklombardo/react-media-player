/**
 * https://davidwalsh.name/javascript-debounce-function
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param {*} func 
 * @param {*} wait 
 * @param {*} immediate 
 */
export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

export function pad(number) {
	if ( number < 10 ) {
	  return '0' + number;
	}
	return number;
}         
export function isoString(date) {
	return date.getUTCFullYear() +
	  '-' + pad( date.getUTCMonth() + 1 ) +
	  '-' + pad( date.getUTCDate() ) +
	  'T' + pad( date.getHours() ) +
	  ':' + pad( 0 ) +
	  ':' + pad( 0 );
}

export function formatSeconds(duration){
	var minutes = Math.floor(duration / 60);
	var seconds =  Math.floor(duration - (minutes*60));

	return `${minutes}:${pad(seconds)}`;
}