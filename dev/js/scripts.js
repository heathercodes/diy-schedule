//Get elements
const daysSchedule = document.getElementsByTagName('article');
const overlay = document.querySelector('.overlay');
const modalForm = document.querySelector('.modal');
const button = document.querySelector('.again');
const schedule = [];
let dayId;

//build out functions
function modalDisplay() {
	overlay.style.display = 'block';
	dayId = this;
}

function populateSchedule(day = [], dayList) {
	const lastItem = day[day.length - 1];

	const li = document.createElement('li');
	li.className = 'day__event';

	const title = document.createElement('h3');
	const titleText = document.createTextNode(`${lastItem.eventTitle}`);
	title.appendChild(titleText);

	const location = document.createElement('h4');
	const locationText = document.createTextNode(`${lastItem.eventLocation}`);
	location.appendChild(locationText);

	const time = document.createElement('h3');
	const startTime = document.createTextNode(`${lastItem.eventStart} - `);
	const endTime = document.createTextNode(`${lastItem.eventEnd}`);
	time.appendChild(startTime);
	time.appendChild(endTime);

	const description = document.createElement('p');
	const descriptionText = document.createTextNode(`${lastItem.eventDescription}`);
	description.appendChild(descriptionText);

	li.appendChild(title);
	li.appendChild(location);
	li.appendChild(time);
	li.appendChild(description);

	return dayList.appendChild(li);
}

function modalClose(e) {
	e.preventDefault();
	//add item here
	const eventTitle = document.querySelector('.modal__title').value;
	const eventLocation = document.querySelector('.modal__location').value;
	const eventStart = document.querySelector('.modal__timeStart').value;
	const eventEnd = document.querySelector('.modal__timeEnd').value;
	const eventDescription = document.querySelector('.modal__description').value;
	const eventData = {
		eventTitle,
		eventLocation,
		eventStart,
		eventEnd,
		eventDescription
	};
	schedule.push(eventData);
	const weekDay = dayId.getElementsByTagName('ul')[0];
	populateSchedule(schedule, weekDay);
	overlay.style.display = 'none';
	this.reset();
}

function clickClose(e) {
	if (overlay === e.target) {
		overlay.style.display = 'none';
	}
}

function downloadImage() {
	html2canvas(document.querySelector('.week'), {
		onrendered: function (canvas) {
			const a = document.createElement('a');
			a.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
			a.download = 'yourSchedule.jpg';
			a.click();
		}
	});
}

//hook up event listeners
for (const day of daysSchedule) {
	day.addEventListener('click', modalDisplay);
}
modalForm.addEventListener('submit', modalClose);
overlay.addEventListener('click', clickClose);
button.addEventListener('click', downloadImage);

//Dragula js
dragula([document.getElementById('drag1'), document.getElementById('drag2'), document.getElementById('drag3'), document.getElementById('drag4'), document.getElementById('drag5'), document.getElementById('drag6'), document.getElementById('drag7')], {
	revertOnSpill: true,
	removeOnSpill: true
});
