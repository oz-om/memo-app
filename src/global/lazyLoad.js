import { lazy } from "react";
export function lazyLoad(path, nameExport) {
  return lazy(() => {
    const module = import(path);
    if (!nameExport) {
      return module;
    } else {
      return module.then((module) => ({ default: module[nameExport] }));
    }
  });
}
