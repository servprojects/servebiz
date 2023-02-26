import { GeneralArgs } from '../dto/general.args';
var ObjectId = require('mongoose').Types.ObjectId;

export const generalObjectFilters = (args: GeneralArgs) => {
  let filterArr: any[] = [];

  if (args.id) {
    filterArr.push({ _id: new ObjectId(args.id) });
  }

  if (args.ids && args.ids.length > 0) {
    filterArr.push({ _id: { $in: args.ids } });
  }

  let payload = {
    $and: filterArr,
  };

  return filterArr.length > 0 ? payload : null;
};
