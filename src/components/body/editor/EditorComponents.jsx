import { getCreateBlock } from "../../../global";

function editor() {
  return document.querySelector(".createBlock .noteContent iframe");
}

//editor controls
function validStyle() {
  let saveChangesBtn = document.querySelector(".saveChanges");
  if (saveChangesBtn) {
    saveChangesBtn.classList.remove("pointer-events-none", "text-green-200", "border-green-100");
    saveChangesBtn.classList.add("text-green-400", "border-green-400");
  }
}
function goBack() {
  getCreateBlock();
  setInputs("", "", "white", "");
}
function checkChanges(newChanges, defaultValue) {
  let inputValue;
  let isChanged = false;
  if (newChanges.length > 0) {
    inputValue = newChanges;
    isChanged = true;
  } else {
    inputValue = defaultValue;
  }
  return {
    inputValue,
    isChanged,
  };
}
function setInputs(title, note, bgColor, color) {
  let noteTitle = document.querySelector(".noteContent .title input");
  let titleStyle = document.documentElement.style;

  //@ts-ignore
  let editorDoc = document.querySelector(".createBlock .noteContent iframe").contentDocument;
  // @ts-ignore
  noteTitle.value = title;
  if (editorDoc) {
    editorDoc.body.innerHTML = note;
    editorDoc.body.style.backgroundColor = bgColor;
    editorDoc.body.style.color = color;
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
    return folder[0].textContent;
  } else {
    return "all";
  }
}
function toggleThemes(icon) {
  document.querySelectorAll(".theme .themeList").forEach((list) => {
    if (list != icon.nextElementSibling) {
      list.classList.add("hidden");
      list.classList.remove("flex");
    }
  });
}

// Text control component
let textActions = [
  {
    icon: "iconoir-align-left",
    cmd: "justifyLeft",
    group: "position",
  },
  {
    icon: "iconoir-align-center",
    cmd: "justifyCenter",
    group: "position",
  },
  {
    icon: "iconoir-align-right",
    cmd: "justifyRight",
    group: "position",
  },
  {
    icon: "iconoir-italic",
    cmd: "italic",
    group: "noGroup",
  },
  {
    icon: "iconoir-underline",
    cmd: "underline",
    group: "noGroup",
  },
  {
    icon: "iconoir-bold",
    cmd: "bold",
    group: "noGroup",
  },
];
function applyTextControlsEffect(target) {
  // @ts-ignore
  let editorDoc = editor().contentDocument;
  let cmd = target.dataset.cmd;
  let group = target.dataset.group;
  if (group != "noGroup") {
    document.querySelectorAll(`[data-group=${group}]`).forEach((ele) => {
      ele.classList.remove("border-blue-400");
    });
    target.classList.add("border-blue-400");
  } else {
    target.classList.toggle("border-blue-400");
  }
  editorDoc.execCommand(cmd, false, null);
}
function TextControl(props) {
  const { icon, cmd, group } = props;
  return (
    <i
      onClick={(e) => {
        applyTextControlsEffect(e.target);
      }}
      data-cmd={cmd}
      data-group={group}
      className={icon + " border rounded-md cursor-pointer"}
    ></i>
  );
}

// text Size Component
let textSizeActions = [
  {
    icon: "https://svgshare.com/i/ou3.svg",
    cmd: "fontSize",
    type: "increment",
    group: "textSize",
  },
  {
    icon: "https://svgshare.com/i/osn.svg",
    cmd: "fontSize",
    type: "decrement",
    group: "textSize",
  },
];
let maxSize = 6,
  minSize = 3,
  textSize = minSize;
function applyTextSizeEffect(target) {
  //@ts-ignore
  let editorDoc = editor().contentDocument,
    cmd = target.dataset.cmd,
    type = target.dataset.type,
    group = target.dataset.group;
  if (type == "increment") {
    if (maxSize > textSize) {
      textSize++;
      editorDoc.execCommand(cmd, false, textSize);
    }
  } else {
    if (minSize < textSize) {
      textSize--;
      editorDoc.execCommand(cmd, false, textSize);
    }
  }

  document.querySelectorAll(`[data-group=${group}]`).forEach((ele) => {
    ele.classList.remove("border-blue-400");
  });
  target.classList.add("border-blue-400");
}
function TextSize(props) {
  const { icon, cmd, type, group } = props;
  return (
    <img
      onClick={(e) => {
        applyTextSizeEffect(e.target);
      }}
      src={icon}
      className={"w-7 h-7 border rounded-md cursor-pointer"}
      data-cmd={cmd}
      data-type={type}
      data-group={group}
    />
  );
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
  let editorDoc = editor().contentDocument,
    cmd = target.dataset.cmd,
    value = target.dataset.value;

  editorDoc.execCommand(cmd, false, value);
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
function showThemes(target) {
  document.querySelector(".themeColor .themeList").classList.toggle("hidden");
  document.querySelector(".themeColor .themeList").classList.toggle("flex");
  toggleThemes(target);
}
function applyTheme(target) {
  //@ts-ignore
  let editorDoc = editor().contentDocument;

  let titleStyle = document.documentElement.style;
  let noteStyle = editorDoc.body.style;

  let textColor = getComputedStyle(target).backgroundColor;
  let bgColor = getComputedStyle(target).color;

  titleStyle.setProperty("--editor-bgColor", bgColor);
  titleStyle.setProperty("--editor-color", textColor);

  noteStyle.setProperty("background-color", bgColor);
  noteStyle.setProperty("color", textColor);
}
function Theme(props) {
  const { cmd, bgColor, textColor } = props;
  return (
    <li
      onClick={(e) => {
        applyTheme(e.target);
      }}
      data-cmd={cmd}
      className={`h-6 w-10 rounded cursor-pointer ${bgColor} ${textColor}`}
    ></li>
  );
}

export {
  // text controls
  TextControl,
  textActions,
  //text size
  TextSize,
  textSizeActions,
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
