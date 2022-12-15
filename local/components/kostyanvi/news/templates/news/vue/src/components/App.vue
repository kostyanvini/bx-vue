<template>
    <router-view :componentParams="componentParams"></router-view>
</template>

<script>
export default {
    name: 'App',
    props: {
        componentParams: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss">

</style>