# Joplin Inline Tags Plugin

A plugin for [Joplin](https://joplinapp.org/) that allows notes to be highlighted using the <MARK> tag or a <SPAN> tag with background colour.

**Requires Joplin 1.7+ and only works in markdown editor**

## Demo
![](graphics/highlighter.gif)

## Usage

Entering a recognised 'Highlight' string directly into the editor will insert the <MARK> or <SPAN> tag into the text. The plugin has been designed to be able to highlight existing text or subsequently enter new text once the tag has been added. There are no buttons, menus or popups 


**The format is [ h : colour : scope ]** - (including the square brackets)

Colours can be

m = mark (no colour as the <MARK> tag is inserted)
r = red
g = green
b = blue
y = yellow

Scope the of the highlight

e = empty (an empty span is inserted)
w = word
s = sentence
l = line

#Examples

Entering [h:b:w] will highlight the proceeding word in blue

Entering [h:y:l] will highlight to the end of the line in yellow

Entering [h:m:e] will insert empty <MARK> tags ready for you to enter data

## Plugin location

A pre-built plugin can be found in `/publish` called joplin.plugin.highlighter.jpl. Alternatively a JPL archive can be found at the root.