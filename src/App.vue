<template>
    <div id="app" class="fillcontain">
		    <router-view></router-view>
    </div>
</template>

<script>
    export default {
    	provide(){
            return {
                app: this
            }
        }
    }
</script>

<style lang="less">
	@import './style/common';
</style>
