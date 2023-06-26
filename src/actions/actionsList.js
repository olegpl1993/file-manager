import path from "path";
import fs from "fs";
import zlib from "zlib";
import { currentDirectory } from "../index.js";
import { up } from "./up.js";
import { cd } from "./cd.js";
import { ls } from "./ls.js";
import { cat } from "./cat.js";
import { add } from "./add.js";
import { rn } from "./rn.js";
import { cp } from "./cp.js";
import { mv } from "./mv.js";
import { rm } from "./rm.js";
import { osActions } from "./osActions.js";
import { hash } from "./hash.js";
import { compress } from "./compress.js";
import { decompress } from "./decompress.js";

export const actionsList = {
  ".exit": () => {
    process.exit(0);
  },
  up,
  cd,
  ls,
  cat,
  add,
  rn,
  cp,
  mv,
  rm,
  os: osActions,
  hash,
  compress,
  decompress,
};
