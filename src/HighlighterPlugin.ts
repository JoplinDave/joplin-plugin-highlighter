module.exports = {
	default: function(context: any) {

		const plugin = function(CodeMirror) {
			CodeMirror.defineOption('highlighter', false, function(cm, value) {
				if (!value) return;

				cm.on('inputRead', async function (cm1, change) {

					var line = cm.getCursor().line;
					var activeLine = change.from.line;
					var lineTxt = cm.getLine(change.from.line);

					// does the line contain a matching string ?
					// format h : [m|r|g|b|y] : [e|w|s|l]
					// h = highlight
					// m = mark
					// r = red
					// g = green
					// b = blue
					// y = yellow
					// e = empty (empty span)
					// w = word
					// s = sentence
					// l = line
					var match = lineTxt.match(/([\[]+[h]+[:]+[m|r|g|b|y]+[:]+[e|w|s|l]+[\]])/gi);

					if(match)
					{
						var lineLength = lineTxt.length;
						var requestPosition = lineTxt.indexOf(match[0]);
						var request = lineTxt.slice(requestPosition, requestPosition + 7);

						var colourRequest = request.slice(3, 4);
						var rangeRequest = request.slice(5, 6);

						// get line start and end around request
						var textStart = lineTxt.slice(0, requestPosition);
						var textEnd = lineTxt.slice(requestPosition + 7, lineLength);

						if (colourRequest.toLowerCase() == 'r') { // red

							var colourRequestHash = "#ff8b8b"

						} else if (colourRequest.toLowerCase() == 'g') { // green

							var colourRequestHash = "#aaffa2"

						} else if(colourRequest.toLowerCase() == 'b') { // blue

							var colourRequestHash = "#9fd1ff"

						} else if(colourRequest.toLowerCase() == 'y') { // yellow

							var colourRequestHash = "#f5ffa2"
						}

						if (rangeRequest.toLowerCase() == 'e') { // empty - insert in place of request

							if (colourRequest.toLowerCase() == 'm') // use standard MD mark tags
							{
								var replacementText = textStart + '<mark></mark>' + textEnd;
								var cursorPosition = textStart.length + 6;
								
							} else {

								var replacementText = textStart + '<span style="background:' + colourRequestHash + ';"></span>' + textEnd;
								var cursorPosition = textStart.length + 34;
							}

						} else if (rangeRequest.toLowerCase() == 'w') { // word - look for space

							var spacePosition = textEnd.indexOf(" ");

							if(spacePosition < 0) // end of line found
							{
								spacePosition = textEnd.length - 1;
							}

							var textInSpan = textEnd.slice(0, spacePosition);
							var newTextEnd = textEnd.slice(spacePosition);

							if (colourRequest.toLowerCase() == 'm') // use standard MD mark tags
							{
								var replacementText = textStart + '<mark>' + textInSpan + '</mark>' + newTextEnd;
								var cursorPosition = textStart.length + textInSpan.length + 6;

							} else {

								var replacementText = textStart + '<span style="background:' + colourRequestHash + ';">' + textInSpan + '</span>' + newTextEnd;
								var cursorPosition = textStart.length + textInSpan.length + 34;
							}

						} else if(rangeRequest.toLowerCase() == 's') { // sentence - look for fullstop

							var sentencePosition = textEnd.indexOf(".");
							var textInSpan = textEnd.slice(0, sentencePosition + 1) ;
							var newTextEnd = textEnd.slice(sentencePosition + 1);

							if (colourRequest.toLowerCase() == 'm') // use standard MD mark tags
							{
								var replacementText = textStart + '<mark>' + textInSpan + '</mark>' + newTextEnd;
								var cursorPosition = textStart.length + textInSpan.length + 6;
								
							} else {
							
								var replacementText = textStart + '<span style="background:' + colourRequestHash + ';">' + textInSpan + '</span>' + newTextEnd;
								var cursorPosition = textStart.length + textInSpan.length + 34;
							}

						} else if(rangeRequest.toLowerCase() == 'l') { // line - use end of line

							var linePosition = lineLength;
							var textInSpan = textEnd.slice(0, linePosition) ;
							var newTextEnd = textEnd.slice(linePosition);

							if (colourRequest.toLowerCase() == 'm') // use standard MD mark tags
							{
								var replacementText = textStart + '<mark>' + textEnd + '</mark>';
								var cursorPosition = textStart.length + textInSpan.length + 6;
								
							} else {

								var replacementText = textStart + '<span style="background:' + colourRequestHash + ';">' + textEnd + '</span>';
								var cursorPosition = textStart.length + textInSpan.length + 34;
							}
						}
					
						const start = {line: change.from.line , ch: 0};
						const finish = {line: change.from.line , ch: lineLength};
						const cursorNew = {line: change.from.line , ch: cursorPosition};

						setTimeout(function() {

							cm.replaceRange(replacementText, start, finish);
							cm.focus();
							cm.setCursor(cursorNew);	

						}, 100);
						
						}
				});
			});
		};

		return {
			plugin: plugin,
			codeMirrorOptions: {
    			'highlighter': true,
			}
        }
    }
}