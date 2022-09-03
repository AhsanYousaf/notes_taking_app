const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
    return 'Your notes...'
}

const listAllNotes = () => {
    const notes = loadNotes();
    if (notes.length === 0){
        console.log(chalk.bgRed('List is Empty'));
    }
    else{
        console.log(chalk.bgBlue('Listing all the notes'));
        notes.forEach(note => {
            console.log(chalk.bgGreen('Title: ' + note.title));
            console.log(chalk.bgGreen('Body: ' + note.body));
    });
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.bgGreen('note added'));
    }
    else{
        console.log(chalk.bgRed('Note already added'));
    }

    

    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (error) {
        return [];      
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title )

    if(notes.length > notesToKeep.length){
        saveNotes(notesToKeep);
        console.log(chalk.bgGreen('note removed'));
    }
    else{
        console.log(chalk.bgRed('No such note found'));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const displayNote = notes.find((note)=> note.title === title);
    if(!displayNote){
        console.log(chalk.bgRed('No such  note found'));
    }
    else{
        console.log(chalk.bgGreen('Title: '+ displayNote.title));
        console.log(chalk.bgGreen('Body: '+ displayNote.body));
    }
}

 module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listAllNotes: listAllNotes,
    readNote: readNote
 };