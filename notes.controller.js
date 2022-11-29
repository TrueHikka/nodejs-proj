const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk")

const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {
	const notes = await getNotes()

	const note = {
		title,
		id: Date.now().toString()
	}

	notes.push(note)

	await fs.writeFile(notesPath, JSON.stringify(notes))
	console.log(chalk.yellow.inverse("Note was added!"))
}

// async function saveNotes() {
// 	await fs.writeFile(notesPath, JSON.stringify(notes))
// }

async function getNotes() {
	const notes = await fs.readFile(notesPath, {encoding:"utf-8"})
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [] 
}

async function editNote(noteData) {
	const notes = await getNotes()
	const noteIndex = notes.findIndex(note => note.id === noteData.id)
	console.log(noteData)
	console.log(noteIndex)
	if(noteIndex >= 0) {
		notes[noteIndex] = {...notes[noteIndex], ...noteData}
		await fs.writeFile(notesPath, JSON.stringify(notes))
		console.log(chalk.bgGreen(`Note with id="${noteData.id}" has been updated!`))
	}
}

async function removeNote(id) {
	console.log(id)
	const notes = await getNotes()
	const filteredArr = notes.filter(note => note.id !== id)
	await fs.writeFile(notesPath, JSON.stringify(filteredArr))
	console.log(chalk.red("Removed id:", id))
}

module.exports = {
	addNote, removeNote, getNotes, editNote
}



