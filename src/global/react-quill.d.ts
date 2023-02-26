declare module "react-quill" {
  import ReactQuill from "react-quill";
  import type { Quill } from "react-quill";

  interface ReactQuillProps {
    onLoad?: (quill: Quill) => void;
  }

  export default ReactQuill;
}
