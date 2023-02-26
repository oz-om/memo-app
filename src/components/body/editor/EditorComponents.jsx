import { getCreateBlock, placeCaretAtEnd } from "../../../global";

function editor() {
  return document.querySelector(".ql-container.ql-snow .ql-editor");
}

//editor controls
function validStyle() {
  let saveChangesBtn = document.querySelector(".noteControls .saveChanges");
  if (saveChangesBtn) {
    saveChangesBtn.classList.remove("pointer-events-none", "text-green-200", "border-green-100");
    saveChangesBtn.classList.add("text-green-400", "border-green-400", "cursor-pointer");
  }
}
function goBack() {
  getCreateBlock();
  setInputs("", "", "white", "");
}
function checkChanges(newChanges, defaultValue) {
  let isChanged = false;
  if (newChanges !== defaultValue) {
    isChanged = true;
  }
  return {
    isChanged,
  };
}
// @ts-ignore
function setInputs(title, note, bgColor, color) {
  // @ts-ignore
  let noteTitle = document.querySelector(".ql-container.ql-snow .noteTitle");
  let titleStyle = document.documentElement.style;

  //@ts-ignore
  let editorDoc = editor();

  if (noteTitle) {
    // @ts-ignore
    noteTitle.value = title;
  }
  if (editorDoc) {
    editorDoc.innerHTML = note;
    // @ts-ignore
    editorDoc.style.backgroundColor = bgColor;
    // @ts-ignore
    editorDoc.style.color = color;
  }
  titleStyle.setProperty("--editor-bgColor", bgColor);
  titleStyle.setProperty("--editor-color", color);
}
function getFolder() {
  const folders = document.querySelectorAll(".mainBody .folders li");
  const folder = [...folders].filter((f) => {
    return f.classList.contains("active");
  });
  if (folder.length > 0) {
    //@ts-ignore
    return folder[0].dataset.id;
  }
  return null;
}
function toggleThemes(icon) {
  document.querySelectorAll(".theme .themeList").forEach((list) => {
    if (list != icon.nextElementSibling) {
      list.classList.add("hidden");
      list.classList.remove("flex");
    }
  });
}

// text fonts component
function showFonts(target) {
  document.querySelector(".fonts .themeList").classList.toggle("hidden");
  toggleThemes(target);
}
let textFontActions = [
  {
    name: "sans-serif",
    cmd: "fontName",
    type: "textFont",
  },
  {
    name: "system-ui",
    cmd: "fontName",
    type: "textFont",
  },
  {
    name: "serif",
    cmd: "fontName",
    type: "textFont",
  },
  {
    name: "cursive",
    cmd: "fontName",
    type: "textFont",
  },
  {
    name: "monospace",
    cmd: "fontName",
    type: "textFont",
  },
  {
    name: "fantasy",
    cmd: "fontName",
    type: "textFont",
  },
];
function applyFontEffect(target) {
  //@ts-ignore
  let noteEditor = editor();
  placeCaretAtEnd(noteEditor);
  let cmd = target.dataset.cmd,
    value = target.dataset.value;

  document.execCommand(cmd, false, value);
  document.querySelectorAll("[data-type=textFont]").forEach((ele) => {
    ele.classList.remove("border-orange-100");
  });
  target.classList.add("border-orange-100");
  target.parentElement.classList.add("hidden");
}
function TextFont(props) {
  const { name, cmd, type } = props;
  return (
    <li
      onClick={(e) => {
        //@ts-ignore
        applyFontEffect(e.target);
      }}
      data-cmd={cmd}
      data-value={name}
      data-type={type}
      className={"border-2 px-2 rounded-sm mt-1 cursor-pointer text-sm"}
      style={{
        fontFamily: name,
      }}
    >
      {name}
    </li>
  );
}

// text theme component
let editorThemeActions = [
  {
    cmd: "foreColor",
    textColor: "text-red-50",
    bgColor: "bg-red-600",
  },
  {
    cmd: "foreColor",
    textColor: "text-green-50",
    bgColor: "bg-green-600",
  },
  {
    cmd: "foreColor",
    textColor: "text-blue-50",
    bgColor: "bg-blue-600",
  },
  {
    cmd: "foreColor",
    textColor: "text-pink-50",
    bgColor: "bg-pink-600",
  },
];
function showThemes() {
  document.querySelector(".themeColor .themeList").classList.toggle("hidden");
  document.querySelector(".themeColor .themeList").classList.toggle("flex");
}
function applyTheme(target) {
  //@ts-ignore
  let editorDoc = editor();

  let titleStyle = document.documentElement.style;
  //@ts-ignore
  let noteStyle = editorDoc.style;

  let textColor = getComputedStyle(target).backgroundColor;
  let bgColor = getComputedStyle(target).color;

  titleStyle.setProperty("--editor-bgColor", bgColor);
  titleStyle.setProperty("--editor-color", textColor);

  noteStyle.setProperty("background-color", bgColor);
  noteStyle.setProperty("color", textColor);
  showThemes();
}
function Theme(toolBar) {
  let themeContainer = document.createElement("span");
  themeContainer.className = "ql-formats themeColor relative grid place-content-center";
  let themeIcon = document.createElement("i");
  //@ts-ignore
  themeIcon.classList = "iconoir-flower cursor-pointer pt-1.5";
  themeIcon.onclick = (e) => showThemes();
  let themeUL = document.createElement("ul");
  //@ts-ignore
  themeUL.classList = "themeList absolute flex-col gap-1 -right-3.5 bg-gray-200 p-1 rounded z-[1] hidden";

  editorThemeActions.forEach((theme) => {
    let themeItem = document.createElement("li");
    themeItem.onclick = (e) => {
      applyTheme(e.target);
    };
    themeItem.setAttribute("data-cmd", theme.cmd);
    //@ts-ignore
    themeItem.classList = `h-6 w-10 rounded cursor-pointer ${theme.bgColor} ${theme.textColor}`;
    themeUL.append(themeItem);
  });
  themeContainer.append(themeIcon, themeUL);
  toolBar.append(themeContainer);
  // return (
  //   <li
  //     onClick={(e) => {
  //       applyTheme(e.target);
  //     }}
  //     data-cmd={cmd}
  //     className={`h-6 w-10 rounded cursor-pointer ${bgColor} ${textColor}`}
  //   ></li>
  // );
}

export {
  // text font
  showFonts,
  TextFont,
  textFontActions,
  // editor theme
  showThemes,
  Theme,
  editorThemeActions,
  validStyle,
  checkChanges,
  setInputs,
  getFolder,
  goBack,
};
