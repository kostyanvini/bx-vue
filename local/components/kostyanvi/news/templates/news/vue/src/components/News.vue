<template>
    <div class="news">
        <Loader v-if="isLoaded"></Loader>
        <div v-else class="news__item" v-for="el in news" :key="el.ID">
            <div class="news__item-image">
                <img :src="el.PREVIEW_PICTURE.SRC" :alt="el.PREVIEW_PICTURE.ALT">
            </div>
            <div class="news__item-info">
                <a href="javascript:void(0)" @click="moveToDetail(el.ID)" class="news__item-title">
                    {{ el.NAME }}
                </a>
                <div class="news__item-text" v-html="el.PREVIEW_TEXT"></div>
            </div>
        </div>
        <Pagination @pageChanged="changePage" :paginationParams="componentParams.paginationParams"></Pagination>
    </div>
</template>

<script>
import Loader from './Loader.vue';
import Pagination from "./Pagination.vue";
export default {
    name: 'News',
    components: {
        Pagination,
        Loader
    },
    props: {
        componentParams: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            news: [],
            isLoaded: true,
            currentPage: 1
        }
    },
    created() {
        if (this.$store.state.news.length) {
            this.news = this.$store.state.news;
            this.isLoaded = false
        } else {
            this.currentPage = this.$route.params.pageId || 1;

            BX.ajax.runComponentAction(this.componentParams.componentName, this.componentParams.getPageNews, {
                    mode: 'class',
                    signedParameters: this.componentParams.signedParameters,
                    data: {
                        page: this.currentPage
                    },
                }
            ).then((responce => {
                    const news = responce.data;
                    this.news = news;
                    this.$store.commit('setAllNews', news);
                    this.isLoaded = false
                })
            ).catch(err => {
                console.warn(err);
                this.news = [];
                this.isLoaded = false;
            })
        }
    },
    methods: {
        changePage(page) {
            this.isLoaded = true;
            BX.ajax.runComponentAction(this.componentParams.componentName, this.componentParams.getPageNews, {
                    mode: 'class',
                    signedParameters: this.componentParams.signedParameters,
                    data: {
                        page
                    },
                }
            ).then((responce => {
                    this.news = responce.data;
                    this.isLoaded = false;
                    this.currentPage = page;
                })
            ).catch(err => {
                console.warn(err);
                this.news = [];
                this.isLoaded = false;
            });
        },
        moveToDetail(id) {
            this.$router.push({
                name: 'detail',
                params: {
                    id,
                    fromPage: this.currentPage
                }
            })
        }
    }
}
</script>

<style lang="scss">
.news {
    &__item {
        display: flex;

        &:not(:last-child) {
            margin-bottom: 20px;
        }

        &-image {
            max-width: 100px;
            margin-right: 20px;

            img {
                width: 100%;
            }
        }

        &-title {
            font-size: 20px;
            line-height: 24px;
            margin-bottom: 20px;
            display: block;
        }

        &-text {
            font-size: 16px;
        }
    }
}
</style>