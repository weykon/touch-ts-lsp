import * as ts from "typescript";

const file_path = './src/type.ts'
// 创建一个程序
const program = ts.createProgram([file_path], {});
// console.log(program);
// 获取类型检查器
const checker = program.getTypeChecker();
// console.log(checker);
// 获取源文件
const sourceFile = program.getSourceFile(file_path);
// 遍历源文件的所有节点
function visit(node: ts.Node) {
  node.forEachChild((n) => {
    if (ts.isTypeAliasDeclaration(n) || ts.isInterfaceDeclaration(n)) {
      console.log(n.name.getText());
      console.log( n.getText());
      n.forEachChild((child) => {
        if(ts.isPropertySignature(child)){
          console.log('PropertySignature:',child.getText());
          // console.log( checker.(child))
        }
      })
    }
  });
  if (ts.isVariableDeclaration(node)) {
    const symbol = checker.getSymbolAtLocation(node.name);
    if (symbol) {
      const type = checker.getTypeOfSymbolAtLocation(
        symbol,
        symbol.valueDeclaration!,
      );
      console.log(
        `Type of ${symbol.getName()} is ${checker.typeToString(type)}`,
      );
    }
  }
  ts.forEachChild(node, visit);
}

console.log(process.cwd());
if (sourceFile) {
  console.log("visit");
  visit(sourceFile);
}
