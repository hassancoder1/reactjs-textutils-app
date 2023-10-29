import React, { useState, useEffect, useCallback } from 'react'

const TextForm = ({ themeMode, textColor, showAlert, setProgress }) => {
    const [boxValue, setBoxValue] = useState('');

    const handlePaste = useCallback(() => {
        navigator.clipboard.readText().then((text) => {
            setBoxValue(boxValue + text);
            showAlert("Text Pasted From Clipboard", 'success');
        });
    }, [boxValue, showAlert]);

    const handleClear = useCallback(() => {
        setBoxValue('');
        showAlert("Input Box Cleared", 'success');
    }, [showAlert]);

    const handleCopy = useCallback(() => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(boxValue);
            showAlert("Text Copied to Clipboard", 'success');
        } else {
            showAlert("Please Allow to Read Text From Clipboard", 'warning');
        }
    }, [boxValue, showAlert]);

    const handleUpperCase = useCallback(() => {
        setBoxValue(boxValue.toUpperCase());
        showAlert("Text Tranformed to UPPERCASE", 'success');
    }, [boxValue, showAlert]);

    const handleLowerCase = useCallback(() => {
        setBoxValue(boxValue.toLowerCase());
        showAlert("Text Tranformed to lowercase", 'success');
    }, [boxValue, showAlert]);

    const handleCapitalize = useCallback(() => {
        const capitalizedText = boxValue.replace(/\b\w/g, (char) => char.toUpperCase());
        setBoxValue(capitalizedText);
        showAlert("Text Capitalized", 'success');
    }, [boxValue, showAlert]);

    const handleExtraSpace = useCallback(() => {
        let newText = boxValue.split(/[ ]+/);
        setBoxValue(newText.join(" "));
        showAlert("Extra Spaces Removed From Text", 'success');
    }, [boxValue, showAlert]);

    const handleFindAndReplace = useCallback(() => {
        let findText = prompt("Enter Text to Find: ");
        if (findText !== null) {
            let replaceText = prompt("Enter Text to Replace with Previous Text: ");
            if (replaceText !== null) {
                let replacedText = boxValue.replace(findText, replaceText);
                setBoxValue(replacedText);
                showAlert("Text Replaced with first one", 'success');
            }
        }
    }, [boxValue, showAlert]);

    const handleFindAndReplaceAll = useCallback(() => {
        let findText = prompt("Enter Text to Find (All): ");
        if (findText !== null) {
            let replaceText = prompt("Enter Text to Replace All: ");
            if (replaceText !== null) {
                let replacedText = boxValue.split(findText).join(replaceText);
                setBoxValue(replacedText);
                showAlert("Text Replaced With all Occurances of given Text", 'success');
            }
        }
    }, [boxValue, showAlert]);

    const calculateWordAndCharacterCount = (text) => {
        const words = text.split(/\s+/).filter((element) => element.length !== 0).length;
        const characters = text.length;
        return { words: words === 1 ? 0 : words, characters };
    };

    const countParagraphsSentences = () => {
        let paragraphs = boxValue.split('\n\n').length;
        let sentences = boxValue.split(/[.!?]/).length - 1; // Subtract 1 to account for the last sentence.    
        return { paragraphsCount: paragraphs === 1 ? 0 : paragraphs, sentencesCount: sentences };
    };

    const calculateReadingTime = (text, readingSpeed) => {
        const words = text.split(/\s+/).filter((element) => element.length !== 0).length;
        const timeInSeconds = (words / readingSpeed) * 60;

        const minutesToRead = Math.floor(timeInSeconds / 60);
        const secondsToRead = Math.floor(timeInSeconds % 60);

        return { minutesToRead, secondsToRead };
    };

    const calculateMemoryUsage = (text) => {
        const textBytes = new TextEncoder().encode(text);
        const units = ['Bytes', 'KB', 'MB', 'GB'];
        let unitIndex;
        let memoryUsage = textBytes.length;

        for (unitIndex = 0; memoryUsage >= 1024 && unitIndex < units.length - 1; unitIndex++) {
            memoryUsage /= 1024;
        }

        const [bytesCount, kiloBytesCount, megaBytesCount, gigaBytesCount] = [
            textBytes.length,
            unitIndex >= 1 ? memoryUsage : 0,
            unitIndex >= 2 ? memoryUsage : 0,
            unitIndex >= 3 ? memoryUsage : 0,
        ];

        return { bytesCount, kiloBytesCount, megaBytesCount, gigaBytesCount };
    };

    const { bytesCount, kiloBytesCount, megaBytesCount, gigaBytesCount } = calculateMemoryUsage(boxValue);



    const { minutesToRead, secondsToRead } = calculateReadingTime(boxValue, 100);
    const { paragraphsCount, sentencesCount } = countParagraphsSentences();
    const { words, characters } = calculateWordAndCharacterCount(boxValue);

    //    Enabling Keyboard ShortCuts 

    useEffect(() => {
        setProgress(15);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
        const handleShortcuts = (event) => {
            const boxEmpty = () => {
                showAlert("Input Box is Empty !", 'warning');
            }

            if (event.ctrlKey && event.key === 'v') {
                event.preventDefault();// Prevent the default browser action
                handlePaste();

            } else if (event.key === 'Escape') {
                event.preventDefault();// Prevent the default browser action
                if (boxValue === '') {
                    boxEmpty();
                } else {
                    handleClear();
                }

            } else if (event.ctrlKey && event.key === 'c') {
                event.preventDefault();// Prevent the default browser action
                if (boxValue === '') {
                    boxEmpty();
                } else {
                    handleCopy();
                }

            } else if (event.ctrlKey && event.key === 'u') {
                event.preventDefault();// Prevent the default browser action
                if (boxValue === '') {
                    boxEmpty();
                } else {
                    handleUpperCase();
                }

            } else if (event.ctrlKey && event.key === 'l') {
                event.preventDefault();// Prevent the default browser action
                if (boxValue === '') {
                    boxEmpty();
                } else {
                    handleLowerCase();
                }

            } else if (event.ctrlKey && event.key === 'a') {
                event.preventDefault();// Prevent the default browser action
                if (boxValue === '') {
                    boxEmpty();
                } else {
                    handleCapitalize();
                }

            } else if (event.ctrlKey && event.key === 'e') {
                event.preventDefault();// Prevent the default browser action
                if (boxValue === '') {
                    boxEmpty();
                } else {
                    handleExtraSpace();
                }

            } else if (event.ctrlKey && event.key === 'f') {
                event.preventDefault();// Prevent the default browser action
                if (boxValue === '') {
                    boxEmpty();
                } else {
                    handleFindAndReplace();
                }

            } else if (event.ctrlKey && event.key === 'F') {
                event.preventDefault();// Prevent the default browser action
                if (boxValue === '') {
                    boxEmpty();
                } else {
                    handleFindAndReplaceAll();
                }
            }
        }
        document.addEventListener('keydown', handleShortcuts);

        return () => {
            document.removeEventListener('keydown', handleShortcuts);
        }
    }, [handleCapitalize, handleClear, handleCopy, handleExtraSpace, handleFindAndReplace, handleFindAndReplaceAll, handleLowerCase, handleUpperCase, handlePaste, boxValue, showAlert, setProgress]);


    return (
        <div>
            <h1 className={`mt-4 mb-3 text-center text-${textColor}`}>📃 TextUtils 🖇️</h1>
            <textarea autoFocus className={`placeholder-color form-control text-${textColor} `} value={boxValue} onChange={(e) => setBoxValue(e.target.value)} placeholder='Paste Your Text to Try these Features' rows="6" style={{ background: `${themeMode === 'light' ? '#ffffff' : '#212529'}49` }}></textarea> {/* setting background with alpha '49' */}
            <div className='mt-3'>
                <button className="btn btn-primary m-1" onClick={handlePaste}>Paste</button>
                <button disabled={!(boxValue.length > 0) ? true : false} className="btn btn-danger m-1" onClick={handleClear}>Clear</button>
                <button disabled={!(boxValue.length > 0) ? true : false} className="btn btn-success m-1" onClick={handleCopy}>Copy</button>
                <button disabled={!(boxValue.length > 0) ? true : false} className="btn btn-warning m-1" onClick={handleUpperCase}>UPPERCASE</button>
                <button disabled={!(boxValue.length > 0) ? true : false} className="btn btn-secondary m-1" onClick={handleLowerCase}>lowercase</button>
                <button disabled={!(boxValue.length > 0) ? true : false} className="btn btn-success m-1" onClick={handleCapitalize}>Capitalize Text</button>
                <button disabled={!(boxValue.length > 0) ? true : false} className="btn btn-info m-1" onClick={handleExtraSpace}>Remove Extra-Spaces</button>
                <button disabled={!(boxValue.length > 0) ? true : false} className="btn btn-warning m-1" onClick={handleFindAndReplace}>Find & Replace</button>
                <button disabled={!(boxValue.length > 0) ? true : false} className="btn btn-primary m-1" onClick={handleFindAndReplaceAll}>Find & Replace (ALL)</button>
            </div>

            <div className="row py-5">
                <div className={`col-md-12 col-lg-6 text-${textColor}`}>
                    <h3>Your Text Summary</h3>

                    <p><b>Text Analysis: </b>
                        {characters} {characters === 1 ? 'Character' : 'Characters'}<b> | </b>
                        {words} {words === 1 ? 'Word' : 'Words'}<b> | </b>
                        {sentencesCount} {sentencesCount === 1 ? 'Sentence' : 'Sentences'}<b> | </b>
                        {paragraphsCount} {paragraphsCount === 1 ? 'Paragraph' : 'Pharagraphs'}
                    </p>

                    <p><b>Time To Read: </b> {minutesToRead} {minutesToRead === 1 ? 'Minute' : 'Minutes'} and {secondsToRead} {secondsToRead === 1 ? 'Second' : 'Seconds'}</p>

                    <p><b>Memory: </b>
                        {bytesCount} {bytesCount === 1 ? 'Byte' : 'Bytes'}<b> | </b>
                        {kiloBytesCount.toFixed(2)} {kiloBytesCount === 1 ? 'KB' : 'KBs'}<b> | </b>
                        {megaBytesCount.toFixed(2)} {megaBytesCount === 1 ? 'MB' : 'MBs'}<b> | </b>
                        {gigaBytesCount.toFixed(2)} {gigaBytesCount === 1 ? 'GB' : 'GBs'}
                    </p>

                    <b>Text Preview</b>
                    <p>{boxValue.length > 0 ? boxValue : "Enter Text to Preview"}</p>
                </div>
                <div className='col-md-12 col-lg-6'>
                    <h3 className={`text-${textColor}`}>Keyboard Shortcuts</h3>
                    <table class={`table table-${themeMode} table-bordered border-${textColor} table-striped`}>
                        {/* Themed colors not working in table */}
                        <thead>
                            <tr>
                                <th scope="col">Shortcut Name</th>
                                <th scope="col">Shortcut Key</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Paste Text:</th>
                                <td><kbd>Ctrl</kbd> + <kbd>V</kbd></td>
                            </tr>
                            <tr>
                                <th scope="row">Clear Text:</th>
                                <td><kbd>Esc</kbd></td>
                            </tr>
                            <tr>
                                <th scope="row">Copy Text:</th>
                                <td><kbd>Ctrl</kbd> + <kbd>C</kbd></td>
                            </tr>
                            <tr>
                                <th scope="row">UPPERCASE Text:</th>
                                <td><kbd>Ctrl</kbd> + <kbd>U</kbd></td>
                            </tr>
                            <tr>
                                <th scope="row">lowercase Text:</th>
                                <td><kbd>Ctrl</kbd> + <kbd>l</kbd></td>
                            </tr>
                            <tr>
                                <th scope="row">Capitalize Text:</th>
                                <td><kbd>Ctrl</kbd> + <kbd>A</kbd></td>
                            </tr>
                            <tr>
                                <th scope="row">Remove Extra Spaces:</th>
                                <td><kbd>Ctrl</kbd> + <kbd>E</kbd></td>
                            </tr>
                            <tr>
                                <th scope="row">Find & Replace Text:</th>
                                <td><kbd>Ctrl</kbd> + <kbd>F</kbd></td>
                            </tr>
                            <tr>
                                <th scope="row">Find & Replace All:</th>
                                <td><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default TextForm
