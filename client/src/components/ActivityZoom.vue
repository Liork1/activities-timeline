<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="btn-close" @click="close">
        <i class="fa fa-times-circle fa-3x"></i>
      </div>
      <div class="icon-path">
        <img :src=iconPath></img>
      </div>
      <h1>{{title}}</h1>
      <h4>{{date}}</h4>
      <div class="comment">{{comment}}</div>
      <template v-if="score">
          Score {{score}}/{{possibleScore}}
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ActivityZoom',
     props: {
      id: String,
      title: String,
      iconPath: String,
      date: String,
      score: String,
      possibleScore: String,
      comment: String,
    },
    methods: {
      close() {
        this.$emit('closeActivityZoom');
      },
    },
  };
</script>

<style scoped>
  img {
      width: 70px;
      height: 70px;
      margin: 0 auto;
      display: block;
      border-radius: 50%;
      padding: 5px;
      background: lightBlue;
  }
  h1, h4 {
    text-align: center;
  }
  .icon-path {
    margin: auto;
  }
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    width: 50%;
    height: 50%;
    border-radius: 16px;
    padding: 40px;
  }
  .comment {
    padding: 30px 0;
    font-size: 30px;
  }
  .btn-close {
    color: #4AAE9B;
    background: transparent;
    text-align: right;
  }
</style>