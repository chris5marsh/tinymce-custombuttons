# Custom Buttons in TinyMCE

This plugin for TinyMCE reads the name of a Content Type in SiteManager and, if it matches a configured set, replaces the standard set of TinyMCE buttons with a custom set.

## How to use it

You can find out how to upload TinyMCE plugins on the [T4 website (login needed)](https://community.terminalfour.com/how-to/customise-tinymce-plug-in/).

The zip file needs to contain the whole directory structure on the server:

```
static
  └ common
     └ tiny_mce
        └ plugins
           └ custombuttons
               ├ langs
               │   └ en.js
               ├ custombuttons.js
               └ plugin-config.xml
```

## How it works

The script defines an object called `replacements`, which has content type names as keys and TinyMCE button definitions as values.

```
var replacements = {
  "SimpleText": {
    "theme_advanced_buttons1":"bold,italic,|,cut,copy,paste,|,pastetext,pasteword,selectall,|,link,unlink",
    "theme_advanced_buttons2":"search,replace,|,bullist,numlist,|,undo,redo,|,charmap,fullscreen,anchor,code,t4section,t4media,t4spellcheck,t4cleanup",
    "theme_advanced_buttons3":false,
  },
  { ... },
  { ... },
  etc.
};
```

Each time a TinyMCE editor is initiated, the script checks to see if the Content Type name exists in `replacements` and, if it does, replaces the button rows with the rows from the `replacements` object.
