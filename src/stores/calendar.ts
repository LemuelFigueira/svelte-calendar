import { derived, writable } from 'svelte/store';

export const whichPicker = writable<'month' | 'days'>('days');

export const month = writable(new Date().getMonth());
export const year = writable(new Date().getFullYear());

export const weekDays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

export const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const getFebruaryDays = (year: number) => {
	if (year % 4 === 0) {
		return 29;
	}
	return 28;
};

export const monthDays = [
	31,
	getFebruaryDays(new Date().getFullYear()),
	31,
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31
];

function createArrayBySpecificLength(length: number, fillWithZero?: boolean) {
	return new Array(length).fill(null).map((_, i) => (fillWithZero ? 0 : i + 1));
}

function generateMonthNumberDays(month: number, year: number) {
	const firstDayNumber = new Date(year, month, 1).getDay();

	const aux = createArrayBySpecificLength(firstDayNumber, true);
	const monthDaysList = createArrayBySpecificLength(monthDays[month]);

	return [].concat(aux, monthDaysList);
}

export function increaseYear() {
	year.update((y) => y + 1);
}

export function decreaseYear() {
	year.update((y) => y - 1);
}

export function changePicker() {
	whichPicker.update((p) => (p === 'month' ? 'days' : 'month'));
}

export function getMonthByName(value: string) {
	return monthNames.indexOf(value);
}

export function selectMonth(value: number) {
	month.set(value);
	changePicker();
}

export const monthDaysAsNumber = derived([year, month], ([$year, $month]) => {
	const result = generateMonthNumberDays($month, $year);

	return result;
});
