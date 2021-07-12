import * as path from "path";
import { Project, Type, Node, ts } from "ts-morph";
import prettier from "prettier";

const tsConfigFilePath = path.resolve(process.cwd(), "tsconfig.json");
const publicTypesFilePath = path.resolve(process.cwd(), "src/public-types.ts");

const project = new Project({ tsConfigFilePath });
const source = project.getSourceFile(publicTypesFilePath);

class Builder {
  _output = "";

  append(text: string, identation = 0) {
    this._output += " ".repeat(identation) + text;
  }

  break() {
    this._output += "\n";
  }

  line(text: string, identation = 0) {
    this.append(text, identation);
    this.break();
  }

  output() {
    return this._output;
  }
}

const buildObjectType = (builder: Builder, type: Type, node: Node) => {
  builder.line(`type ${type.getText()} = {`);
  type.getProperties().forEach((prop) => {
    builder.line(`${prop.getName()}: ${prop.getTypeAtLocation(node).getText()};`, 2);
  });
  builder.line("}");
};

const buildUnionType = (builder: Builder, type: Type, node: Node) => {
  const unionTypes = type.getUnionTypes();
  builder.line(`type ${type.getText()} = {`);
  unionTypes.forEach((type, index) => {
    type.getProperties().forEach((prop) => {
      builder.line(`${prop.getName()}: ${prop.getTypeAtLocation(node).getText()};`, 2);
    });
    const isLast = index === unionTypes.length - 1;
    builder.line(isLast ? "}" : "} | {");
  });
};

if (source) {
  const exportedDeclarations = source.getExportedDeclarations();

  exportedDeclarations.forEach(([declaration], key) => {
    console.log("----------------");
    const identifier = declaration.getChildrenOfKind(ts.SyntaxKind.Identifier)[0]?.getText();
    console.log(identifier);

    function resolvedNodeType(node: Node) {
      function resolveValueType(type: Type, identation = 0): string {
        if (
          type.isNull() ||
          type.isUndefined() ||
          type.isString() ||
          type.isStringLiteral() ||
          type.isNumber() ||
          type.isNumberLiteral() ||
          type.isAny() ||
          type.isUnknown() ||
          type.isLiteral() ||
          type.isBoolean()
        ) {
          return type.getText();
        }

        if (type.isArray()) {
          return resolveValueType(type.getArrayElementType()!, identation) + "[]";
        }

        if (type.isTuple()) {
          return (
            "[" +
            type
              .getUnionTypes()
              .map((t) => resolveValueType(t, identation))
              .join(", ") +
            "]"
          );
        }

        if (type.isUnion()) {
          return type
            .getUnionTypes()
            .map((t) => resolveValueType(t, identation))
            .join(" | ");
        }

        if (type.isIntersection()) {
          return type
            .getIntersectionTypes()
            .map((t) => resolveValueType(t, identation))
            .join(" & ");
        }

        if (type.isNumber()) {
          return type.getText();
        }

        if (type.isObject()) {
          if (type.compilerType.symbol.getName() == "__function") {
            return resolveFunction(type, identation);
          }

          return resolveObject(type, identation);
        }

        console.error("Unhandled type " + type.compilerType);
        return "any";
      }

      function resolveFunction(type: Type, identation = 0) {
        const signature = type.getCallSignatures()[0];
        const parameters = signature.getParameters().map((parameter) => {
          return {
            name: parameter.getEscapedName(),
            value: parameter.getTypeAtLocation(node).getText(),
          };
        });
        const returntype = signature.getReturnType();
        const resolvedReturnType = returntype.getText();
        return (
          "(" +
          parameters.map(({ name, value }) => `${name}: ${value};`) +
          ") => " +
          resolvedReturnType
        );
      }

      function resolveObject(type: Type, identation = 0) {
        const resolvedProperties = type.getProperties().map((property) => {
          return {
            name: property.getEscapedName(),
            value: resolveValueType(property.getTypeAtLocation(node), identation + 2),
          };
        });

        const numberIndexType = type.getNumberIndexType();
        if (numberIndexType) {
          resolvedProperties.push({
            name: `[k: number]`,
            value: resolveValueType(numberIndexType, identation),
          });
        }

        const stringIndexType = type.getStringIndexType();
        if (stringIndexType) {
          resolvedProperties.push({
            name: `[k: string]`,
            value: resolveValueType(stringIndexType, identation),
          });
        }

        return (
          "{\n" +
          resolvedProperties
            .map(({ name, value }) => `${" ".repeat(identation + 2)}${name}: ${value};`)
            .join("\n") +
          `\n${" ".repeat(identation)}}`
        );
      }

      const output = resolveValueType(node.getType());
      return output;
    }

    const typeQuery = declaration.getChildrenOfKind(ts.SyntaxKind.TypeQuery)[0];
    if (typeQuery) {
      console.log("is type query");
      console.log(resolvedNodeType(typeQuery));
    }

    const typeLiteral = declaration.getChildrenOfKind(ts.SyntaxKind.TypeLiteral)[0];
    if (typeLiteral) {
      console.log("is type literal");
      console.log(resolvedNodeType(typeLiteral));
    }

    const typeReference = declaration.getChildrenOfKind(ts.SyntaxKind.TypeReference)[0];
    if (typeReference) {
      console.log("is type reference");
      console.log(resolvedNodeType(typeReference));
    }

    const indexedAccessType = declaration.getChildrenOfKind(ts.SyntaxKind.IndexedAccessType)[0];
    if (indexedAccessType) {
      console.log("is indexed access type");
      console.log(resolvedNodeType(indexedAccessType));
    }

    const functionType = declaration.getChildrenOfKind(ts.SyntaxKind.FunctionType)[0];
    if (functionType) {
      console.log("is function type");
      console.log(resolvedNodeType(functionType));
      functionType;
    }
  });
}
