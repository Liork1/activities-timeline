<template>
  <div class="activity">
    <div class="grid-item grid-item-image">
      <img :src=iconPath></img>
    </div>
    <div class="grid-item">
      <h3>{{title | snakeToTitleCase(' ')}}</h3>
      <div>{{date}}</div>
    </div>
    <div class="grid-item"></div>
    <div class="grid-item">
      <template v-if="isScore">
          Score {{score}}/{{possibleScore}}
      </template>
    </div>
    <div v-if="isZoom" class="grid-item zoom" v-on:click="activityZoomClicked(id)">
        <i class="fa fa-eye"> View work</i>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Activity',
  props: {
    id: String,
    title: String,
    iconPath: String,
    date: String,
    score: String,
    possibleScore: String,
    isScore: {
      type: Boolean,
      default: true,
    },
    isZoom: Boolean,
  },
  methods: {
    activityZoomClicked(event) {
      this.$emit('activityZoomClicked', event)
    }
  },
};
</script>

<style scoped>
h3 {
  font-weight: bold;
}
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 5px;
  background: lightBlue;
}

.activity {
  border: 1px solid #ccc!important;
  border-radius: 16px;
  padding: 16px;
  display: grid;
  grid-template-columns: 5% auto auto 20% 20%;
}
.grid-item {
  text-align: left;
  margin: auto 10%;
}
.grid-item-image {
  margin: auto;
}
.zoom {
  cursor: pointer;
}
</style>
