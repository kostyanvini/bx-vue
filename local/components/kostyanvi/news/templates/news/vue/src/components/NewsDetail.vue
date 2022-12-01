<template>
    <div class="detail-news">
        <Loader v-if="isLoaded"></Loader>
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
import Loader from "./Loader.vue";

export default {
    components: {Loader},
    data() {
        return {
            isLoaded: true,
            newsDetailInfo: {}
        }
    },
    created() {
        if (this.$store.state.newsCache[+this.$route.params.id]) {
            this.newsDetailInfo = this.$store.state.newsCache[+this.$route.params.id];
            this.isLoaded = 0
        } else {
            BX.ajax.runComponentAction(this.$root.componentName, 'getNewsByID', {
                    mode: 'class',
                    signedParameters: this.$root.signedParameters,
                    data: {
                        id: +this.$route.params.id
                    },
                }
            ).then((responce => {
                    const result = responce.data;
                    this.newsDetailInfo = result;
                    this.$store.commit('registerNewNewsCache', result);
                    setTimeout(() => this.isLoaded = 0, 500);
                })
            ).catch(e => console.warn(e));
        }
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