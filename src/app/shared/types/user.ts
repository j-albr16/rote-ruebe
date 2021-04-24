
export interface UserFilter {
  regexExpressionUserName: string;
  orderedBy: string; // TODO Possibly better solved with enum (stored in a npm package that server and client share)
};
