<template>
    <div class="pagination">
        <a href="javascript:void(0)"
           class="pagination__item"
           :class="{'_active': +$route.params.pageId === page}"
           @click="changePage(page)"
           v-for="page in paginationParams.ALL_PAGES" :key="page">
            {{ page }}
        </a>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['paginationParams'],
    methods: {
        changePage(page) {
            this.$router.push(`/page/${page}`);
            this.$emit('pageChanged', page);
        }
    }
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

        &._active {
            box-shadow: 0px 0px 2px 3px #28664a;
            color: #28664a;
        }
    }
}
</style>