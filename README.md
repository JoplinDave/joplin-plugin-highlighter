# Joplin Highlighter Plugin

A plugin for [Joplin](https://joplinapp.org/) that allows notes to be highlighted using the `MARK` tag or a `SPAN` tag with background colour.

**Requires Joplin 1.7+ and only works in markdown editor**

## Demo
![](docs/highlighter.gif)

## Usage

1) There are no buttons, menus or popups for this plugin.

2) Entering a recognised 'Highlight' string directly into the editor will insert the `MARK` or `SPAN` tag into the text in the appropriate place.

3) The plugin has been designed to be able to highlight existing text or or the ability to enter new text after the tag has been inserted.

**The format is [ h : colour : scope ]** - (including the square brackets and no spaces between the characters)

The 'h' character confirms to the plugin that the request belongs to the plugin and should perform the requested action.

Colour can be one of the following

- m = mark (no colour as the `MARK` tag is inserted instead of the `SPAN` tag)
- r = red
- g = green
- b = blue
- y = yellow

Scope can be one of the following

- e = empty (an empty span is inserted)
- w = word
- s = sentence
- l = line

# Examples

Entering `[h:b:w]` will highlight the proceeding word in blue

Entering `[h:y:l]` will highlight to the end of the line in yellow

Entering `[h:m:e]` will insert empty `MARK` tags ready for you to enter data

All characters are case insenstive.