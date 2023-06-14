<script setup lang="ts">
import { toRefs } from 'vue';
import { timeSince } from 'src/shared/helpers/time-since';
import VueMarkdown from 'vue-markdown-render';
import { Comment } from 'src/issues/interfaces/comment';

interface Props {
    comment: Comment;
};
const props = defineProps<Props>();
const { comment } = toRefs(props);


</script>
<template>
    <q-card class="text-black col-12 q-mb-md" flat bordered>
        <q-item>
            <q-item-section avatar>
                <q-avatar >
                    <img :src="comment.user.avatar_url" alt="User Avatar">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <q-item-label>
                    <span class="text-h5">{{ comment.user.login }}</span>
                </q-item-label>
                <q-item-label caption>
                    {{ timeSince(comment.created_at) }} ago
                </q-item-label>
            </q-item-section>

            <!-- <q-item-section>
                <q-item-label class="row items-center justify-end">
                    <q-item-label class="q-mr-md">
                        <q-icon name="question_answer" />
                        {{ issue.comments }}
                    </q-item-label>
                    <q-chip 
                        v-if="issue.state === State.Closed"
                        color="positive" 
                        text-color="white" 
                        icon="check"> Closed </q-chip>
                    <q-chip 
                        v-else
                        color="negative" 
                        text-color="white" 
                        icon="bug_report"> Open </q-chip>
                </q-item-label>

            </q-item-section> -->
        </q-item>

        <q-separator />

        <q-item-section class="q-pa-md markdown-css">
            <VueMarkdown :source="comment.body || ''"  />
        </q-item-section>

        <!-- <q-separator />

        <q-item-section class="q-pa-xs q-gutter-xs">
            <div>
                <q-chip 
                    v-for="{ id, name, color } of issue.labels"
                    :key="id"
                    :style="{ color: `#${color}` }"
                    outline
                    clickable
                    >{{ name }}
                </q-chip>
            </div>
        </q-item-section> -->

    </q-card>
</template>
<style scoped></style>