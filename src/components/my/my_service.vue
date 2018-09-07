 <template>
  <div class="service">
    <mt-header :title="title">
      <mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
    </mt-header>
  </div>
</template>

<script>
import { Header } from 'mint-ui';
export default {
  name: 'wallet',
  data () {
    return {
      title: '联系客服',
      money:2585
    }
  },
  methods :{
    backClick (){
      this.$router.go(-1);
    },
    toFixed (val) {
      return val.toFixed(2);
    },
    waletClick () {
      console.log('提现')
    }
  },
  mounted(){

  },
  components:{
    Header
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .service {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
  }
  
</style>
