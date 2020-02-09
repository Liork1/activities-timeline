<template>
  <div>
    <div class="month">{{month}}</div>
    <li v-for="activity in activities">
        <Activity v-bind="activity" @activityZoomClicked="activityZoomClicked">></Activity>
    </li>
  </div>
</template>


<script>
import Activity from '@/components/Activity.vue';

export default {
  name: 'MonthlyActivities',
   components: {
    Activity,
  },
  props: {
    month: String,
    activities: Array,
  },
   methods: {
    activityZoomClicked(value) {
      this.$emit('activityZoomClicked', value)
    }
  },
};
</script>

<style scoped>
  li {
    list-style-type: none;
    padding: 10px 0;
  }

  .month {
    background: lightgray;
    width: 20%;
    text-align: center;
    padding: 2px 10px;
    border-radius: 16px
  }
</style>
