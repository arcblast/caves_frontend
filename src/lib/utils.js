import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// used in Isolation Map Layer
export function getColor(c) {
	return	c	> 90	?	'#006837' :
				 	c > 60 	? '#31a354' :
				 	c > 30 	? '#78c679' :
				 	c > 10	? '#c2e699' :
										'#ffffcc'	;
}