<template>
    <div>
        <modeltree ref="modeltree" :defalutChecked="roleDefautCheck"></modeltree>
    </div>
</template>

<script>
import modeltree from "../common/modeltree"

export default {
    data(){
        return{
            sss:"eeee"
        }
    },
    props:["roleDefautCheck"],
    components:{modeltree},
    methods:{
        getModle:function(){
            return this.$refs.modeltree.moduleSelected();
        }
    }
}
</script>

<style>

</style>
