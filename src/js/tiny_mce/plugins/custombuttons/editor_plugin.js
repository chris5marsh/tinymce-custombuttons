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

      var replacements = {};

      // What's the classname prefixed with?
      var prefix = 't4_content_element_';

      // Remove prefix
      var editorName = ed.id.substr(prefix.length);

      ed.onPreInit.add(function(ed) {
        console.log('PreInit: ' + ed.id);
      });

      // Run after rendering
      ed.onPostRender.add(function(ed) {
        console.log('PostRender: ',ed);
        jQuery.getJSON("http://localhost:1723/custombuttons.json", function(data) {
          replacements = data;
          // Check if it's in the replacements array
          if (!replacements[editorName]) return;

          jQuery.each(replacements[editorName], function(key, value) {
            ed.theme.settings[key] = value;
          });
          // Remove buttons that have been added manually?
          ed.theme.settings.theme_advanced_buttons1_add = false;
          ed.theme.settings.theme_advanced_buttons2_add = false;
          ed.theme.settings.theme_advanced_buttons3_add = false;

          ed.theme.renderUI();

          console.log('Data loaded', ed.theme);

        });
      });

      // Run before rendering
      ed.onBeforeRenderUI.add(function(ed, cm) {

        console.log('BeforeRenderUI: ' + ed.id);

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
        version : "1.1"
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
