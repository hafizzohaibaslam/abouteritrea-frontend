// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/emoticons.min.js";

import FroalaEditorComponent from "react-froala-wysiwyg";
import { useEffect, useState } from "react";

const Editor = ({ credentials, setCredentials }) => {
  const [model, setModel] = useState(credentials?.content);

  useEffect(() => {
    setCredentials({ ...credentials, content: model });
  }, [model]);

  return (
    <div className="w-full" id="froala-editor">
      <FroalaEditorComponent
        tag="textarea"
        model={model}
        onModelChange={(e) => setModel(e)}
        config={{
          placeholderTect: "Start writing your article...",
          listAdvancedTypes: true,
        //   fontSize: ["12", "14"],
          toolbarButtons: {
            moreText: {
              buttons: [
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "subscript",
                "superscript",
                "fontFamily",
                "fontSize",
                "textColor",
                "backgroundColor",
                "inlineClass",
                "inlineStyle",
                "clearFormatting",
              ],
            },

            moreParagraph: {
              buttons: [
                "alignLeft",
                "alignCenter",
                "formatOLSimple",
                "alignRight",
                "alignJustify",
                "formatOL",
                "formatUL",
                "paragraphFormat",
                "paragraphStyle",
                "lineHeight",
                "outdent",
                "indent",
                "quote",
              ],
            },
          },
        }}
      />
    </div>
  );
};

export default Editor;
