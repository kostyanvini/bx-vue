<template>
    <div class="pagination">
        <a href="javascript:void(0)" class="pagination__item" @click="$emit('pageChanged', 1)">1</a>
        <a href="javascript:void(0)" class="pagination__item" @click="$emit('pageChanged', 2)">2</a>
        <a href="javascript:void(0)" class="pagination__item" @click="$emit('pageChanged', 3)">3</a>
        <a href="javascript:void(0)" class="pagination__item" @click="$emit('pageChanged', 4)">4</a>
        <a href="javascript:void(0)" class="pagination__item" @click="$emit('pageChanged', 5)">5</a>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
}
</script>

<style lang="scss">
.pagination {
    display: flex;

    &__item {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #4fc08d;
        font-size: 20px;
        color: #fff;
        font-family: sans-serif;
        text-decoration: none;
        transition: 0.3s;

        &:not(:last-child) {
            margin-right: 20px;
        }

        &:hover {
            background: #429f75;
        }
    }
}
</style>