<template>
  <div class="activities">
    <h1>Timeline</h1>
    <div class="search-filter">
      <input type="text" placeholder="Search Timeline" v-model="searchInput">
      <button v-on:click="filteredActivities(searchInput)"><i class="fa fa-search"></i></button>
    </div>
    <label>Filter by:</label>
    <div class="activity-filter">
      <div class="activity-filter-item" v-on:click="filteredActivities('')">
        All
      </div>
      <div class="activity-filter-item" v-for="(_, activity) in activitiesSettings" v-on:click="filteredActivities(activity)">
        {{activity | snakeToTitleCase('_')}}
      </div>
    </div>

    <li class="activity-month" v-for="(monthItem, monthKey) in activitiesViewModel">
       <MonthlyActivities :month="monthKey" :activities="monthItem" @activityZoomClicked="showActivityZoom"></MonthlyActivities>
    </li>
    <ActivityZoom v-show="isActivityZoomVisible" @closeActivityZoom="closeActivityZoom" v-bind="activityZoom"></ActivityZoom>
  </div>
</template>

<script>
import axios from 'axios';
import * as activitiesUtils from '@/utils/activities';
import activitiesSettings from '@/utils/activitiesSettings';
import MonthlyActivities from '@/components/MonthlyActivities.vue';
import ActivityZoom from '@/components/ActivityZoom.vue';

const data = [];
const activitiesViewModel = {};
const activityZoom = {};

export default {
  name: 'activities',
  components: {
    MonthlyActivities,
    ActivityZoom,
  },
  data: () => ({ 
    activitiesViewModel, 
    activitiesSettings,
    activityZoom, 
    searchInput: '', 
    isActivityZoomVisible: false 
  }),
  mounted() {
    if (this.$route.name === 'activities2') {
      return this.activitiesV2();
    }
    this.activitiesV1();
  },
  methods: {
    activitiesV1() {
      axios({ method: 'GET', url: 'http://localhost:3000/activities/v1' }).then((result) => {
        this.data = result.data;
        this.activitiesViewModel = activitiesUtils.groupActivitiesByMonth(this.data);
      }, (error) => {
        console.error(`error fetching date from activities/v1`);
      });
    },

    activitiesV2() {
      axios({ method: 'GET', url: 'http://localhost:3000/activities/v2' }).then((result) => {
        //transform the result of v2 to the exact format as v1 and group it the same way as in v1
        this.data = result.data.reduce((acc, item) => {
          item.activities.forEach(activity => {
            activity.resource_type = item.resource_type;
            acc.push(activity);
          });
          return acc;
        }, [])
        //prepare the activities view model
        this.activitiesViewModel = activitiesUtils.groupActivitiesByMonth(this.data);
      }, (error) => {
        console.error(`error fetching date from activities/v1`);
      });
    },

    /* Filter the orginal data list and then group it as usual */
    filteredActivities(filter) {
      const filteredData = !!filter ? this.data.filter(item => {
         return item.resource_type.toLowerCase() === filter.trim().toLowerCase();
      }) : this.data;
      this.activitiesViewModel = activitiesUtils.groupActivitiesByMonth(filteredData);
    },

    showActivityZoom(value) {
      this.isActivityZoomVisible = true;
      this.activityZoom = activitiesUtils.createActivityViewModel(this.data.find(item => item.id === value));
    },
    closeActivityZoom() {
      this.isActivityZoomVisible = false;
    }
  },
};
</script>

<style scoped>
  li {
    list-style-type: none;
  }

  .activity-month li {
    margin: 0 20px;
  }

  .activity-filter {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
    text-align: center;
  }
  .activity-filter-item {
    border: 2px solid #ccc!important;
    border-radius: 5px;
    margin: 10px 10px 10px 0;
    padding: 5px 2px;
    font-weight: 600;
  }

  .search-filter {
    margin-bottom: 10px;
  }

  .search-filter input {
    font-size: 14px;
  }
  
</style>
