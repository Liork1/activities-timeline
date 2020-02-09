import activitiesSettings from './activitiesSettings';
const moment = require('moment');

/*
  parse the activities into a view model structure.
  example: 
  {
    'August 2019': [{}, {}, {}],
    'September 2019': [{}, {}, {}],
  }
*/
export function groupActivitiesByMonth(activities) {

  let result = activities.sort((a,b)=> {return a.d_created - b.d_created}).reduce((acc, activity) => {
    const date = new Date(activity.d_created * 1000);
    let key = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    acc[key] = acc[key] || [];
    acc[key].push(createActivityViewModel(activity));
    return acc;
  }, {});

  console.log(result);
  return result;
}

/* Parse a single activity item (as returned from server) to fit the view */
export function createActivityViewModel(activity) {
  try {
    const date = new Date(activity.d_created * 1000);
    return {
      id: activity.id,
      title: `${activity.topic_data.name} ${activity.resource_type.split('_').join(' ')}`,
      iconPath: activity.topic_data.icon_path,
      date: moment(date).format('MMM DD, YYYY hh:mm a'),
      comment: activity.comment ,
      score: activity.score,
      possibleScore: activity.possible_score,
      isScore: activitiesSettings[activity.resource_type].score,
      isZoom: activitiesSettings[activity.resource_type].zoom
    };
  } catch(error) {
    console.warn(`error creaty activity view model for activy id = ${activity.id}, error=${error}`);
    
  }
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default { groupActivitiesByMonth, createActivityViewModel };
