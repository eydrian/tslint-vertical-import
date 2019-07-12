import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: 'vertical-import',
    description: 'Imports must be vertically aligned',
    rationale: Lint.Utils.dedent`
          To facilitate merge request and reordering of imports, e.g. alphabetically, the imports must be split vertically
      `,
    optionsDescription: Lint.Utils.dedent``,
    options: {
      type: 'array',
      items: {
        type: 'string',
        enum: [],
      },
      minLength: 0,
      maxLength: 0,
    },
    optionExamples: [true],
    type: 'typescript',
    typescriptOnly: true,
    hasFix: false,
  };

  public static FAILURE_STRING = 'Imports must be vertically aligned';
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
  }
}

// The walker takes care of all the work.
class NoImportsWalker extends Lint.RuleWalker {
  public visitImportDeclaration(node: ts.ImportDeclaration) {
    const text = node.getText(this.getSourceFile());
    const aliasImport = new RegExp('import\\s*\\*\\s*as\\s*.*\\sfrom\\s*\'.*\'\;?', 'gm'); // alias imports can be on one line
    const simpleImport = new RegExp('import\\s*\'.*\'\;?', 'gm'); // complete imports can be on one line
    const defaultImport = new RegExp('import\\s+\\w*\\s+from\\s+\'.*\'\;?', 'gm'); // default import can be on one line

    if (!aliasImport.test(text) && !simpleImport.test(text) && !defaultImport.test(text)) {
      const lines = text.split('\n');
      const hasMultipleImportsOnOneLine = this.hasMultipleImportsOnSign(lines, ',');

      const hasImportsOnFirstLine = this.hasMultipleImportsOnSign(lines, '{');
      const hasImportsOnLastLine = this.hasMultipleImportsOnSign(lines, '}');

      if (lines.length < 3 || hasMultipleImportsOnOneLine || hasImportsOnFirstLine || hasImportsOnLastLine) {
        const statement = this.getImportStatement(text);
        const fix = new Lint.Replacement(node.getStart(), node.getWidth(), statement);
        this.addFailureAt(node.getStart(), node.getWidth(), Rule.FAILURE_STRING, fix);
      }
    }
    super.visitImportDeclaration(node);
  }

  private getImportStatement(importString: string): string {
    const importStatement = importString.split('{');
    const fromStatement = ([] as string[])
      .concat(...importStatement.map(i => i.split('}')));
    const lines = ([] as string[])
      .concat(...fromStatement.map(i => i.split('\n')))
      .filter(s => s.length > 0);
    const statements = ([] as string[])
      .concat(...lines.map(line => line.split(',')))
      .map(s => s.trim())
      .filter(s => s.length > 0);
    const nrStatements = statements.length;

    const importBody = statements.slice(1, nrStatements - 1).map(s => `  ${ s },`);

    const statement = [
      `${ statements[0] } {`,
      ...importBody,
      `} ${ statements[nrStatements - 1] }`,
    ].join('\n');

    return statement;
  }

  private hasMultipleImportsOnSign(lines: string[], sign: string): boolean {
    return lines
    .map(line => line.split(sign)
    .filter(s => s.length > 0))
    .some(line => line.length !== 1);
  }
}
