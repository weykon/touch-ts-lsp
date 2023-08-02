import { createSystem, createVirtualTypeScriptEnvironment } from "@typescript/vfs";
import ts from "typescript";

const fsMap = new Map<string, string>();
fsMap.set("fake.ts", `console.log("Hello World");type a='1';`);
const system = createSystem(fsMap);

const compilerOpts = {}
const env = createVirtualTypeScriptEnvironment(system, ["fake.ts"], ts, compilerOpts)

// You can then interact with the languageService   to introspect the code
env.languageService.getDocumentHighlights("fake.ts", 0, ["fake.ts"])