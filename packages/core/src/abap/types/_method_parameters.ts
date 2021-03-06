import {TypedIdentifier} from "./_typed_identifier";

export interface IMethodParameters {
  getAll(): readonly TypedIdentifier[];
  getImporting(): readonly TypedIdentifier[];
  getExporting(): readonly TypedIdentifier[];
  getChanging(): readonly TypedIdentifier[];
  getReturning(): TypedIdentifier | undefined;
  getExceptions(): readonly string[];
}