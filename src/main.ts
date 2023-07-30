import * as ts from "typescript";
import * as fs from "fs";

const fake_file_content = `console.log("Hello World");
class Hello {
    words : string
}`;

function main() {
  const complier_host: ts.CompilerHost = {
    getSourceFile: () =>
      ts.createSourceFile("fake.ts", fake_file_content, ts.ScriptTarget.Latest),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => {},
    getCurrentDirectory: () => "/",
    getCanonicalFileName: (fileName) => fileName,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: () => true,
    readFile: (fileName) => "",
  };
  const options = {
    ...ts.getDefaultCompilerOptions(),
    strict: true,
    skipLibCheck: true,
    noLib: true,
    types: [],
  };
  const complier_program = ts.createProgram(
    ["fake.ts"],
    options,
    complier_host,
    // 本来这里还有一个参数，但是我不会
  );

  const checker = complier_program.getTypeChecker();

  

  // 语义
  const semantic = complier_program.getSemanticDiagnostics();
  console.log("semantic", semantic);

  // 语法
  const syntactic = complier_program.getSyntacticDiagnostics();
  console.log("syntactic", syntactic);
}

main();
