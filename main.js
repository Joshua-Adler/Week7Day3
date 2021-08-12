addField('Season', 'season');
addField('Round', 'round');
addSubmit();
addTable();

function addField(placeholder, name) {
	input = document.createElement('input');
	input.placeholder = placeholder;
	input.name = name;
	input.classList.add('form-control');
	document.body.appendChild(input);
}

async function doCall(season, round) {
	result = await axios.get(`https://ergast.com/api/f1/${season}/${round}.json`).catch((e) => alert('no'));
	if(result) {
		data = result.data.MRData;
		race = data.RaceTable.Races[0];

		tbody = document.getElementsByTagName('tbody')[0];

		tr = document.createElement('tr');
		tbody.appendChild(tr);

		tr.appendChild(createData(race.raceName));
		tr.appendChild(createData(race.date));
		tr.appendChild(createData(race.time));
		tr.appendChild(createData(race.Circuit.circuitName));
		tr.appendChild(createData(race.Circuit.Location.locality));
		tr.appendChild(createData(race.Circuit.Location.country));
		tr.appendChild(createData(`<a href="${race.url}">Report</a>`));
	}
}

function addSubmit() {
	button = document.createElement('button');
	button.innerText = 'Submit';
	button.classList.add('btn', 'btn-primary');
	button.addEventListener('click', (event) => {
		season = document.getElementsByName('season')[0].value;
		round = document.getElementsByName('round')[0].value;
		doCall(season, round);
	});
	document.body.appendChild(button);
}

function addTable() {
	table = document.createElement('table');
	table.classList.add('table', 'table-striped');
	document.body.appendChild(table);

	thead = document.createElement('thead');
	table.appendChild(thead);

	tr = document.createElement('tr');
	thead.appendChild(tr);

	tr.appendChild(createHeader('Race Name'));
	tr.appendChild(createHeader('Date'));
	tr.appendChild(createHeader('Time'));
	tr.appendChild(createHeader('Circuit'));
	tr.appendChild(createHeader('Locality'));
	tr.appendChild(createHeader('Country'));
	tr.appendChild(createHeader('Information'));

	tbody = document.createElement('tbody');
	table.appendChild(tbody);
	console.log('yes');
}

function createHeader(text) {
	th = document.createElement('th');
	th.innerText = text;
	th.scope = 'col';
	return th;
}

function createData(text) {
	td = document.createElement('td');
	td.innerHTML = text;
	return td;
}