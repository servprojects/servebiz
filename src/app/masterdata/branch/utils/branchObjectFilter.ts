import { GeneralArgs } from '@/app/general/dto/general.args';
import { generalObjectFilters } from '@/app/general/utils/generalFilters';

var ObjectId = require('mongoose').Types.ObjectId;

export const branchObjectFilters = (args: GeneralArgs) => {
  //   if (args.searchArg) {
  let filterArr = [];

  if (generalObjectFilters(args)) {
    filterArr.push(generalObjectFilters(args));
  }

  if (switchType(args)) {
    let switchResult = switchType(args);
    filterArr.push(switchResult);
  }
  // if (searchFilterType(args.searchArg)) {
  //   let searchResult = searchFilterType(args.searchArg);
  //   filterArr.push(searchResult);
  // }

  // if (args.searchArg.startDate && args.searchArg.endDate) {
  //   let dateResult = dateFilterType(args.searchArg);
  //   filterArr.push(dateResult);
  // }

  let payload = {
    $and: filterArr,
  };
  return filterArr.length > 0 ? payload : null;
  //   } else {
  //     return switchType(args);
  //   }
};

const switchType = (args: GeneralArgs) => {
  switch (args.type) {
    case 'SAMPLE':
      return {
        $or: [{ createdBy: new ObjectId(args.user) }],
      };

      break;

    default:
      return null;
      break;
  }
};

//   const searchFilterType = (searchArg: TicketSearchType) => {
//     var nameRegex = new RegExp(searchArg.description);
//     return {
//       $or: [
//         { code: { $regex: nameRegex, $options: 'i' } },
//       ],
//     };
//   };

//   const dateFilterType = (searchArg: TicketSearchType) => {
//     var nameRegexStartDate = new RegExp(searchArg.startDate);
//     var nameRegexEndDate = new RegExp(searchArg.endDate);
//     let payload = {
//       $or: [
//         {
//           'ticket.dateRequested': {
//             $gte: searchArg.startDate,
//             $lte: searchArg.endDate,
//           },
//         },
//         { 'ticket.dateRequested': { $regex: nameRegexStartDate, $options: 'i' } },
//         { 'ticket.dateRequested': { $regex: nameRegexEndDate, $options: 'i' } },
//       ],
//     };
//     return payload;
//   };
