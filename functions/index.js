//functions for the project are here

//get the name of the day from day number eg..0,1,2
export const getDayName = dayNumber => {
	if (dayNumber == 0) {
		return 'Sun';
	} else if (dayNumber == 1) {
		return 'Mon';
	} else if (dayNumber == 2) {
		return 'Tue';
	} else if (dayNumber == 3) {
		return 'Wed';
	} else if (dayNumber == 4) {
		return 'Thurs';
	} else if (dayNumber == 5) {
		return 'Fri';
	} else if (dayNumber == 6) {
		return 'Sat';
	}
};

//get the name of the day from a unix value
export const unixToDayName = unix => {
	const date = new Date(unix * 1000);
	const hour = date.getHours();
	const min = date.getMinutes();
	const day = date.getDay();
	const dayName = getDayName(day);
	return dayName;
};

export const unixToHourMin = unix => {
	const date = new Date(unix * 1000);
	const hour = date.getUTCHours();
	const min =
		date.getUTCMinutes() < 10
			? `0${date.getUTCMinutes()}`
			: date.getUTCMinutes();
	if (hour == 0) return '12:' + min + ' AM';
	if (hour == 12) return '12:' + min + ' PM';
	if (hour < 12) {
		if (hour < 10) return `0${hour}:${min} AM`;
		else return `${hour}:${min} AM`;
	}
	if (hour > 12) {
		let hh = hour - 12;
		if (hh < 10) return `0${hh}:${min} PM`;
		else return `${hh}:${min} PM`;
	}
};

export const unixToHourMinSec = unix => {
	const date = new Date(unix * 1000);
	const hour = date.getUTCHours();
	const min =
		date.getUTCMinutes() < 10
			? `0${date.getUTCMinutes()}`
			: date.getUTCMinutes();
	const sec = date.getUTCSeconds();
	if (hour == 0) return `12:${min}:${sec} AM`;
	if (hour == 12) return `12:${min}:${sec} PM`;
	if (hour < 12) {
		if (hour < 10) return `0${hour}:${min}:${sec} AM`;
		else return `${hour}:${min}:${sec} AM`;
	}
	if (hour > 12) {
		let hh = hour - 12;
		if (hh < 10) return `0${hh}:${min}:${sec} PM`;
		else return `${hh}:${min}:${sec} PM`;
	}
};

export const unixToHour = unix => {
	const date = new Date(unix * 1000);
	const hour = date.getUTCHours();

	if (hour == 0) return `12AM`;
	if (hour == 12) return `12PM`;
	if (hour < 12) return hour + 'AM';
	if (hour > 12) return hour - 12 + 'PM';
};
