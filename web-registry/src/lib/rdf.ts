/* eslint-disable prettier/prettier */
import Parser from '@rdfjs/parser-jsonld';
import SHACLValidator, { ValidationReport } from 'rdf-validate-shacl';
import factory from 'rdf-ext';
import DatasetExt from 'rdf-ext/lib/Dataset';
import { Readable } from 'stream';

// loadDataset parses and loads the given JSON-LD string into
// the rdf-ext data factory.
async function loadDataset(jsonLd: string): Promise<DatasetExt> {
  const stream = new Readable({
    read: () => {
      stream.push(jsonLd);
      stream.push(null);
    },
  });
  const parser = new Parser({ factory });
  return factory.dataset().import(parser.import(stream));
}

// validate validates the data in dataStr as JSON-LD string
// using the SHACL graph in shapesStr.
// If an optional group is passed, it will validate against shapes
// of the given sh:group.
export async function validate(
  shapesStr: string,
  dataStr: string,
  group?: string,
): ValidationReport {
  const shapes = await loadDataset(shapesStr);
  const data = await loadDataset(dataStr);

  const validator = new SHACLValidator(shapes, { factory, group });
  const report = validator.validate(data);

  // console.log(report);
  // for (const result of report.results) {
  //   // See https://www.w3.org/TR/shacl/#results-validation-result for details
  //   // about each property
  //   console.log(result.message);
  //   console.log(result.path);
  //   console.log(result.focusNode);
  //   console.log(result.severity);
  //   console.log(result.sourceConstraintComponent);
  //   console.log(result.sourceShape);
  // }

  return report;
}