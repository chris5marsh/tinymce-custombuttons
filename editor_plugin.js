(function() {
  // Load plugin specific language pack
  tinymce.PluginManager.requireLangPack('custombuttons');

  tinymce.create('tinymce.plugins.CustomButtons', {
    /**
     * Initializes the plugin, this will be executed after the plugin has been created.
     * This call is done before the editor instance has finished it's initialization so use the onInit event
     * of the editor instance to intercept that event.
     *
     * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
     * @param {string} url Absolute URL to where the plugin is located.
     */
    init : function(ed, url) {

      // JSON object - which editors should we update?
      var replacements = {
        "CaptionText": {
          "theme_advanced_buttons1":"bold,italic,|,t4section,link,unlink,|,undo,redo",
          "theme_advanced_buttons2":false,
          "theme_advanced_buttons3":false
        },
        "SimpleText": {
          "theme_advanced_buttons1":"bold,italic,|,cut,copy,paste,|,pastetext,pasteword,selectall,|,link,unlink",
          "theme_advanced_buttons2":"search,replace,|,bullist,numlist,|,undo,redo,|,charmap,fullscreen,anchor,code,t4section,t4media,thirdlight,t4spellcheck,t4cleanup",
          "theme_advanced_buttons3":false,
        },
        "CompleteText": {
          "theme_advanced_buttons1":"bold,italic,|,styleselect,formatselect,|,cut,copy,paste,|,pastetext,pasteword,selectall,|,link,unlink",
          "theme_advanced_buttons2":"search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,hr,|,sub,sup,|,charmap,fullscreen,anchor,code,t4section,t4media,t4spellcheck,t4cleanup",
          "theme_advanced_buttons3":"tablecontrols",
        }
      };

      // What's the classname prefixed with?
      var prefix = 't4_content_element_';

      // Remove prefix
      var editorName = ed.id.substr(prefix.length);

      // Check if it's in the replacements array
      if (!replacements[editorName]) return;

      // Check if it's already been through this process!
      if (ed.settings["theme_custombuttons"] === true) return;

      // Run after initialisation
      ed.onInit.add(function(ed){

        // Replace the necessary values
        var settings = jQuery.extend(true, {}, ed.settings);

        console.log(settings);

        /*/ Remove this plugin from the settings so it doesn't recurse
        // Not needed - flag set in settings["theme_custombuttons"]
        var plugins = settings.plugins.split(',');
        jQuery.each(plugins, function(i, plugin) {
          if (plugin.trim() === 'custombuttons') {
            plugins.splice(i, 1);
          }
        });
        settings.plugins = plugins.join(',');
        */

        jQuery.each(replacements[editorName], function(key, value) {
          settings[key] = value;
        });
        // Remove buttons that have been added manually?
        settings["theme_advanced_buttons1_add"] = false;
        settings["theme_advanced_buttons2_add"] = false;
        settings["theme_advanced_buttons3_add"] = false;
        settings["theme_custombuttons"] = true;

        console.log(settings);
        //tinymce.init(settings);
      });

    },

    /**
     * Returns information about the plugin as a name/value array.
     * The current keys are longname, author, authorurl, infourl and version.
     *
     * @return {Object} Name/value array containing information about the plugin.
     */
    getInfo : function() {
      return {
        longname : 'CustomButtons browser plugin',
        author : 'Chris Marsh, University of York',
        authorurl : 'https://www.york.ac.uk',
        infourl : 'https://www.york.ac.uk',
        version : "1.0"
      };
    }
  });

  // Register plugin
  tinymce.PluginManager.add('custombuttons', tinymce.plugins.CustomButtons);
})();

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
