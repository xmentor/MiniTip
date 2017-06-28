# MiniTip

## Download
[MiniTip - download link](https://github.com/minitip/archive/master.zip)

## Instalation
Add style to head, but script add to body.
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- meta tags -->
        <link rel="stylesheet" href="path/minitip.css">
        <!-- your styles -->
    </head>
    <body>
        <!-- some scripts -->
        <script src="path/minitip.min.js"></script>
    </body>
</html>

```
## Basic usage
You just have to add attribute ```data-tip="with content"``` to your tags.
For example:
```html
<input type="text" id="number" data-tip="Give me your phone number! Format: 000-000-000">
```
or:
```html
<button data-tip="Close the dialog">Close</button>
```
## Todo
* add check if the tip is outside the window