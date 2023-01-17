import React, { useMemo } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Embed from "@editorjs/embed";
import LinkTool from "@editorjs/link";

const Editor = () => {
  const editor = useMemo(
    () =>
      new EditorJS({
        /**
         * Id of Element that should contain the Editor
         */
        holder: "editorHolder",
        minHeight: 80,
        onReady: () => {
          console.log("Editor.js is ready to work!");
        },
        placeholder: "Let`s write an awesome story!",
        tools: {
          header: Header, // https://github.com/editor-js/header
          embed: {
            // https://github.com/editor-js/embed
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true,
                codepen: {
                  regex:
                    /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
                  embedUrl:
                    "https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2",
                  html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                  height: 300,
                  width: 600,
                  id: (groups) => groups.join("/embed/"),
                },
              },
            },
          },
          linkTool: {
            // https://github.com/editor-js/link
            class: LinkTool,
            config: {
              endpoint: "", // Your backend endpoint for url data fetching,
            },
          },
        },
      }),
    []
  );
  return undefined;
};

export default Editor;
