<template>
    <div class="detail-news">
        <div v-if="isLoaded" class="loader">Loading...</div>
        <div v-else>
            <router-link to="/" class="rollback">Go back</router-link>
            <div class="detail-news__info">
                <div class="detail-news__info-name">
                    {{ newsDetailInfo.NAME }}
                </div>
                <div class="detail-news__info-text" v-html="newsDetailInfo.DETAIL_TEXT"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoaded: true,
            newsDetailInfo: {}
        }
    },
    created() {
        if (this.$store.state.newsCache[+this.$route.params.id]) {
            this.newsDetailInfo = this.$store.state.newsCache[+this.$route.params.id];
        } else {
            BX.ajax.runComponentAction('kostyanvi:news', 'getNewsByID', {
                    mode: 'class',
                    data: {
                        id: +this.$route.params.id
                    },
                }
            ).then((responce => {
                try {
                    const result = JSON.parse(responce.data);
                    this.newsDetailInfo = result;
                    this.$store.commit('registerNewNewsCache', result);
                } catch (e) {
                    console.warn('Не удалось получить данные');
                    this.newsDetailInfo = {};
                }
            }));
        }
        // Имитация загрузки
        setTimeout(() => this.isLoaded = 0, 500);
    }
}
</script>

<style lang="scss">
.detail-news {
    .rollback {
        margin-bottom: 20px;
        font-size: 24px;
        line-height: 26px;
        text-decoration: none;
        display: block;
    }

    &__info {
        &-name {
            margin-bottom: 20px;
            font-size: 30px;
            line-height: 36px;
        }

        &-text {
            font-size: 18px;
        }
    }
}
</style>