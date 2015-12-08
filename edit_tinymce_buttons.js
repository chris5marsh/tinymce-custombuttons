jQuery(function() {

  var replacements = {
    "CaptionText": {
      "theme_advanced_buttons1":"bold,italic,|,t4section,link,unlink,|,undo,redo",
      "theme_advanced_buttons2":false,
      "theme_advanced_buttons3":false
    },
    "SimpleText": {
      "theme_advanced_buttons1": "bold,italic,|,cut,copy,paste,|,pastetext,pasteword,selectall,|,link,unlink",
      "theme_advanced_buttons2": "search,replace,|,bullist,numlist,|,undo,redo,|,charmap,fullscreen,anchor,code,t4section,t4media,t4spellcheck,t4cleanup",
      "theme_advanced_buttons3": false,
    },
    "CompleteText": {
      "theme_advanced_buttons1": "bold,italic,|,styleselect,formatselect,|,cut,copy,paste,|,pastetext,pasteword,selectall,|,link,unlink",
      "theme_advanced_buttons2": "search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,hr,|,sub,sup,|,charmap,fullscreen,anchor,code,t4section,t4media,t4spellcheck,t4cleanup",
      "theme_advanced_buttons3": "tablecontrols",
    }
  };
  jQuery.each(tinymce.editors, function(i, editor) {

    // Remove 't4_content_element_'
    var editorName = editor.id.substr(19);

    // Check if it's in the replacements array
    if (!replacements[editorName]) return;

    // Replace the necessary values
    var settings = jQuery.extend(true, {}, editor.settings);
    editor.remove();
    jQuery.each(replacements[editorName], function(key, value) {
      settings[key] = value;
    });
    tinymce.init(settings);

  });

});