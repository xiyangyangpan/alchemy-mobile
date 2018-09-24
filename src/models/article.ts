/**
 * A generic model that our Article-Detail pages
 *
 */
export class Article {

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }

}

export interface Article {
  [prop: string]: any;
}
