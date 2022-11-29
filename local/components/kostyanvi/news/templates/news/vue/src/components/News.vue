<template>
    <div class="news">
        <div class="news__item" v-for="el in news" :key="el.ID">
            <div class="news__item-image">
                <img :src="el.PREVIEW_PICTURE.SRC" :alt="el.PREVIEW_PICTURE.ALT">
            </div>
            <div class="news__item-info">
                <a href="javascript:void(0)" @click="$router.push(el.ID)" class="news__item-title">
                    {{ el.NAME}}
                </a>
                <div class="news__item-text" v-html="el.PREVIEW_TEXT"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'News',
    data() {
        return {
            news: []
        }
    },
    created() {
        if (this.$store.state.news.length) {
            this.news = this.$store.state.news;
        } else {
            BX.ajax.runComponentAction('kostyanvi:news', 'getAllNews', {
                    mode: 'class',
                    data: {},
                }
            ).then((responce => {
                try {
                    const news  = JSON.parse(responce.data);
                    this.news = news;
                    this.$store.commit('setAllNews', news);
                } catch (e) {
                    console.warn('Не удалось получить данные');
                    this.news = [];
                }
            }));
        }
    },
    mounted() {

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