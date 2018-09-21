/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Node" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or an "Animal," or something like that.
 *
 * The Nodes service manages creating instances of Node, so go ahead and rename
 * that something that fits your app as well.
 */
export class Node {

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }

}

export interface Node {
  [prop: string]: any;
}
