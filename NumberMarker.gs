function markNextAvailableNumber() {
    // defining range
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const range = sheet.getRange("A3:J150"); // adjust range as necessary
    const data = range.getValues();

    // defining style for the marked cell
    const bgColor = "#ea9999"; // light-red background color
    const textStyle = "line-through"; // line-through text style

    // loop through cells until it finds the first unmarked one
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            const cell = range.getCell(i+1, j+1);

            // verify if the cell hasn't been marked (checks for line-through and background color)
            if (!cell.getFontLine().includes(textStyle) && !(cell.getBackground() === bgColor)) {
                // display input box for user
                const note = Browser.inputBox("Add a note", "Insert description:", Browser.Buttons.OK_CANCEL);
                // get user e-mail
                const user = Session.getActiveUser().getEmail();
                // get current date and time
                const dateTime = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy/MM/dd HH:mm:ss");

                if (note === "cancel") {
                    return; // the cell remains unmarked if user clicks cancel on the input box
                } else {
                    // mark the cell (line-through and background color)
                    cell.setFontLine(textStyle);
                    cell.setBackground(bgColor);

                    // check if the note is empty
                    if (note.trim() === "") {
                        // note content if user doesn't type any description (includes user and date/time info)
                        const noteWithInfo = `No description given.\n\n___________________________________\nAdded by: ${user}\n${dateTime}`;
                        // adds note to cell
                        cell.setNote(noteWithInfo);
                    } else {
                        // note content if user types description (includes user and date/time info)
                        const noteWithInfo = `${note}\n\n___________________________________\nAdded by: ${user}\n${dateTime}`;
                        // adds note to cell
                        cell.setNote(noteWithInfo);
                    }
                }
                // ends script after marking first available cell
                return;
            }
        }
    }
}
